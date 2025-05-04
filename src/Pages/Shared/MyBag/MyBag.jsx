import React, { useState } from 'react';
import { useShop } from '../../../Context/ShopContext';
import { ShoppingBag, X, Trash2, ChevronRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate for redirection
import Checkout from '../Checkout/Checkout';
import { useAuth } from '../../../Context/AuthContext';
import Swal from 'sweetalert2'; // Import SweetAlert2

const MyBag = () => {
  const { cartItems, setCartItems } = useShop();
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();  // Get user from auth context
  const navigate = useNavigate(); // Hook for navigation

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };
  

  
  const subtotal = cartItems.reduce((total, item) => {
    return total + (item.price * (item.quantity || 1));
  }, 0);
  
  const shipping = 12.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      // Show SweetAlert if the user is not logged in
      Swal.fire({
        title: 'You must be logged in!',
        text: 'Please log in to proceed with the checkout.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then(() => {
        // After closing SweetAlert, redirect the user to the login page
        navigate('/signIn');
      });
    } else {
      // If the user is logged in, proceed with checkout
      setIsLoading(true);
      setTimeout(() => {
        setShowCheckout(true);
        setIsLoading(false);
      }, 800);
    }
  };

  const handleContinueShopping = () => {
    alert("This would navigate to the shop page in a real app");
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showCheckout ? (
          <>
            <h1 className="text-3xl font-bold mb-8 flex items-center">
              <ShoppingBag className="mr-2" /> My Bag
              <span className="ml-2 bg-indigo-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
                {cartItems.length}
              </span>
            </h1>

            {cartItems.length === 0 ? (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                <h2 className="text-2xl font-semibold mb-2">Your bag is empty</h2>
                <p className="text-gray-500 mb-6">Looks like you haven't added any cards to your bag yet.</p>
                <Link to={"/"}>
                  <button 
                    onClick={handleContinueShopping}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Continue Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold">Shopping Bag ({cartItems.length} items)</h2>
                    </div>

                    <div className="divide-y divide-gray-200">
                      {cartItems.map((item) => (
                        <div key={item.id} className="p-6 flex flex-col sm:flex-row">
                          <div className="sm:w-24 h-24 bg-gray-100 rounded-md overflow-hidden mb-4 sm:mb-0">
                            {item.frontImageUrl && (
                              <img 
                                src={item.frontImageUrl} 
                                alt={item.title} 
                                className="w-full h-full object-contain"
                              />
                            )}
                          </div>
                          
                          <div className="flex-1 sm:ml-6">
                            <div className="flex justify-between mb-2">
                              <h3 className="font-medium text-lg">{item.title}</h3>
                              <button 
                                onClick={() => handleRemoveItem(item.id)} 
                                className="text-gray-400 hover:text-red-500"
                              >
                                <X size={20} />
                              </button>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-2">
                              {item.brand && <span>{item.brand}</span>}
                              {item.cardNumber && <span>Card #{item.cardNumber}</span>}
                              {item.grade && <span>Grade: {item.grade}</span>}
                            </div>
                            
                            <div className=" items-end">
                              <div className="font-medium text-lg">
                                ${(item.price * (item.quantity || 1)).toFixed(2)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-6 bg-gray-50 flex justify-between">
                      <button 
                        onClick={handleContinueShopping}
                        className="text-indigo-600 hover:text-indigo-800 font-medium flex items-center"
                      >
                        Continue Shopping
                      </button>
                      <button 
                        onClick={() => setCartItems([])}
                        className="text-red-500 hover:text-red-700 font-medium flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                        Clear Bag
                      </button>
                    </div>
                  </div>
                </div>

                <div className="lg:w-1/3">
                  <div className="bg-white rounded-lg shadow-md p-6 sticky top-8">
                    <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Shipping</span>
                        <span className="font-medium">${shipping.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-xl">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handleCheckout}
                      disabled={isLoading}
                      className="w-full bg-indigo-600 text-white py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
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
                          Proceed to Checkout <ChevronRight size={16} className="ml-1" />
                        </span>
                      )}
                    </button>

                    <div className="mt-6 text-sm text-gray-500 text-center">
                      <p>We accept:</p>
                      <div className="flex justify-center space-x-2 mt-2">
                        <div className="w-10 h-6 bg-blue-800 rounded"></div>
                        <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                        <div className="w-10 h-6 bg-red-600 rounded"></div>
                        <div className="w-10 h-6 bg-gray-800 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <Checkout cartItems={cartItems} subtotal={subtotal} shipping={shipping} total={total} setShowCheckout={setShowCheckout} />
        )}
      </div>
    </div>
  );
};

export default MyBag;
