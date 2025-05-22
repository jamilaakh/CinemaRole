import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, X } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import StarRating from './StarRating';

// Removed TypeScript interface and types
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
      className="bg-neutral-800 rounded-lg p-5 mb-6 shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-white">
          {isEditing ? 'Edit Your Review' : 'Write a Review'}
        </h3>
        {onCancel && (
          <button 
            onClick={onCancel}
            className="text-gray-400 hover:text-white p-1"
            aria-label="Cancel"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-300 mb-2">Your Rating</label>
          <StarRating 
            value={rating} 
            onChange={setRating} 
            size="lg" 
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="review-content" className="block text-gray-300 mb-2">
            Your Review
          </label>
          <textarea
            id="review-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Share your thoughts about this title..."
            className="w-full bg-neutral-700 text-white rounded-md p-3 min-h-32 focus:outline-none focus:ring-2 focus:ring-red-600"
            disabled={isSubmitting}
          ></textarea>
        </div>
        
        {error && (
          <div className="mb-4 text-red-500 text-sm">{error}</div>
        )}
        
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4 mr-2" />
            <span>{isEditing ? 'Update Review' : 'Submit Review'}</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;