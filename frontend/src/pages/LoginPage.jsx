import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get the redirect path from the location state or default to home
  const from = location.state?.from?.pathname || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email.trim() || !password.trim()) {
      setError('Please enter both email and password');
      return;
    }
    
    try {
      setLoading(true);
      const success = await login(email, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  // For demo purposes, add quick login buttons
  const handleQuickLogin = async (userType) => {
    setLoading(true);
    try {
      let success;
      
      if (userType === 'admin') {
        success = await login('admin@cinemarole.com', 'admin123');
      } else {
        success = await login('user@example.com', 'user123');
      }
      
      if (success) {
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('An error occurred during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-md mx-auto bg-neutral-800 rounded-lg shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-8">
            <div className="flex justify-center mb-8">
              <Link to="/" className="flex items-center">
                <Film className="h-10 w-10 text-red-600 mr-2" />
                <span className="text-3xl font-bold text-white">
                  Cinema<span className="text-red-600">Role</span>
                </span>
              </Link>
            </div>
            
            <h1 className="text-2xl font-bold text-white text-center mb-6">
              Sign In
            </h1>
            
            {error && (
              <div className="bg-red-500/20 text-red-500 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-neutral-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-neutral-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-400"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <p className="text-center text-gray-400 mb-4">
                Don't have an account?{' '}
                <Link to="/register" className="text-red-500 hover:text-red-400 transition-colors">
                  Sign Up
                </Link>
              </p>
            </form>
            
            {/* Demo Quick Login Section */}
            <div className="border-t border-neutral-700 mt-6 pt-6">
              <p className="text-center text-gray-400 mb-4">
                Demo Quick Login
              </p>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => handleQuickLogin('user')}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded-md transition-colors"
                >
                  Regular User
                </button>
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="bg-neutral-700 hover:bg-neutral-600 text-white py-2 rounded-md transition-colors"
                >
                  Admin User
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;