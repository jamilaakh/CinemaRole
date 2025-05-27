import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './LoginPage.css';

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
    <div className="login-bg">
      <div className="login-container">
        <motion.div 
          className="login-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="login-card-inner">
            <div className="login-logo-row">
              <Link to="/" className="login-logo-link">
                <Film className="login-logo-icon" />
                <span className="login-logo-text">
                  Cinema<span className="login-logo-highlight">Role</span>
                </span>
              </Link>
            </div>
            
            <h1 className="login-title">
              Sign In
            </h1>
            
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="login-form-group">
                <label htmlFor="email" className="login-label">
                  Email
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="login-input-icon" />
                </div>
              </div>
              
              <div className="login-form-group">
                <label htmlFor="password" className="login-label">
                  Password
                </label>
                <div className="login-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <Lock className="login-input-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-input-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="login-submit-btn"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
              
              <p className="login-footer">
                Don't have an account?{' '}
                <Link to="/register" className="login-footer-link">
                  Sign Up
                </Link>
              </p>
            </form>
            
            {/* Demo Quick Login Section */}
            <div className="login-demo-section">
              <p className="login-demo-title">
                Demo Quick Login
              </p>
              <div className="login-demo-buttons">
                <button
                  onClick={() => handleQuickLogin('user')}
                  className="login-demo-btn"
                >
                  Regular User
                </button>
                <button
                  onClick={() => handleQuickLogin('admin')}
                  className="login-demo-btn"
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