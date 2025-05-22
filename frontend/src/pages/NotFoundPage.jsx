import { Link } from 'react-router-dom';
import { Film, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const NotFoundPage = () => {
  return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Film className="h-24 w-24 text-red-600 mx-auto mb-6" />
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Page Not Found
          </h2>
          
          <p className="text-gray-400 max-w-lg mx-auto mb-8">
            The page you are looking for might have been removed, had its name changed,
            or is temporarily unavailable.
          </p>
          
          <Link
            to="/"
            className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            <span>Back to Home</span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFoundPage;