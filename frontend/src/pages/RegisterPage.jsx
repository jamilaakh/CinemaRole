import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import './RegisterPage.css';

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
    <div className="register-bg">
      <div className="register-container">
        <motion.div 
          className="register-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="register-card-inner">
            <div className="register-logo-row">
              <Link to="/" className="register-logo-link">
                <Film className="register-logo-icon" />
                <span className="register-logo-text">
                  Cinema<span className="register-logo-highlight">Role</span>
                </span>
              </Link>
            </div>
            
            <h1 className="register-title">
              Create an Account
            </h1>
            
            {error && (
              <div className="register-error">
                {error}
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="register-form-group">
                <label htmlFor="name" className="register-label">
                  Name
                </label>
                <div className="register-input-wrapper">
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="register-input"
                    placeholder="Enter your name"
                    disabled={loading}
                  />
                  <User className="register-input-icon" />
                </div>
              </div>
              
              <div className="register-form-group">
                <label htmlFor="email" className="register-label">
                  Email
                </label>
                <div className="register-input-wrapper">
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="register-input"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                  <Mail className="register-input-icon" />
                </div>
              </div>
              
              <div className="register-form-group">
                <label htmlFor="password" className="register-label">
                  Password
                </label>
                <div className="register-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="register-input"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <Lock className="register-input-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="register-input-btn"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>
              
              <div className="register-form-group">
                <label htmlFor="confirm-password" className="register-label">
                  Confirm Password
                </label>
                <div className="register-input-wrapper">
                  <input
                    id="confirm-password"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="register-input"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <Lock className="register-input-icon" />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="register-submit-btn"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
              
              <p className="register-footer">
                Already have an account?{' '}
                <Link to="/login" className="register-footer-link">
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