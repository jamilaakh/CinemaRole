import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, User, LogOut, Menu, X, Film, Star } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || mobileMenuOpen ? 'bg-neutral-900 shadow-lg' : 'bg-gradient-to-b from-neutral-900 to-transparent'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Film className="h-8 w-8 text-red-600 mr-2" />
            <span className="text-2xl font-bold text-white">
              Cinema<span className="text-red-600">Role</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link to="/movies" className="text-gray-300 hover:text-white transition-colors">
              Movies
            </Link>
            <Link to="/series" className="text-gray-300 hover:text-white transition-colors">
              TV Series
            </Link>
            <Link to="/top-rated" className="text-gray-300 hover:text-white transition-colors">
              Top Rated
            </Link>
          </nav>

          {/* Search & User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-neutral-800 text-white rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600 w-56"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link to="/profile" className="flex items-center text-gray-300 hover:text-white">
                  {currentUser?.avatar ? (
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="h-8 w-8 rounded-full object-cover border-2 border-red-600"
                    />
                  ) : (
                    <User className="h-6 w-6" />
                  )}
                </Link>
                {currentUser?.role === 'admin' && (
                  <Link 
                    to="/admin"
                    className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1.5 rounded-md transition-colors"
                  >
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="text-white hover:text-red-500 transition-colors"
                >
                  Login
                </Link>
                <span className="text-gray-500">|</span>
                <Link
                  to="/register"
                  className="text-white hover:text-red-500 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-neutral-900 px-4 py-4 shadow-lg">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-neutral-800 text-white rounded-full w-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </form>

          <nav className="flex flex-col space-y-3 mb-4">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors py-1">
              Home
            </Link>
            <Link to="/movies" className="text-gray-300 hover:text-white transition-colors py-1">
              Movies
            </Link>
            <Link to="/series" className="text-gray-300 hover:text-white transition-colors py-1">
              TV Series
            </Link>
            <Link to="/top-rated" className="text-gray-300 hover:text-white transition-colors py-1">
              Top Rated
            </Link>
          </nav>

          {isAuthenticated ? (
            <div className="flex flex-col space-y-3 border-t border-neutral-800 pt-3">
              <Link to="/profile" className="flex items-center text-gray-300 hover:text-white py-1">
                {currentUser?.avatar ? (
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full object-cover border-2 border-red-600 mr-2"
                  />
                ) : (
                  <User className="h-6 w-6 mr-2" />
                )}
                <span>My Profile</span>
              </Link>
              <Link to="/favorites" className="flex items-center text-gray-300 hover:text-white py-1">
                <Star className="h-5 w-5 mr-2" />
                <span>Favorites</span>
              </Link>
              {currentUser?.role === 'admin' && (
                <Link to="/admin" className="flex items-center text-gray-300 hover:text-white py-1">
                  <Film className="h-5 w-5 mr-2" />
                  <span>Admin Dashboard</span>
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center text-gray-300 hover:text-white py-1"
              >
                <LogOut className="h-5 w-5 mr-2" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex justify-between border-t border-neutral-800 pt-3">
              <Link
                to="/login"
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors w-1/2 mr-2 text-center"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors w-1/2 ml-2 text-center"
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