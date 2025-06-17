import React from 'react';
import { CheckCircle } from 'lucide-react';

const ResetSuccessConfirmation = ({ onBackToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Password Reset Successful!</h2>
        
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. You can now log in with your new password.
        </p>

        <button
          onClick={onBackToLogin}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default ResetSuccessConfirmation;