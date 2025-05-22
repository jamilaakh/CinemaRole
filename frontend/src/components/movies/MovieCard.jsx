import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Heart } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import { useAuth } from '../../contexts/AuthContext';

// Removed TypeScript interface and types
const MovieCard = ({ movie, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useMovies();
  const { isAuthenticated } = useAuth();
  const isFav = isFavorite(movie.id);

  // Removed type annotation from parameter
  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  // Removed type annotation from parameter
  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(movie.id);
    }
  };

  return (
    <motion.div
      className={`relative rounded-lg overflow-hidden ${featured ? 'aspect-[16/9]' : 'aspect-[2/3]'} shadow-lg`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${movie.id}`} className="block h-full">
        {/* Movie Image */}
        <img
          src={featured ? movie.backdropUrl : movie.posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Overlay Gradient */}
        <div
          className={`absolute inset-0 bg-gradient-to-t ${
            featured 
              ? 'from-black/80 via-black/40 to-transparent' 
              : 'from-black/90 via-black/40 to-transparent'
          } transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-90'}`}
        ></div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Title */}
          <h3 className="text-white font-bold text-lg md:text-xl truncate mb-1">
            {movie.title}
          </h3>

          {/* Year & Type */}
          <div className="flex items-center text-sm text-gray-300 mb-2">
            <span>{movie.releaseYear}</span>
            <span className="mx-2">•</span>
            <span className="capitalize">{movie.type}</span>
            {movie.duration && (
              <>
                <span className="mx-2">•</span>
                <Clock className="h-3.5 w-3.5 mr-1" />
                <span>{formatDuration(movie.duration)}</span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-white font-medium">{movie.rating}</span>
            <span className="text-gray-400 ml-1">({movie.reviewCount})</span>
          </div>
        </div>

        {/* Genres */}
        {isHovered && (
          <div className="absolute top-3 left-3 right-3 flex flex-wrap gap-1">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="text-xs bg-black/50 text-white px-2 py-1 rounded-full"
              >
                {genre}
              </span>
            ))}
          </div>
        )}

        {/* Favorite Button */}
        {isAuthenticated && (
          <button
            onClick={handleFavoriteClick}
            className={`absolute top-3 right-3 p-2 rounded-full ${
              isFav ? 'bg-red-600' : 'bg-black/50 hover:bg-black/70'
            } transition-colors duration-200`}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              className={`h-4 w-4 ${isFav ? 'text-white fill-white' : 'text-white'}`}
            />
          </button>
        )}
      </Link>
    </motion.div>
  );
};

export default MovieCard;