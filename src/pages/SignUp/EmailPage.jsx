import React from 'react';
import { Link } from 'react-router-dom';

const EmailPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans text-gray-800 p-4">
      <div className="max-w-lg w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="bg-green-800 text-white py-8 px-6 text-center">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-800 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold">Confirm registration</h1>
        </div>
        
        {/* Content Section */}
        <div className="px-8 py-6">
          <div className="text-2xl font-bold mb-4">Grow Money More</div>
          
          <p className="mb-4">Hi,</p>
          
          <p className="mb-4">Thank you for signing up with Grow Money More.</p>
          
          <p className="mb-4">To complete your account set-up, please verify your email address by clicking on the confirmation link below.</p>
          
          <Link 
            to="/svs"
            className="block bg-green-800 hover:bg-green-900 text-white text-center py-3 px-4 rounded-md font-semibold my-6 transition-colors duration-200"
          >
            Verify Email Address
          </Link>
          
          <p className="mb-2">Alternatively, you can copy and paste the following link into your browser:</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-md p-4 my-4 break-all">
            <Link 
              to="/svs"
              className="text-blue-500 hover:underline font-medium"
            >
              https://growmoneymore.com/confirmemail?email=example@gmail.com&code=7X5FGA21YBCVMS8YR4BX
            </Link>
          </div>
          
          <p className="text-sm text-gray-500 mt-4 mb-4">
            *** If for any reason the above link is not clickable, please copy the link and paste it in your choice of browser.
          </p>
          
          <p className="mb-2">After verification, you'll gain full access to our financial growth tools and resources to help you grow your money more effectively.</p>
        </div>
        
        {/* Footer Section */}
        <div className="border-t border-gray-200 px-8 py-6 text-sm text-gray-500">
          <p className="mb-1">Best regards,</p>
          <p className="mb-4">-Team Grow Money More</p>
          
          <div className="mb-4">
            <p>
              Follow us on: {' '}
              <a href="#" className="text-gray-500 hover:text-gray-700 mr-2">Twitter</a> | {' '}
              <a href="#" className="text-gray-500 hover:text-gray-700 mx-2">Facebook</a> | {' '}
              <a href="#" className="text-gray-500 hover:text-gray-700 ml-2">LinkedIn</a>
            </p>
          </div>
          
          <p className="mb-1">© 2025 Grow Money More. All rights reserved.</p>
          <p>If you didn't sign up for an account, please disregard this email.</p>
        </div>
      </div>
    </div>
  );
};

export default EmailPage;