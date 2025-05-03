import React, { useState } from 'react';
import { ShoppingBag, Plus, Minus, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const product = {
  id: "b52ba7d0-07ec-4600-b10f-0b1daa9da95e",
  name: "Premium T-Shirt",
  price: 29.99,
  image: "/api/placeholder/300/300",
  description: "High quality cotton t-shirt",
  color: "Black",
  size: "M"
};

const MyBag = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState(1);
  
  const addToCart = () => {
    const item = {
      ...product,
      quantity: quantity
    };
    setCartItems([...cartItems, item]);
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const proceedToCheckout = () => {
    // In a real application, this would navigate to the checkout page
    // For this demo, we'll just log the cart items
    console.log("Proceeding to checkout with items:", cartItems);
    alert("Redirecting to checkout page");
    // Here you would typically use a router to navigate:
    // router.push('/checkout');
  };
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <h1 className="text-3xl font-bold mb-6 flex items-center">
        <ShoppingBag className="mr-2" />
        My Shopping Bag
      </h1>
      
      <div className="grid  gap-8">
        {/* Product Details */}
        <div className="border p-4 rounded-lg shadow-sm">
          <div className="flex">
            <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
            <div className="ml-4">
              <h2 className="text-xl font-semibold">{product.name}</h2>
              <p className="text-gray-600">${product.price}</p>
              <p className="text-sm text-gray-500">{product.color} | {product.size}</p>
              <p className="text-sm mt-2">{product.description}</p>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex items-center">
              <span className="mr-4">Quantity:</span>
              <button 
                onClick={decreaseQuantity} 
                className="bg-gray-200 p-1 rounded-full"
              >
                <Minus size={16} />
              </button>
              <span className="mx-3">{quantity}</span>
              <button 
                onClick={increaseQuantity} 
                className="bg-gray-200 p-1 rounded-full"
              >
                <Plus size={16} />
              </button>
            </div>
            
            <button 
              onClick={addToCart} 
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
        
        {/* Cart Summary */}
        <div className="border p-4 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
          
          {cartItems.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="max-h-40 overflow-y-auto mb-4">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center mb-2 pb-2 border-b">
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>${calculateTotal()}</span>
                </div>
              </div>
            </>
          )}
          
       <Link to={"/checkout"}>   <button 
          
          
            className={`mt-6 w-full flex items-center justify-center py-3 px-4 rounded ${
              cartItems.length === 0 
                ? 'bg-gray-300 ' 
                : 'bg-green-600 hover:bg-green-700 text-white'
            } transition`}
          >
            Proceed to Checkout
            <ArrowRight className="ml-2" size={16} />
          </button></Link>
        </div>
      </div>
    </div>
  );
};

export default MyBag;