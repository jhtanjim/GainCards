import React, { useState } from 'react';
import { CreditCard, Truck, Check } from 'lucide-react';

const Checkout = () => {
  const [formData, setFormData] = useState({
    name: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    phone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Mock cart data (in a real app, this would come from context/state)
  const cartItems = [
    {
      id: "b52ba7d0-07ec-4600-b10f-0b1daa9da95e",
      name: "Premium T-Shirt",
      price: 29.99,
      quantity: 1,
      image: "/api/placeholder/100/100"
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      const orderData = {
        productIds: cartItems.map(item => item.id),
        shippingAddress: formData
      };
      
      console.log("Order submitted:", orderData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1000);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = 5.99;
  const tax = subtotal * 0.07;
  const total = subtotal + shipping + tax;

  // If order is submitted, show confirmation
  if (isSubmitted) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white">
        <div className="text-center py-12">
          <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center mb-6">
            <Check size={32} className="text-green-600" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Thank You For Your Order!</h1>
          <p className="text-xl mb-8">Your order has been placed successfully.</p>
          <div className="border p-4 rounded max-w-md mx-auto mb-6">
            <h2 className="font-semibold mb-2">Shipping to:</h2>
            <p>{formData.name}</p>
            <p>{formData.line1}</p>
            {formData.line2 && <p>{formData.line2}</p>}
            <p>{formData.city}, {formData.state} {formData.postalCode}</p>
            <p>{formData.country}</p>
            <p>{formData.phone}</p>
          </div>
          <button 
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            onClick={() => window.location.href = '/'}
          >
            Return to Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        {/* Shipping Form */}
        <div className="md:col-span-2">
          <div className="border rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Truck className="mr-2" />
              Shipping Information
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="John Doe"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Line 1</label>
                  <input
                    type="text"
                    name="line1"
                    value={formData.line1}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Address Line 2 (Optional)</label>
                  <input
                    type="text"
                    name="line2"
                    value={formData.line2}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="Apartment 4B"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="New York"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">State/Province</label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="NY"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Postal Code</label>
                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="10001"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Country</label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="USA"
                    required
                  />
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium mb-1">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring focus:ring-blue-200 focus:border-blue-400"
                    placeholder="+11234567890"
                    required
                  />
                </div>
              </div>
              
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4 flex items-center">
                  <CreditCard className="mr-2" />
                  Payment Information
                </h2>
                
                <div className="bg-gray-50 p-4 rounded border border-dashed">
                  <p className="text-center text-gray-600">
                    Payment processing is simulated for this demo.
                  </p>
                </div>
              </div>
              
              <div className="mt-8">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 rounded font-medium text-white ${
                    isSubmitting ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  {isSubmitting ? 'Processing...' : 'Place Order'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Order Summary */}
        <div>
          <div className="border rounded-lg p-6 sticky top-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
            <div className="max-h-64 overflow-y-auto mb-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex items-center py-2 border-b">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="ml-3 flex-1">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <div className="text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (7%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold pt-2 border-t">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;