import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError('All fields are required');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    try {
      setLoading(true);
      const success = await register(name, email, password);
      
      if (success) {
        navigate('/');
      } else {
        setError('Email already in use or registration failed');
      }
    } catch (err) {
      setError('An error occurred during registration');
      console.error(err);
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
              Create an Account
            </h1>
            
            {error && (
              <div className="bg-red-500/20 text-red-500 px-4 py-3 rounded-md mb-6">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Name
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-neutral-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                  <User className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
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
              
              <div className="mb-4">
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
              
              <div className="mb-6">
                <label htmlFor="confirm-password" className="block text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-neutral-700 text-white px-4 py-3 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <p className="text-center text-gray-400">
                Already have an account?{' '}
                <Link to="/login" className="text-red-500 hover:text-red-400 transition-colors">
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;