import React from 'react';
import { X } from 'lucide-react';

const CartItemCard = ({ item, onRemove }) => (
  <div className="p-6 flex flex-col sm:flex-row">
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
          onClick={() => onRemove(item.id)}
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

      <div className="items-end">
        <div className="font-medium text-lg">
          ${(item.price * (item.quantity || 1)).toFixed(2)}
        </div>
      </div>
    </div>
  </div>
);

export default CartItemCard;
