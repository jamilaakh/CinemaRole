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
import './MovieDetailsPage.css';

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

  const similarMovies = popularMovies
    .filter(m =>
      m.id !== movie.id &&
      m.genres.some(g => movie.genres.includes(g))
    )
    .slice(0, 10);

  return (
    <div className="movie-details-bg">
      {/* Hero Section */}
      <div className="movie-details-hero">
        {/* Background */}
        <div className="movie-details-hero-bg">
          <img
            src={movie.backdropUrl}
            alt={movie.title}
          />
          <div className="movie-details-hero-gradient"></div>
        </div>

        {/* Content */}
        <div className="movie-details-container">
          <div className="movie-details-row">
            {/* Poster */}
            <motion.div
              className="movie-details-poster"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={movie.posterUrl}
                alt={movie.title}
              />
            </motion.div>

            {/* Details */}
            <motion.div
              className="movie-details-main"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h1 className="movie-details-title">
                {movie.title}
              </h1>

              {/* Meta Info */}
              <div className="movie-details-meta">
                <div className="movie-details-meta-item">
                  <Calendar className="movie-details-meta-icon" />
                  <span>{movie.releaseYear}</span>
                </div>
                <div className="movie-details-meta-item">
                  <Film className="movie-details-meta-icon" />
                  <span className="capitalize">{movie.type}</span>
                </div>
                {movie.duration > 0 && (
                  <div className="movie-details-meta-item">
                    <Clock className="movie-details-meta-icon" />
                    <span>{formatDuration(movie.duration)}</span>
                  </div>
                )}
                <div className="movie-details-meta-item">
                  <Star className="movie-details-meta-icon star" />
                  <span className="movie-details-meta-rating">{movie.rating}</span>
                  <span className="movie-details-meta-count">({movie.reviewCount})</span>
                </div>
              </div>

              {/* Genres */}
              <div className="movie-details-genres">
                {movie.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="movie-details-genre"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Synopsis */}
              <div className="movie-details-section">
                <h2 className="movie-details-section-title">Synopsis</h2>
                <div className="movie-details-section-content">{movie.synopsis}</div>
              </div>

              {/* Director & Cast */}
              <div className="movie-details-section">
                <div className="movie-details-section-title">Director</div>
                <div className="movie-details-section-content">{movie.director}</div>
              </div>
              <div className="movie-details-section">
                <div className="movie-details-section-title">Cast</div>
                <div className="movie-details-cast-list">
                  {movie.cast.map((actor, index) => (
                    <span key={index}>{actor}{index < movie.cast.length - 1 ? ', ' : ''}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="movie-details-actions">
                <button
                  onClick={handleToggleFavorite}
                  className={`movie-details-action-btn heart${isFav ? ' red' : ''}`}
                >
                  <Heart className="movie-details-action-icon" />
                  <span>{isFav ? 'Remove from Favorites' : 'Add to Favorites'}</span>
                </button>
                {!userReview && (
                  <button
                    onClick={handleWriteReview}
                    className="movie-details-action-btn"
                  >
                    <PenSquare className="movie-details-action-icon" />
                    <span>Write a Review</span>
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="movie-details-reviews-section">
        <h2 className="movie-details-reviews-title">
          Reviews
          <span className="movie-details-reviews-count">
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
            <div className="movie-details-user-review-header">
              <h3 className="movie-details-section-title">Your Review</h3>
              <button
                onClick={handleEditReview}
                className="movie-details-user-review-edit-btn"
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
              <h3 className="movie-details-other-reviews-title">
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
          <div className="movie-details-empty-reviews">
            <User className="movie-details-empty-icon" />
            <div className="movie-details-empty-title">No Reviews Yet</div>
            <div className="movie-details-empty-desc">
              Be the first to share your thoughts on this title.
            </div>
            {isAuthenticated ? (
              !userReview && (
                <button
                  onClick={handleWriteReview}
                  className="movie-details-empty-btn"
                >
                  <PenSquare className="movie-details-action-icon" />
                  <span>Write a Review</span>
                </button>
              )
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="movie-details-empty-btn"
              >
                <span>Sign In to Review</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Similar Movies */}
      {similarMovies.length > 0 && (
        <div className="movie-details-similar-section">
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