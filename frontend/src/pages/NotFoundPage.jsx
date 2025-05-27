import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="notfound-bg">
      <div className="notfound-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Film className="notfound-icon" />
          
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">
            Page Not Found
          </h2>
          
          <p className="notfound-desc">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <Link
            to="/"
            className="notfound-home-link"
          >
            <ArrowLeft className="notfound-home-icon" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;