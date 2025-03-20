import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  // const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Login attempted with:', formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen hatch p-4">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-8">Login</h1>
        
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-6">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-1">
              Email<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail size={20} className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>
          
          {/* Password Field */}
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-1">
              Password<span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={20} className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 
                  <EyeOff size={20} className="text-gray-400 hover:text-gray-600" /> : 
                  <Eye size={20} className="text-gray-400 hover:text-gray-600" />
                }
              </button>
            </div>
          </div>
          
          {/* Forgot Password Link */}
          <div className="flex justify-end mb-6 gap-2">
          Forget Password?
          <Link 
              to={'/fp'}
              className="text-sm text-indigo-700 hover:text-indigo-900 font-medium transition-colors"
            >
              <span className="underline"> Click here</span>
            </Link>
          </div>
          
          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 px-4 border border-transparent rounded-lg text-center text-lg font-medium text-white nblue  hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 shadow-md transition-all duration-200 transform hover:-translate-y-1"
          >
            LOGIN
          </button>
          
          {/* Create Account Link - Adding this as a nice enhancement */}
          <div className="mt-6 text-center text-sm">
            Don't have an account? <Link to={'/sign'} className="text-indigo-700 hover:text-indigo-900 font-medium">Create Account</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;