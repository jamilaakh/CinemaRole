import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Clock, Heart } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import { useAuth } from '../../contexts/AuthContext';
import './MovieCard.css';

const MovieCard = ({ movie, featured = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { toggleFavorite, isFavorite } = useMovies();
  const { isAuthenticated } = useAuth();
  const isFav = isFavorite(movie.id);

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAuthenticated) {
      toggleFavorite(movie.id);
    }
  };

  return (
    <motion.div
      className={`movie-card ${featured ? 'aspect-16-9' : 'aspect-2-3'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${movie.id}`} className="movie-card-link">
        {/* Movie Image */}
        <img
          src={featured ? movie.backdropUrl : movie.posterUrl}
          alt={movie.title}
          className="movie-card-img"
          style={{ transform: isHovered ? 'scale(1.05)' : 'scale(1)' }}
        />

        {/* Overlay Gradient */}
        <div
          className={`movie-card-overlay${featured ? ' featured' : ''}${isHovered ? ' hovered' : ''}`}
        ></div>

        {/* Content */}
        <div className="movie-card-content">
          {/* Title */}
          <h3 className="movie-card-title">
            {movie.title}
          </h3>

          {/* Year & Type */}
          <div className="movie-card-meta">
            <span>{movie.releaseYear}</span>
            <span className="movie-card-dot">•</span>
            <span className="capitalize">{movie.type}</span>
            {movie.duration && (
              <>
                <span className="movie-card-dot">•</span>
                <Clock style={{ height: '1rem', width: '1rem', marginRight: '0.25rem' }} />
                <span>{formatDuration(movie.duration)}</span>
              </>
            )}
          </div>

          {/* Rating */}
          <div className="movie-card-rating">
            <Star style={{ height: '1.1rem', width: '1.1rem', color: '#facc15', fill: '#facc15', marginRight: '0.25rem' }} />
            <span className="movie-card-rating-value">{movie.rating}</span>
            <span className="movie-card-rating-count">({movie.reviewCount})</span>
          </div>
        </div>

        {/* Genres */}
        {isHovered && (
          <div className="movie-card-genres">
            {movie.genres.slice(0, 3).map((genre, index) => (
              <span
                key={index}
                className="movie-card-genre"
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
            className={`movie-card-fav-btn${isFav ? ' fav' : ''}`}
            aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
          >
            <Heart
              style={{
                height: '1rem',
                width: '1rem',
                color: isFav ? '#fff' : '#fff',
                fill: isFav ? '#fff' : 'none'
              }}
            />
          </button>
        )}
      </Link>
    </motion.div>
  );
};

export default MovieCard;