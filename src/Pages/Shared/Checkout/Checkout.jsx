import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../Context/AuthContext';
import { ChevronRight } from 'lucide-react';
import { addPayment } from '../../../api/payment';


const Checkout = ({ cartItems, subtotal, shipping, total, setShowCheckout }) => {
  const { user } = useAuth();
  
  // Initialize form with user data if available
  const [formData, setFormData] = useState({
    name: "",
    email: user?.email || "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: user?.country || "",
    phone: "",
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [orderDetails, setOrderDetails] = useState(null);

  // Pre-populate form with user data when component mounts
  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.username || "",
        email: user.email || "",
        country: user.country || ""
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['name', 'email', 'line1', 'city', 'state', 'postalCode', 'country', 'phone'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = 'This field is required';
      }
    });
    
    // Email validation
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    // Phone validation
    if (formData.phone && !/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(formData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    // Create order payload
    const orderPayload = {
      userId: user?.id,
      items: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity || 1,
        price: item.price
      })),
      shippingAddress: { ...formData },
      totalAmount: total,
      shippingCost: shipping
    };
    
    try {
      // Log the order payload
      console.log("Order payload:", orderPayload);
      
      // Call the payment API
      const response = await addPayment(orderPayload);
      console.log("Payment response:", response);
      
      // Store order details for confirmation page
      setOrderDetails(response);
      setOrderComplete(true);
      
      // Here you would typically clear the cart in your global state
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("There was a problem processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <button 
        onClick={() => setShowCheckout(false)}
        className="text-indigo-600 hover:text-indigo-800 font-medium mb-6 flex items-center"
      >
        &larr; Back to Cart
      </button>
      
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {orderComplete ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          </div>
          <h2 className="text-2xl font-semibold mb-2">Order Complete!</h2>
          <p className="text-gray-500 mb-4">Thank you for your purchase, {formData.name}!</p>
          {orderDetails?.orderNumber && (
            <p className="text-gray-700 font-medium mb-4">Order Number: #{orderDetails.orderNumber}</p>
          )}
          <p className="text-gray-500 mb-2">We've sent a confirmation email to {formData.email}.</p>
          <p className="text-gray-500 mb-6">Your order will be shipped to:</p>
          <div className="bg-gray-50 p-4 rounded-md mb-6 text-left inline-block mx-auto">
            <p className="text-gray-700">{formData.name}</p>
            <p className="text-gray-700">{formData.line1}</p>
            {formData.line2 && <p className="text-gray-700">{formData.line2}</p>}
            <p className="text-gray-700">{formData.city}, {formData.state} {formData.postalCode}</p>
            <p className="text-gray-700">{formData.country}</p>
            <p className="text-gray-700">{formData.phone}</p>
          </div>
          <button 
            onClick={() => {
              setShowCheckout(false);
              // This would clear the cart in a real app
              // clearCart();
            }}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Shipping Information</h2>
              </div>
              
              <form onSubmit={handlePayment} className="p-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="line1" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 1
                    </label>
                    <input
                      type="text"
                      id="line1"
                      name="line1"
                      value={formData.line1}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.line1 ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.line1 && <p className="text-red-500 text-xs mt-1">{formErrors.line1}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="line2" className="block text-sm font-medium text-gray-700 mb-1">
                      Address Line 2 (Optional)
                    </label>
                    <input
                      type="text"
                      id="line2"
                      name="line2"
                      value={formData.line2}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.city ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.city && <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                      State / Province
                    </label>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.state ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.state && <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-1">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.postalCode ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.postalCode && <p className="text-red-500 text-xs mt-1">{formErrors.postalCode}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                      Country
                    </label>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      required
                      className={`w-full border ${formErrors.country ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                    />
                    {formErrors.country && <p className="text-red-500 text-xs mt-1">{formErrors.country}</p>}
                  </div>
                </div>
                
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:bg-indigo-400"
                >
                  {isLoading ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center">
                      Proceed to Payment <ChevronRight size={16} className="ml-1" />
                    </span>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="mb-4">
                <div className="text-sm text-gray-500 mb-2">{cartItems.length} items in cart</div>
                <div className="max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex py-2 border-b border-gray-200 last:border-b-0">
                      <div className="w-12 h-12 bg-gray-100 rounded-md overflow-hidden">
                        {item.frontImageUrl && (
                          <img 
                            src={item.frontImageUrl} 
                            alt={item.title} 
                            className="w-full h-full object-contain"
                          />
                        )}
                      </div>
                      <div className="flex-1 ml-3">
                        <div className="text-sm font-medium truncate">{item.title}</div>
                        <div className="text-xs text-gray-500">Qty: {item.quantity || 1}</div>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * (item.quantity || 1)).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2 pt-4 border-t border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span>${shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-medium text-lg pt-2 border-t border-gray-200">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;