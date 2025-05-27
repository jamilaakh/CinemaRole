import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';
import './MovieCarousel.css';

const MovieCarousel = ({ title, movies, featured = false }) => {
  const [startIndex, setStartIndex] = useState(0);

  // Number of movies to show at each screen size
  const getVisibleCount = () => {
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 768) return 2;
    if (window.innerWidth < 1024) return 3;
    if (window.innerWidth < 1280) return 4;
    return 5;
  };

  const [visibleCount, setVisibleCount] = useState(getVisibleCount());

  // Update visible count on window resize (useEffect to avoid memory leaks)
  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setStartIndex(prevIndex => Math.max(0, prevIndex - 1));
  };

  const handleNext = () => {
    setStartIndex(prevIndex =>
      Math.min(movies.length - visibleCount, prevIndex + 1)
    );
  };

  const showLeftButton = startIndex > 0;
  const showRightButton = startIndex < movies.length - visibleCount;

  return (
    <div className="movie-carousel">
      <div className="movie-carousel-header">
        <h2 className="movie-carousel-title">{title}</h2>
      </div>

      <div className="movie-carousel-relative movie-carousel-group">
        {/* Left Navigation Button */}
        {showLeftButton && (
          <button
            onClick={handlePrev}
            className="movie-carousel-btn movie-carousel-btn-left"
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
        )}

        {/* Right Navigation Button */}
        {showRightButton && (
          <button
            onClick={handleNext}
            className="movie-carousel-btn movie-carousel-btn-right"
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        )}

        {/* Movie Cards Container */}
        <div className="movie-carousel-overflow">
          <motion.div
            className="movie-carousel-motion"
            initial={false}
            animate={{ x: `calc(-${startIndex * 100}% / ${visibleCount})` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className="movie-carousel-grid"
              style={{ width: `calc(${movies.length * 100}% / ${visibleCount})` }}
            >
              {movies.map(movie => (
                <MovieCard key={movie.id} movie={movie} featured={featured} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieCarousel;