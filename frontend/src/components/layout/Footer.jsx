import { Link } from 'react-router-dom';
import { Film, Mail, Twitter, Instagram, Facebook } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="footer-logo-link">
              <Film className="footer-logo-icon" />
              <span className="footer-logo-text">
                Cinema<span className="footer-logo-highlight">Role</span>
              </span>
            </Link>
            <p className="footer-desc">
              Your ultimate platform for discovering, rating, and discussing films and TV series.
              Join our community of passionate movie enthusiasts.
            </p>
            <div className="footer-socials">
              <a href="#" className="footer-social-link">
                <Twitter className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Facebook className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Instagram className="footer-social-icon" />
              </a>
              <a href="#" className="footer-social-link">
                <Mail className="footer-social-icon" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-section-title">Explore</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/movies" className="footer-link">
                  Movies
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/series" className="footer-link">
                  TV Series
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/top-rated" className="footer-link">
                  Top Rated
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/new-releases" className="footer-link">
                  New Releases
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="footer-section-title">Company</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/contact" className="footer-link">
                  Contact
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/careers" className="footer-link">
                  Careers
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="footer-section-title">Legal</h3>
            <ul className="footer-list">
              <li className="footer-list-item">
                <Link to="/terms" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/privacy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/cookies" className="footer-link">
                  Cookie Policy
                </Link>
              </li>
              <li className="footer-list-item">
                <Link to="/licensing" className="footer-link">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {currentYear} CinemaRole. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;