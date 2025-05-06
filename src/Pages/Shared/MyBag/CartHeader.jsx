import React from 'react';
import { ShoppingBag } from 'lucide-react';

const CartHeader = ({ count }) => (
  <h1 className="text-3xl font-bold mb-8 flex items-center">
    <ShoppingBag className="mr-2" /> My Bag
    <span className="ml-2 bg-indigo-600 text-white text-sm rounded-full w-6 h-6 flex items-center justify-center">
      {count}
    </span>
  </h1>
);

export default CartHeader;
