import React from 'react';
import { ChevronRight } from 'lucide-react';

const CartSummary = ({ subtotal, shipping, total, onCheckout, isLoading }) => (
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
      onClick={onCheckout}
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
);

export default CartSummary;
