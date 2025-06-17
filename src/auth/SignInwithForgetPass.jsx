import React, { useState, useEffect } from 'react';

import SignIn from './SignIn';
import ForgotPasswordForm from './ForgotPasswordForm';
import EmailSentConfirmation from './EmailSentConfirmation';
import ResetPasswordForm from './ResetPasswordForm';
import ResetSuccessConfirmation from './ResetSuccessConfirmation';

const SignInwithForgetPass = () => {
  const [currentView, setCurrentView] = useState('login');
  const [resetEmail, setResetEmail] = useState('');
  const [resetToken, setResetToken] = useState('');

  // Check for reset token in URL on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
      setCurrentView('reset-password');
    }
  }, []);

  const handleForgotPassword = () => {
    setCurrentView('forgot-password');
  };

  const handleEmailSent = (email) => {
    setResetEmail(email);
    setCurrentView('email-sent');
  };

  const handleBackToLogin = () => {
    setCurrentView('login');
    setResetEmail('');
    setResetToken('');
  };

  const handleResetSuccess = () => {
    setCurrentView('reset-success');
  };

  const handleResetError = (error) => {
    alert(error);
    setCurrentView('login');
  };

  switch (currentView) {
    case 'forgot-password':
      return (
        <ForgotPasswordForm
          onBackToLogin={handleBackToLogin}
          onEmailSent={handleEmailSent}
        />
      );
    case 'email-sent':
      return (
        <EmailSentConfirmation
          email={resetEmail}
          onBackToLogin={handleBackToLogin}
        />
      );
    case 'reset-password':
      return (
        <ResetPasswordForm
          token={resetToken}
          onSuccess={handleResetSuccess}
          onError={handleResetError}
        />
      );
    case 'reset-success':
      return (
        <ResetSuccessConfirmation
          onBackToLogin={handleBackToLogin}
        />
      );
    default:
      return (
        <SignIn
          onForgotPassword={handleForgotPassword}
        />
      );
  }
};

export default SignInwithForgetPass;