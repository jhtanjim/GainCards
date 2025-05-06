import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const EmptyBagMessage = () => (
  <div className="bg-white rounded-lg shadow-md p-8 text-center">
    <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
    <h2 className="text-2xl font-semibold mb-2">Your bag is empty</h2>
    <p className="text-gray-500 mb-6">Looks like you haven't added any cards to your bag yet.</p>
    <Link to="/pokemon">
      <button className="bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors">
        Continue Shopping
      </button>
    </Link>
  </div>
);

export default EmptyBagMessage;
