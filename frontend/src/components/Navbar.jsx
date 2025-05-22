import React from 'react';
import { FilmIcon, UserCircle, Menu, X } from 'lucide-react';

const Navbar = ({ user, onNavigate, currentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-row">
          {/* Logo */}
          <div className="navbar-logo">
            <FilmIcon className="h-8 w-8" style={{ color: 'var(--netflix-red)' }} />
            <span className="navbar-logo-text">CinemaRole</span>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-desktop-nav">
            <button
              onClick={() => onNavigate('profile')}
              className={`navbar-btn${currentPage === 'profile' ? ' active' : ''}`}
            >
              Profile
            </button>
            {user.role === 'admin' && (
              <button
                onClick={() => onNavigate('admin')}
                className={`navbar-btn${currentPage === 'admin' ? ' active' : ''}`}
              >
                Admin Dashboard
              </button>
            )}
            <div className="navbar-user">
              {user.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="navbar-avatar"
                />
              ) : (
                <UserCircle className="h-8 w-8" style={{ color: '#9ca3af' }} />
              )}
              <span className="navbar-user-name">{user.name}</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={toggleMenu}
            className="navbar-mobile-btn"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="navbar-mobile-menu">
            <div className="navbar-mobile-links">
              <button
                onClick={() => {
                  onNavigate('profile');
                  setIsMenuOpen(false);
                }}
                className={`navbar-btn${currentPage === 'profile' ? ' active' : ''}`}
              >
                Profile
              </button>
              {user.role === 'admin' && (
                <button
                  onClick={() => {
                    onNavigate('admin');
                    setIsMenuOpen(false);
                  }}
                  className={`navbar-btn${currentPage === 'admin' ? ' active' : ''}`}
                >
                  Admin Dashboard
                </button>
              )}
              <div className="navbar-mobile-user">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="navbar-avatar"
                  />
                ) : (
                  <UserCircle className="h-8 w-8" style={{ color: '#9ca3af' }} />
                )}
                <span className="navbar-user-name">{user.name}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;