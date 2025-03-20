import React from 'react';
import { LockKeyhole } from 'lucide-react';
import { Link } from 'react-router-dom';

const ForgetPasswordEmail = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-green-800 p-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3">
            <LockKeyhole className="h-8 w-8 text-green-800" />
          </div>
          <h1 className="text-white text-xl font-bold">Reset your password</h1>
        </div>
        
        {/* Content */}
        <div className="p-6">
          <div className="text-xl font-bold text-gray-800 mb-4">Grow Money More</div>
          
          <p className="text-gray-700 mb-3">Hi,</p>
          
          <p className="text-gray-700 mb-3">
            We received a request to reset your password for your Grow Money More account.
          </p>
          
          <p className="text-gray-700 mb-4">
            To reset your password, please click on the button below.
          </p>
          
          <Link 
            to={"/prv"}
            className="block bg-green-800 hover:bg-green-700 text-white text-center py-3 px-4 rounded font-medium my-6 transition-colors duration-200"
          >
            Reset Password
          </Link>
          
          <p className="text-gray-700 mb-3">
            Alternatively, you can copy and paste the following link into your browser:
          </p>
          
          <div className="bg-gray-50 border border-gray-200 rounded p-3 mb-3 break-all">
            <Link 
              to={"/prv"}
              className="text-blue-600 hover:underline text-sm"
            >
              https://growmoneymore.com/reset-password?token=7X5FGA21YBCVMS8YR4BX
            </Link>
          </div>
          
          <p className="text-gray-500 text-sm mb-4">
            *** If for any reason the above link is not clickable, please copy the link and paste it in your choice of browser.
          </p>
          
          <p className="text-gray-700 mb-4">
            This password reset link will expire in 24 hours. If you did not request a password reset, please ignore this email or contact our support team.
          </p>
          
          <div className="mt-6">
            <p className="text-gray-700">Best regards,</p>
            <p className="text-gray-700">-Team Grow Money More</p>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-600 mb-3">
            <span>Follow us on:</span>
            <a href="#" className="text-blue-600 hover:underline">Twitter</a> | 
            <a href="#" className="text-blue-600 hover:underline">Facebook</a> | 
            <a href="#" className="text-blue-600 hover:underline">LinkedIn</a>
          </div>
          
          <p className="text-center text-gray-600 text-sm mb-1">
            © 2025 Grow Money More. All rights reserved.
          </p>
          <p className="text-center text-gray-600 text-sm">
            If you didn't request a password reset, please disregard this email.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordEmail;