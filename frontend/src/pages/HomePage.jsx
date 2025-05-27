import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useMovies } from '../contexts/MovieContext';
import MovieCarousel from '../components/movies/MovieCarousel';
import { ChevronRight, Play, Info } from 'lucide-react';
import { Link } from 'react-router-dom';
import './HomePage.css';

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
    <div className="home-bg">
      {/* Hero Section */}
      {heroMovie && (
        <div className="home-hero">
          {/* Background Image */}
          <div className="home-hero-bg">
            <motion.img
              key={heroMovie.id}
              src={heroMovie.backdropUrl}
              alt={heroMovie.title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            />
            <div className="home-hero-gradient"></div>
          </div>
          
          {/* Content */}
          <div className="home-hero-content-container">
            <motion.div 
              className="home-hero-content"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h1 
                className="home-hero-title"
                key={`title-${heroMovie.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {heroMovie.title}
              </motion.h1>
              
              <motion.div 
                className="home-hero-meta"
                key={`meta-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <span>{heroMovie.releaseYear}</span>
                <span className="home-hero-meta-dot">•</span>
                <span className="capitalize">{heroMovie.type}</span>
                <span className="home-hero-meta-dot">•</span>
                <div className="home-hero-rating">
                  <span className="home-hero-rating-value">{heroMovie.rating}</span>
                  <span className="home-hero-rating-count">({heroMovie.reviewCount})</span>
                </div>
              </motion.div>
              
              <motion.p 
                className="home-hero-synopsis"
                key={`synopsis-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                {heroMovie.synopsis}
              </motion.p>
              
              <motion.div 
                className="home-hero-buttons"
                key={`buttons-${heroMovie.id}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Link 
                  to={`/movie/${heroMovie.id}`}
                  className="home-hero-btn"
                >
                  <Info style={{ marginRight: '0.5rem' }} />
                  <span>More Info</span>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}

      {/* Movie Sections */}
      <div className="home-section-container">
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
        <div className="home-featured-section">
          <div className="home-featured-header">
            <h2 className="home-featured-title">Featured Today</h2>
            <Link 
              to="/featured" 
              className="home-featured-link"
            >
              <span>View All</span>
              <ChevronRight style={{ width: '1.25rem', height: '1.25rem' }} />
            </Link>
          </div>
          
          <div className="home-featured-grid">
            {featuredMovies.slice(0, 2).map(movie => (
              <div key={movie.id} className="home-featured-card">
                <Link to={`/movie/${movie.id}`}>
                  <img 
                    src={movie.backdropUrl} 
                    alt={movie.title} 
                    className="home-featured-card-img"
                  />
                  <div className="home-featured-card-gradient"></div>
                  
                  <div className="home-featured-card-content">
                    <h3 className="home-featured-card-title">{movie.title}</h3>
                    <p className="home-featured-card-synopsis">{movie.synopsis}</p>
                    
                    <div className="home-featured-card-meta">
                      <span>{movie.releaseYear}</span>
                      <span className="home-featured-card-meta-dot">•</span>
                      <span className="capitalize">{movie.type}</span>
                      <span className="home-featured-card-meta-dot">•</span>
                      <span className="home-featured-card-rating">{movie.rating}</span>
                    </div>
                  </div>
                  
                  <div className="home-featured-card-play">
                    <div className="home-featured-card-play-btn">
                      <Play style={{ width: '2rem', height: '2rem', color: 'white' }} fill="white" />
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