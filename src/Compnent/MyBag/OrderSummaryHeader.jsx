import React from "react";

const OrderSummaryHeader = ({
  subtotal,
  shipping,
  totalShippingCost,
  isLoadingRates,
  finalTotal,
}) => {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex justify-between">
        <span className="text-gray-500">Subtotal</span>
        <span className="font-medium">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between mb-2">
        <span className="text-gray-500">Shipping</span>
        {isLoadingRates ? (
          <span className="font-medium">Calculating...</span>
        ) : totalShippingCost > 0 ? (
          <span className="font-medium">${totalShippingCost.toFixed(2)}</span>
        ) : (
          <span className="font-medium">${shipping.toFixed(2)}</span>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <span className="font-medium">Total</span>
        <span className="font-bold text-xl">${finalTotal.toFixed(2)}</span>
      </div>
    </div>
  );
};

export default OrderSummaryHeader;
