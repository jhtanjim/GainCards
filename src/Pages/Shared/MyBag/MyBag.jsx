"use client"
import { ShoppingBag, Trash2, Plus, Minus } from "lucide-react"
import { Link } from "react-router-dom"
import { useShop } from "../../../Context/ShopContext"

const MyBag = () => {
  const { cartItems, addToCart, removeFromCart } = useShop()

  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center py-20 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="bg-purple-100 p-6 rounded-full mb-6">
          <ShoppingBag className="w-20 h-20 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your bag is empty</h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Looks like you haven't added any cards to your bag yet. Find some amazing cards to add!
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
        >
          <ShoppingBag className="w-5 h-5" />
          Browse Cards
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">My Shopping Bag</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
        <div className="px-6 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              <h2 className="font-semibold">Your Cards ({cartItems.length})</h2>
            </div>
            <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
              Total: ${totalPrice.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Cart items */}
        <div className="divide-y divide-gray-100">
          {cartItems.map((item) => (
            <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-gray-50 transition-colors">
              <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-gray-200">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-contain" />
              </div>
              <div className="flex-grow">
                <h3 className="font-semibold text-gray-800 capitalize text-lg mb-1">{item.name}</h3>
                <span className="text-purple-600 font-medium">${item.price}</span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => removeFromCart(item.id, 1)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Minus className="w-4 h-4 text-gray-600" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button 
                  onClick={() => addToCart(item)}
                  className="p-1 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <button 
                onClick={() => removeFromCart(item.id, item.quantity)}
                className="p-2 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="bg-gray-50 px-8 py-6 border-t border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium">Free</span>
          </div>
          <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">$0.00</span>
          </div>
          <div className="flex justify-between items-center mb-6">
            <span className="font-semibold text-gray-800">Total</span>
            <span className="font-bold text-xl text-purple-600">${totalPrice.toFixed(2)}</span>
          </div>

          <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all shadow-md hover:shadow-lg font-semibold flex items-center justify-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Proceed to Checkout
          </button>
          
          <Link to="/" className="w-full block mt-4 text-center text-sm text-purple-600 hover:text-purple-800">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyBag