import { useState } from 'react';
import { Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import { Film, Users, BarChart2, Settings, Menu, X } from 'lucide-react';
import AdminMovies from './AdminMovies';
import AdminUsers from './AdminUsers';
import AdminStats from './AdminStats';
import AdminSettings from './AdminSettings';

const AdminDashboard = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Get the current active path
  const getActivePath = () => {
    const path = location.pathname;
    if (path === '/admin') return 'movies';
    if (path.includes('/admin/users')) return 'users';
    if (path.includes('/admin/stats')) return 'stats';
    if (path.includes('/admin/settings')) return 'settings';
    return '';
  };

  const activePath = getActivePath();

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  // Close mobile menu when location changes
  if (mobileMenuOpen && location.pathname !== '/admin') {
    setMobileMenuOpen(false);
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-sidebar-wrapper">
        {/* Sidebar - Desktop */}
        <aside className="admin-dashboard-sidebar">
          <div className="admin-dashboard-sidebar-inner">
            <h2 className="admin-dashboard-title">Admin Dashboard</h2>
            <nav className="admin-dashboard-nav">
              <Link
                to="/admin"
                className={`admin-dashboard-nav-link${activePath === 'movies' ? ' active' : ''}`}
              >
                <Film className="tab-icon" />
                <span>Movies & Series</span>
              </Link>
              <Link
                to="/admin/users"
                className={`admin-dashboard-nav-link${activePath === 'users' ? ' active' : ''}`}
              >
                <Users className="tab-icon" />
                <span>Users</span>
              </Link>
              <Link
                to="/admin/stats"
                className={`admin-dashboard-nav-link${activePath === 'stats' ? ' active' : ''}`}
              >
                <BarChart2 className="tab-icon" />
                <span>Statistics</span>
              </Link>
              <Link
                to="/admin/settings"
                className={`admin-dashboard-nav-link${activePath === 'settings' ? ' active' : ''}`}
              >
                <Settings className="tab-icon" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Mobile Menu Button */}
        <div className="admin-dashboard-mobilebar">
          <div className="admin-dashboard-mobilebar-inner">
            <h2 className="admin-dashboard-title">Admin Dashboard</h2>
            <button
              onClick={toggleMobileMenu}
              className="admin-dashboard-mobilebar-btn"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="admin-dashboard-mobilemenu">
            <nav className="admin-dashboard-nav">
              <Link
                to="/admin"
                className={`admin-dashboard-nav-link${activePath === 'movies' ? ' active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Film className="tab-icon" />
                <span>Movies & Series</span>
              </Link>
              <Link
                to="/admin/users"
                className={`admin-dashboard-nav-link${activePath === 'users' ? ' active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="tab-icon" />
                <span>Users</span>
              </Link>
              <Link
                to="/admin/stats"
                className={`admin-dashboard-nav-link${activePath === 'stats' ? ' active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart2 className="tab-icon" />
                <span>Statistics</span>
              </Link>
              <Link
                to="/admin/settings"
                className={`admin-dashboard-nav-link${activePath === 'settings' ? ' active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings className="tab-icon" />
                <span>Settings</span>
              </Link>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="admin-dashboard-main">
          <Routes>
            <Route path="/" element={<AdminMovies />} />
            <Route path="/users" element={<AdminUsers />} />
            <Route path="/stats" element={<AdminStats />} />
            <Route path="/settings" element={<AdminSettings />} />
            <Route path="*" element={<Navigate to="/admin" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;