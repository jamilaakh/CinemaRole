import { useState } from 'react';
import { Star } from 'lucide-react';
import './StarRating.css';

const StarRating = ({ 
  value, 
  onChange, 
  size = 'md', 
  readOnly = false 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  const totalStars = 5;

  return (
    <div className="star-rating">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        const filled = (hoverRating || value) >= starValue;
        return (
          <div
            key={index}
            className={
              `star-rating-star ${size} ${filled ? 'filled' : 'unfilled'}${readOnly ? ' read-only' : ''}`
            }
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            onClick={() => !readOnly && onChange && onChange(starValue)}
          >
            <Star />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;