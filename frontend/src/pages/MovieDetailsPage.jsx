import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Heart, Star, PenSquare, Calendar, Film, User } from 'lucide-react';
import { useMovies } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';
import ReviewCard from '../components/reviews/ReviewCard';
import ReviewForm from '../components/reviews/ReviewForm';
import StarRating from '../components/reviews/StarRating';
import MovieCarousel from '../components/movies/MovieCarousel';

const MovieDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieId = parseInt(id || '0');
  const { getMovieById, getReviewsByMovieId, getUserReviewForMovie, popularMovies, toggleFavorite, isFavorite } = useMovies();
  const { isAuthenticated } = useAuth();
  const movie = getMovieById(movieId);
  const reviews = getReviewsByMovieId(movieId);
  const userReview = getUserReviewForMovie(movieId);
  
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(false);
  const isFav = isFavorite(movieId);

  useEffect(() => {
    // Redirect if movie not found
    if (!movie) {
      navigate('/not-found');
    }
  }, [movie, navigate]);

  if (!movie) return null;

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const handleWriteReview = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    setIsEditingReview(false);
    setShowReviewForm(true);
  };

  const handleEditReview = () => {
    setIsEditingReview(true);
    setShowReviewForm(true);
  };

  const handleReviewSuccess = () => {
    setShowReviewForm(false);
  };

  const handleToggleFavorite = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    
    toggleFavorite(movieId);
  };

  // Filter out similar movies (excluding current movie)
  const similarMovies = popularMovies
    .filter(m => 
      m.id !== movie.id && 
      m.genres.some(g => movie.genres.includes(g))
    )
    .slice(0, 10);

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="relative">
        {/* Background */}
        <div className="absolute inset-0 h-[60vh] md:h-[70vh] bg-black/30">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent"></div>
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 pt-[20vh] md:pt-[25vh] pb-8 relative z-10">
          <div className="flex flex-col md:flex-row items-start gap-8">
            {/* Poster */}
            <motion.div 
              className="hidden md:block w-64 rounded-lg overflow-hidden shadow-xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
                className="w-full h-auto"
              />
            </motion.div>
            
            {/* Details */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                {movie.title}
              </h1>
              
              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-6 text-sm md:text-base">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-gray-300">{movie.releaseYear}</span>
                </div>
                
                <div className="flex items-center">
                  <Film className="h-4 w-4 mr-1 text-gray-400" />
                  <span className="text-gray-300 capitalize">{movie.type}</span>
                </div>
                
                {movie.duration > 0 && (
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-gray-400" />
                    <span className="text-gray-300">{formatDuration(movie.duration)}</span>
                  </div>
                )}
                
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-500 fill-yellow-500" />
                  <span className="text-white font-medium">{movie.rating}</span>
                  <span className="text-gray-400 ml-1">({movie.reviewCount})</span>
                </div>
              </div>
              
              {/* Genres */}
              <div className="flex flex-wrap gap-2 mb-6">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="bg-neutral-800 text-gray-300 px-3 py-1 text-sm rounded-full"
                  >
                    {genre}
                  </span>
                ))}
              </div>
              
              {/* Synopsis */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold text-white mb-2">Synopsis</h2>
                <p className="text-gray-300">{movie.synopsis}</p>
              </div>
              
              {/* Director & Cast */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Director</h2>
                  <p className="text-gray-300">{movie.director}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold text-white mb-2">Cast</h2>
                  <div className="flex flex-wrap gap-2">
                    {movie.cast.map((actor, index) => (
                      <span key={index} className="text-gray-300">
                        {actor}{index < movie.cast.length - 1 ? ', ' : ''}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleToggleFavorite}
                  className={`flex items-center ${
                    isFav 
                      ? 'bg-red-600 hover:bg-red-700' 
                      : 'bg-neutral-800 hover:bg-neutral-700'
                  } text-white px-4 py-2 rounded-md transition-colors`}
                >
                  <Heart className={`h-5 w-5 mr-2 ${isFav ? 'fill-white' : ''}`} />
                  <span>{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
                
                {!userReview && (
                  <button
                    onClick={handleWriteReview}
                    className="flex items-center bg-neutral-800 hover:bg-neutral-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <PenSquare className="h-5 w-5 mr-2" />
                    <span>Write a Review</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold text-white mb-6">
          Reviews
          <span className="text-gray-400 text-lg font-normal ml-2">
            ({reviews.length})
          </span>
        </h2>
        
        {/* User Review Form */}
        {isAuthenticated && showReviewForm && (
          <ReviewForm
            movieId={movieId}
            existingReview={isEditingReview ? userReview : undefined}
            onCancel={() => setShowReviewForm(false)}
            onSuccess={handleReviewSuccess}
          />
        )}
        
        {/* User's Review */}
        {isAuthenticated && userReview && !showReviewForm && (
          <div className="mb-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold text-white">Your Review</h3>
              <button
                onClick={handleEditReview}
                className="text-red-500 hover:text-red-400 transition-colors text-sm"
              >
                Edit Review
              </button>
            </div>
            <ReviewCard review={userReview} onEdit={handleEditReview} />
          </div>
        )}
        
        {/* Other Reviews */}
        {reviews.length > 0 ? (
          <div>
            {isAuthenticated && userReview && (
              <h3 className="text-xl font-semibold text-white mb-3">
                Other Reviews
              </h3>
            )}
            
            <div>
              {reviews
                .filter(review => !userReview || review.id !== userReview.id)
                .map(review => (
                  <ReviewCard key={review.id} review={review} />
                ))}
            </div>
          </div>
        ) : (
          <div className="bg-neutral-800 rounded-lg p-8 text-center">
            <User className="h-16 w-16 mx-auto text-gray-600 mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Reviews Yet</h3>
            <p className="text-gray-400 mb-4">Be the first to share your thoughts on this title.</p>
            {isAuthenticated ? (
              !userReview && (
                <button
                  onClick={handleWriteReview}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <PenSquare className="h-5 w-5 mr-2" />
                  <span>Write a Review</span>
                </button>
              )
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                <span>Sign In to Review</span>
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <MovieCarousel
            title="You Might Also Like"
            movies={similarMovies}
          />
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;