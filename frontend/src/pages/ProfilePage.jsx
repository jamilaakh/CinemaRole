import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Star, Heart, Film, Edit, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';
import './ProfilePage.css';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { favorites, reviews } = useMovies();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Filter favorites for current user
  const userFavorites = favorites.filter(fav => 
    fav.userId === currentUser?.id
  );
  
  // Filter reviews for current user
  const userReviews = reviews.filter(review => 
    review.userId === currentUser?.id
  );
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!currentUser) return null;

  return (
    <div className="profile-bg">
      <div className="profile-container">
        <motion.div 
          className="profile-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="profile-card-inner">
            {/* Profile Header */}
            <div className="profile-header">
              {/* Avatar */}
              <div className="profile-avatar">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="profile-avatar-img"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <User style={{ width: '3rem', height: '3rem', color: '#d1d5db' }} />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="profile-user-info">
                <div className="profile-user-name">
                  {currentUser.name}
                </div>
                
                <div className="profile-user-meta">
                  <div className="profile-user-meta-item">
                    <Mail className="profile-meta-icon" style={{ width: '1rem', height: '1rem' }} />
                    <span>{currentUser.email}</span>
                  </div>
                  <div className="profile-user-meta-item">
                    <Calendar className="profile-meta-icon" style={{ width: '1rem', height: '1rem' }} />
                    <span>Joined {formatDate(currentUser.createdAt)}</span>
                  </div>
                  <div className="profile-user-meta-item">
                    <Star className="profile-meta-icon star" style={{ width: '1rem', height: '1rem' }} />
                    <span>{userReviews.length} Reviews</span>
                  </div>
                </div>
                
                <div className="profile-user-actions">
                  <button
                    onClick={() => {/* Edit profile functionality */}}
                    className="profile-action-btn edit"
                  >
                    <Edit style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    <span>Edit Profile</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="profile-action-btn logout"
                  >
                    <LogOut style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="profile-tabs">
          <div className="profile-tabs-row">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`profile-tab-btn${activeTab === 'favorites' ? ' active' : ''}`}
            >
              <Heart className={`profile-tab-icon heart${activeTab === 'favorites' ? ' active' : ''}`} style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              <span>Favorites</span>
              <span className="profile-tab-count">{userFavorites.length}</span>
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`profile-tab-btn${activeTab === 'reviews' ? ' active' : ''}`}
            >
              <Star className={`profile-tab-icon star${activeTab === 'reviews' ? ' active' : ''}`} style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
              <span>My Reviews</span>
              <span className="profile-tab-count">{userReviews.length}</span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'favorites' && (
          <div>
            {userFavorites.length > 0 ? (
              <div className="profile-favorites-grid">
                {userFavorites.map(favorite => (
                  <MovieCard key={favorite.id} movie={favorite.movie} />
                ))}
              </div>
            ) : (
              <div className="profile-empty-state">
                <Heart className="profile-empty-icon" />
                <div className="profile-empty-title">No Favorites Yet</div>
                <div className="profile-empty-desc">
                  Movies and series you add to your favorites will appear here.
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="profile-empty-btn"
                >
                  <Film style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Explore Movies</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            {userReviews.length > 0 ? (
              <div className="profile-reviews-list">
                {userReviews.map(review => {
                  const movie = review.movie;
                  return (
                    <motion.div 
                      key={review.id}
                      className="profile-review-card"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="profile-review-row">
                        {/* Movie Poster (small) */}
                        <img 
                          src={review.movie?.posterUrl} 
                          alt={review.movie?.title}
                          className="profile-review-poster"
                        />
                        {/* Review Content */}
                        <div className="profile-review-content">
                          <div className="profile-review-header">
                            <div
                              className="profile-review-title"
                              onClick={() => navigate(`/movie/${review.movieId}`)}
                            >
                              {review.movie?.title}
                            </div>
                            <div className="profile-review-rating">
                              <Star style={{ width: '1.25rem', height: '1.25rem', color: '#facc15', fill: '#facc15', marginRight: '0.25rem' }} />
                              <span>{review.rating}</span>
                            </div>
                          </div>
                          <div className="profile-review-text">
                            {review.content}
                          </div>
                          <div className="profile-review-footer">
                            <span>
                              {formatDate(review.createdAt)}
                            </span>
                            <button
                              onClick={() => navigate(`/movie/${review.movieId}`)}
                              className="profile-review-footer-btn"
                            >
                              View Full Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="profile-empty-state">
                <Star className="profile-empty-icon" />
                <div className="profile-empty-title">No Reviews Yet</div>
                <div className="profile-empty-desc">
                  Your reviews will appear here once you start rating movies and series.
                </div>
                <button
                  onClick={() => navigate('/')}
                  className="profile-empty-btn"
                >
                  <Film style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                  <span>Explore Movies</span>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;