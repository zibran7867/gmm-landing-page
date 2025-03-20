import React, { useEffect, useState } from 'react';
import { Check, X, Loader2 } from 'lucide-react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const EmailVerificationPage = () => {
  const [status, setStatus] = useState('loading'); // 'loading', 'success', 'error'
  const [animated, setAnimated] = useState(false);
  const [message, setMessage] = useState('');
  // Update this to match your actual backend URL
  const baseUrl = 'https://gmm-backend.onrender.com/api/verify-email';

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Get token from URL parameters
        const token = new URLSearchParams(window.location.search).get('token');
        
        if (!token) {
          setStatus('error');
          setMessage('Verification token is missing. Please check your email link and try again.');
          return;
        }

        // Call the API with the token as a query parameter
        const response = await axios.get(`${baseUrl}?token=${token}`, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Verification response:", response.data);
        
        // Handle successful verification
        setStatus('success');
        setMessage(response.data.result?.message || 'Your email has been successfully verified!');
        setAnimated(true);
      } catch (error) {
        // Handle verification failure
        setStatus('error');
        setMessage(error.response?.data?.message || 'Email verification failed. Please try again or contact support.');
        console.error('Verification error:', error);
        setAnimated(true);
      }
    };

    // Short delay to show the loading animation
    const timer = setTimeout(() => {
      verifyEmail();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header with company branding */}
        <div className="bg-green-800 h-16 flex items-center justify-center">
          <h2 className="text-white text-xl font-bold">Grow Money More</h2>
        </div>
        
        {/* Content based on status */}
        <div className="p-8 flex flex-col items-center">
          {/* Loading State */}
          {status === 'loading' && (
            <>
              <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-6 animate-pulse">
                <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
              </div>
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Verifying Your Email
              </h1>
              <p className="text-gray-700 text-center">
                Please wait while we verify your email address...
              </p>
            </>
          )}

          {/* Success State */}
          {status === 'success' && (
            <>
              <div className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6 ${
                animated ? 'scale-100' : 'scale-0'
              } transition-transform duration-500`}>
                <Check 
                  className={`text-green-600 w-12 h-12 ${
                    animated ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-700 delay-300`} 
                />
              </div>
              
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Email Verified Successfully!
              </h1>
              
              <div className="text-center space-y-4">
                <p className="text-gray-700 mb-6">
                  <span className="font-semibold">Congratulations!</span> Your email has been verified. You can now log in to your account and start using Grow Money More!
                </p>
                
                <Link 
                  to="/gmm/login" 
                  className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Log In Now
                </Link>
              </div>
            </>
          )}

          {/* Error State */}
          {status === 'error' && (
            <>
              <div className={`w-20 h-20 rounded-full bg-red-100 flex items-center justify-center mb-6 ${
                animated ? 'scale-100' : 'scale-0'
              } transition-transform duration-500`}>
                <X 
                  className={`text-red-600 w-12 h-12 ${
                    animated ? 'opacity-100' : 'opacity-0'
                  } transition-opacity duration-700 delay-300`} 
                />
              </div>
              
              <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
                Email Verification Failed
              </h1>
              
              <div className="text-center space-y-4">
                <p className="text-gray-700 mb-6">
                  {message || "We couldn't verify your email. The verification link may have expired or is invalid."}
                </p>
                
                <Link 
                  to="/gmm/sign" 
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300"
                >
                  Sign Up Again
                </Link>
              </div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p>© 2025 Grow Money More. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-green-600 transition-colors">Help</a>
              <a href="#" className="hover:text-green-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-green-600 transition-colors">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerificationPage;