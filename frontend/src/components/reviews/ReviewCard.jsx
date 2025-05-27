import { useState } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Edit, ThumbsUp, ThumbsDown, MoreVertical } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useMovies } from '../../contexts/MovieContext';
import StarRating from './StarRating';
import './ReviewCard.css';

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
      className="review-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="review-card-header">
        {/* User Info */}
        <div className="review-card-user">
          {review.userAvatar ? (
            <img 
              src={review.userAvatar} 
              alt={review.userName}
              className="review-card-avatar-img"
            />
          ) : (
            <div className="review-card-avatar-placeholder">
              <span className="review-card-avatar-initial">
                {review.userName.charAt(0)}
              </span>
            </div>
          )}
          <div className="review-card-user-info">
            <div className="review-card-user-name">{review.userName}</div>
            <div className="review-card-date">{formatDate(review.createdAt)}</div>
          </div>
        </div>
        
        {/* Actions */}
        {(canDelete || canEdit) && (
          <div className="review-card-actions">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="review-card-action-btn"
              aria-label="Review options"
            >
              <MoreVertical style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
            
            {showMenu && (
              <div className="review-card-menu">
                {canEdit && (
                  <button
                    onClick={handleEdit}
                    className="review-card-menu-btn"
                  >
                    <Edit style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                    <span>Edit</span>
                  </button>
                )}
                {canDelete && (
                  <button
                    onClick={handleDelete}
                    className="review-card-menu-btn delete"
                  >
                    <Trash2 style={{ height: '1rem', width: '1rem', marginRight: '0.5rem' }} />
                    <span>Delete</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
      
      {/* Rating */}
      <div className="review-card-rating">
        <StarRating value={review.rating} readOnly size="sm" />
      </div>
      
      {/* Review Content */}
      <p className="review-card-content">{review.content}</p>
      
      {/* Reaction Buttons */}
      <div className="review-card-reactions">
        <button className="review-card-reaction-btn">
          <ThumbsUp />
          <span>Helpful</span>
        </button>
        <button className="review-card-reaction-btn">
          <ThumbsDown />
          <span>Not Helpful</span>
        </button>
      </div>
    </motion.div>
  );
};

export default ReviewCard;