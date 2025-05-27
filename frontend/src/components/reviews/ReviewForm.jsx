import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import StarRating from './StarRating';
import './ReviewForm.css';

const ReviewForm = ({ 
  movieId, 
  existingReview, 
  onCancel, 
  onSuccess 
}) => {
  const { addReview, updateReview } = useMovies();
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [content, setContent] = useState(existingReview?.content || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const isEditing = !!existingReview;
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    
    if (content.trim().length < 10) {
      setError('Review content must be at least 10 characters');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      let success;
      
      if (isEditing && existingReview) {
        success = await updateReview(existingReview.id, rating, content);
      } else {
        success = await addReview(movieId, rating, content);
      }
      
      if (success) {
        setRating(0);
        setContent('');
        if (onSuccess) onSuccess();
      } else {
        setError('Failed to save review. Please try again.');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      className="review-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="review-form-header">
        <h3 className="review-form-title">
          {isEditing ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="review-form-cancel-btn"
            aria-label="Cancel"
          >
            <X style={{ height: '1.25rem', width: '1.25rem' }} />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="review-form-rating">
          <label className="review-form-label">Your Rating</label>
          <StarRating 
            value={rating} 
            onChange={setRating} 
            size="lg" 
          />
        </div>
        
        <div className="review-form-rating">
          <label htmlFor="review-content" className="review-form-label">
            Your Review
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts about this title..."
            className="review-form-textarea"
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        {error && (
          <div className="review-form-error">{error}</div>
        )}
        
        <div className="review-form-actions">
          <button
            type="submit"
            disabled={isSubmitting}
            className="review-form-submit-btn"
          >
            <Send className="review-form-submit-icon" />
            <span>{isEditing ? 'Update Review' : 'Submit Review'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;