import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import MovieCard from './MovieCard';

// Removed TypeScript interface and types
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
    <div className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl md:text-2xl font-bold text-white">{title}</h2>
      </div>

      <div className="relative group">
        {/* Left Navigation Button */}
        {showLeftButton && (
          <button
            onClick={handlePrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -ml-5"
            aria-label="Previous"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>
        )}

        {/* Right Navigation Button */}
        {showRightButton && (
          <button
            onClick={handleNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 -mr-5"
            aria-label="Next"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        )}

        {/* Movie Cards Container */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            initial={false}
            animate={{ x: `calc(-${startIndex * 100}% / ${visibleCount})` }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div
              className={`grid grid-flow-col auto-cols-fr gap-4`}
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