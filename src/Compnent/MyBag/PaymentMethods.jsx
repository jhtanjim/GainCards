import React from "react";

const PaymentMethods = () => {
  return (
    <div className="mt-6 text-sm text-gray-500 text-center">
      <p>We accept:</p>
      <div className="flex justify-center space-x-2 mt-2">
        <div className="w-10 h-6 bg-blue-800 rounded"></div>
        <div className="w-10 h-6 bg-yellow-500 rounded"></div>
        <div className="w-10 h-6 bg-red-600 rounded"></div>
        <div className="w-10 h-6 bg-gray-800 rounded"></div>
      </div>
    </div>
  );
};

export default PaymentMethods;
