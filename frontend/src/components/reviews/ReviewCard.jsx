import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMovies } from '../../contexts/MovieContext';
import StarRating from './StarRating';

const ReviewCard = ({ review, onEdit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const { currentUser, isAdmin } = useAuth();
  const { deleteReview } = useMovies();
  
  const isUserReview = currentUser?.id === review.userId;
  const canDelete = isUserReview || isAdmin;
  const canEdit = isUserReview;
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleDelete = async () => {
    if (window.confirm('Are you sure?')) {
      if (window.confirm('Are you sure you want to delete this review?')) {
        await deleteReview(review.id);
      }
      setShowMenu(false);
    }
  };
  
  const handleEdit = () => {
    setShowMenu(false);
    if (onEdit) onEdit();
  };

  return (
    <motion.div 
      className="bg-neutral-800 rounded-lg p-5 mb-4 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-start mb-3">
        {/* User Info */}
        <div className="flex items-center">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName}
              className="w-10 h-10 rounded-full mr-3 object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3">
              <span className="text-lg font-semibold text-neutral-300">
                {review.userName.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="text-white font-semibold">{review.userName}</div>
            <div className="text-sm text-gray-400">{formatDate(review.createdAt)}</div>
          </div>
        </div>
        
        {/* Actions */}
        {(canDelete || canEdit) && (
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-400 hover:text-white transition-colors p-1"
              aria-label="Review options"
            >
              <MoreVertical className="h-5 w-5" />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-neutral-900 rounded-md shadow-lg overflow-hidden z-10">
                {canEdit && (
                  <button
                    onClick={handleEdit}
                    className="flex w-full items-center px-4 py-2 text-sm text-white hover:bg-neutral-800 transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Edit</span>
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    className="flex w-full items-center px-4 py-2 text-sm text-red-500 hover:bg-neutral-800 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Rating */}
      <div className="mb-3">
        <StarRating value={review.rating} readOnly size="sm" />
      </div>
      
      {/* Review Content */}
      <p className="text-gray-300 mb-4 whitespace-pre-line">{review.content}</p>
      
      {/* Reaction Buttons */}
      <div className="flex space-x-4 text-sm">
        <button className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ThumbsUp className="h-4 w-4 mr-1" />
          <span>Helpful</span>
        </button>
        <button className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ThumbsDown className="h-4 w-4 mr-1" />
          <span>Not Helpful</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;