import React from 'react';
import { CheckCircle } from 'lucide-react';

const EmailSentConfirmation = ({ email, onBackToLogin }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Check Your Email</h2>
        
        <p className="text-gray-600 mb-2">
          We've sent a password reset link to:
        </p>
        <p className="font-semibold text-gray-900 mb-6">{email}</p>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-blue-800">
            Click the link in your email to reset your password. 
            The link will expire in 1 hour for security.
          </p>
        </div>

        <p className="text-sm text-gray-600 mb-6">
          Didn't receive the email? Check your spam folder or try again.
        </p>

        <button
          onClick={onBackToLogin}
          className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
};

export default EmailSentConfirmation;