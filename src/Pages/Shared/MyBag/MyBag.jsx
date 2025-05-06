import React, { useState } from 'react';
import { useShop } from '../../../Context/ShopContext';
import { Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';
import { useAuth } from '../../../Context/AuthContext';
import Swal from 'sweetalert2';

import CartHeader from './CartHeader';
import CartItemCard from './CartItemCard';
import CartSummary from './CartSummary';
import EmptyBagMessage from './EmptyBagMessage';

const MyBag = () => {
  const { cartItems, setCartItems } = useShop();
  const [isLoading, setIsLoading] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  const subtotal = cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
  const shipping = 12.99;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (!user) {
      Swal.fire({
        title: 'You must be logged in!',
        text: 'Please log in to proceed with the checkout.',
        icon: 'warning',
        confirmButtonText: 'Login',
      }).then(() => navigate('/signIn'));
    } else {
      setIsLoading(true);
      setTimeout(() => {
        setShowCheckout(true);
        setIsLoading(false);
      }, 800);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {!showCheckout ? (
          <>
            <CartHeader count={cartItems.length} />
            {cartItems.length === 0 ? (
              <EmptyBagMessage />
            ) : (
              <div className="flex flex-col lg:flex-row gap-8">
                <div className="lg:w-2/3">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-6 border-b border-gray-200">
                      <h2 className="text-xl font-semibold">Shopping Bag ({cartItems.length} items)</h2>
                    </div>
                    <div className="divide-y divide-gray-200">
                      {cartItems.map(item => (
                        <CartItemCard key={item.id} item={item} onRemove={handleRemoveItem} />
                      ))}
                    </div>
                    <div className="p-6 bg-gray-50 flex justify-between">
                      <button className="text-indigo-600 hover:text-indigo-800 font-medium">Continue Shopping</button>
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
                  <CartSummary
                    subtotal={subtotal}
                    shipping={shipping}
                    total={total}
                    onCheckout={handleCheckout}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            )}
          </>
        ) : (
          <Checkout
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            total={total}
            setShowCheckout={setShowCheckout}
          />
        )}
      </div>
    </div>
  );
};

export default MyBag;
