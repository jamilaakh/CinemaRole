import { useState } from 'react';
import { Star } from 'lucide-react';

// Removed TypeScript interface and types
const StarRating = ({ 
  value, 
  onChange, 
  size = 'md', 
  readOnly = false 
}) => {
  const [hoverRating, setHoverRating] = useState(0);
  
  const getStarSize = () => {
    switch(size) {
      case 'sm': return 'h-4 w-4';
      case 'lg': return 'h-8 w-8';
      default: return 'h-6 w-6';
    }
  };
  
  const starSize = getStarSize();
  const totalStars = 5;

  return (
    <div className="flex">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        
        return (
          <div
            key={index}
            className={`${!readOnly ? 'cursor-pointer' : ''} p-0.5`}
            onMouseEnter={() => !readOnly && setHoverRating(starValue)}
            onMouseLeave={() => !readOnly && setHoverRating(0)}
            onClick={() => !readOnly && onChange && onChange(starValue)}
          >
            <Star
              className={`${starSize} transition-all duration-200 ${
                (hoverRating || value) >= starValue
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-gray-400'
              }`}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;