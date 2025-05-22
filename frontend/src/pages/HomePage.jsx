import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMovies } from '../contexts/MovieContext';
import MovieCarousel from '../components/movies/MovieCarousel';
import { ChevronRight, Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { featuredMovies, popularMovies, newReleases } = useMovies();
  const [heroMovie, setHeroMovie] = useState(featuredMovies[0]);
  
  // Rotate hero movie every 8 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setHeroMovie(prevMovie => {
        const currentIndex = featuredMovies.findIndex(m => m.id === prevMovie.id);
        const nextIndex = (currentIndex + 1) % featuredMovies.length;
        return featuredMovies[nextIndex];
      });
    }, 8000);
    
    return () => clearInterval(interval);
  }, [featuredMovies]);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      {heroMovie && (
        <div className="relative h-[70vh] mb-12">
          {/* Background Image */}
          <div className="absolute inset-0 bg-black/30">
            <motion.img
              key={heroMovie.id}
              src={heroMovie.backdropUrl}
              alt={heroMovie.title}
              className="w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent"></div>
          </div>
          
          {/* Content */}
          <div className="container mx-auto px-4 h-full flex items-center relative z-10">
            <motion.div 
              className="max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-white mb-4"
                key={`title-${heroMovie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {heroMovie.title}
              </motion.h1>
              
              <motion.div 
                className="flex items-center mb-4"
                key={`meta-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span className="text-gray-300">{heroMovie.releaseYear}</span>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-300 capitalize">{heroMovie.type}</span>
                <span className="mx-2 text-gray-500">•</span>
                <div className="flex items-center">
                  <span className="text-yellow-500 font-bold">{heroMovie.rating}</span>
                  <span className="text-gray-400 ml-1">({heroMovie.reviewCount})</span>
                </div>
              </motion.div>
              
              <motion.p 
                className="text-gray-300 mb-6 line-clamp-3"
                key={`synopsis-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {heroMovie.synopsis}
              </motion.p>
              
              <motion.div 
                className="flex flex-wrap gap-3"
                key={`buttons-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link 
                  to={`/movie/${heroMovie.id}`}
                  className="flex items-center bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md transition-colors"
                >
                  <Info className="h-5 w-5 mr-2" />
                  <span>More Info</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Movie Sections */}
      <div className="container mx-auto px-4 pb-12">
        {/* Popular Movies */}
        <MovieCarousel 
          title="Popular Movies & Shows" 
          movies={popularMovies} 
        />
        
        {/* New Releases */}
        <MovieCarousel 
          title="New Releases" 
          movies={newReleases} 
        />
        
        {/* Featured */}
        <div className="mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-white">Featured Today</h2>
            <Link 
              to="/featured" 
              className="flex items-center text-red-600 hover:text-red-500 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredMovies.slice(0, 2).map(movie => (
              <div key={movie.id} className="relative rounded-lg overflow-hidden aspect-video shadow-lg">
                <Link to={`/movie/${movie.id}`}>
                  <img 
                    src={movie.backdropUrl} 
                    alt={movie.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-white font-bold text-xl mb-1">{movie.title}</h3>
                    <p className="text-gray-300 line-clamp-2 mb-2">{movie.synopsis}</p>
                    
                    <div className="flex items-center text-sm text-gray-300">
                      <span>{movie.releaseYear}</span>
                      <span className="mx-2">•</span>
                      <span className="capitalize">{movie.type}</span>
                      <span className="mx-2">•</span>
                      <span className="text-yellow-500 font-medium">{movie.rating}</span>
                    </div>
                  </div>
                  
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity">
                    <div className="bg-red-600 rounded-full p-4">
                      <Play className="h-8 w-8 text-white" fill="white" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;