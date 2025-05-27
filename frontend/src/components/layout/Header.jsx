import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, Film, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header
      className={`header ${
        isScrolled || mobileMenuOpen ? 'header-bg' : 'header-gradient'
      }`}
    >
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="header-logo-link">
          <Film className="header-logo-icon" />
          <span className="header-logo-text">
            Cinema<span className="header-logo-highlight">Role</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <Link to="/" className="header-link">
            Home
          </Link>
          <Link to="/movies" className="header-link">
            Movies
          </Link>
          <Link to="/series" className="header-link">
            TV Series
          </Link>
          <Link to="/top-rated" className="header-link">
            Top Rated
          </Link>
        </nav>

        {/* Search & User Actions */}
        <div className="header-user-actions">
          <form onSubmit={handleSearch} className="header-search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
            <Search className="header-search-icon" />
          </form>

          {isAuthenticated ? (
            <div className="header-user-actions">
              <Link to="/profile" className="header-link" style={{ display: 'flex', alignItems: 'center' }}>
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header-avatar"
                  />
                ) : (
                  <User className="header-avatar" />
                )}
              </Link>
              {currentUser?.role === 'admin' && (
                <Link to="/admin" className="header-admin-link">
                  Admin
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="header-logout-btn"
                aria-label="Logout"
              >
                <LogOut className="header-avatar" style={{ height: '1.25rem', width: '1.25rem' }} />
              </button>
            </div>
          ) : (
            <div className="header-auth-links">
              <Link to="/login" className="header-auth-link">
                Login
              </Link>
              <span className="header-auth-divider">|</span>
              <Link to="/register" className="header-auth-link">
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="header-mobile-menu-btn"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <X style={{ height: '1.5rem', width: '1.5rem' }} /> : <Menu style={{ height: '1.5rem', width: '1.5rem' }} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="header-mobile-menu">
          <form onSubmit={handleSearch} className="header-mobile-search-form">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-mobile-search-input"
            />
            <Search className="header-mobile-search-icon" />
          </form>

          <nav className="header-mobile-nav">
            <Link to="/" className="header-mobile-link">
              Home
            </Link>
            <Link to="/movies" className="header-mobile-link">
              Movies
            </Link>
            <Link to="/series" className="header-mobile-link">
              TV Series
            </Link>
            <Link to="/top-rated" className="header-mobile-link">
              Top Rated
            </Link>
          </nav>

          {isAuthenticated ? (
            <div className="header-mobile-user">
              <Link to="/profile" className="header-mobile-profile-link">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="header-mobile-avatar"
                  />
                ) : (
                  <User className="header-mobile-avatar" />
                )}
                <span>My Profile</span>
              </Link>
              <Link to="/favorites" className="header-mobile-profile-link">
                <Star style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} />
                <span>Favorites</span>
              </Link>
              {currentUser?.role === 'admin' && (
                <Link to="/admin" className="header-mobile-admin-link">
                  <Film style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="header-mobile-logout-btn"
              >
                <LogOut style={{ height: '1.25rem', width: '1.25rem', marginRight: '0.5rem' }} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="header-mobile-auth">
              <Link
                to="/login"
                className="header-mobile-login-link"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="header-mobile-register-link"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;