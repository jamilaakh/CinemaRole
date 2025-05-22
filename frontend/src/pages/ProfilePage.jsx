import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, Star, Heart, Film, Edit, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useMovies } from '../contexts/MovieContext';
import { useNavigate } from 'react-router-dom';
import MovieCard from '../components/movies/MovieCard';

const ProfilePage = () => {
  const { currentUser, logout } = useAuth();
  const { favorites, reviews } = useMovies();
  const navigate = useNavigate();
  // Remove TypeScript type annotation from useState
  const [activeTab, setActiveTab] = useState('favorites');
  
  // Filter favorites for current user
  const userFavorites = favorites.filter(fav => 
    fav.userId === currentUser?.id
  );
  
  // Filter reviews for current user
  const userReviews = reviews.filter(review => 
    review.userId === currentUser?.id
  );
  
  // Remove TypeScript type annotation from parameter and options
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
    <div className="pt-24 pb-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="bg-neutral-800 rounded-lg shadow-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Header */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-red-600">
                {currentUser.avatar ? (
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-700 flex items-center justify-center">
                    <User className="h-12 w-12 text-neutral-300" />
                  </div>
                )}
              </div>
              
              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  {currentUser.name}
                </h1>
                
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 text-gray-300 mb-4">
                  <div className="flex items-center justify-center md:justify-start">
                    <Mail className="h-4 w-4 mr-2 text-gray-400" />
                    <span>{currentUser.email}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                    <span>Joined {formatDate(currentUser.createdAt)}</span>
                  </div>
                  
                  <div className="flex items-center justify-center md:justify-start">
                    <Star className="h-4 w-4 mr-2 text-yellow-500" />
                    <span>{userReviews.length} Reviews</span>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start gap-3">
                  <button
                    onClick={() => {/* Edit profile functionality */}}
                    className="flex items-center bg-neutral-700 hover:bg-neutral-600 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    <span>Edit Profile</span>
                  </button>
                  
                  <button
                    onClick={handleLogout}
                    className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Tabs */}
        <div className="mb-6">
          <div className="flex border-b border-neutral-700">
            <button
              onClick={() => setActiveTab('favorites')}
              className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'favorites'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Heart className={`h-4 w-4 mr-2 ${activeTab === 'favorites' ? 'text-red-600' : ''}`} />
              <span>Favorites</span>
              <span className="ml-2 bg-neutral-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                {userFavorites.length}
              </span>
            </button>
            
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center px-4 py-3 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'reviews'
                  ? 'border-red-600 text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              <Star className={`h-4 w-4 mr-2 ${activeTab === 'reviews' ? 'text-yellow-500' : ''}`} />
              <span>My Reviews</span>
              <span className="ml-2 bg-neutral-700 text-gray-300 px-2 py-0.5 rounded-full text-xs">
                {userReviews.length}
              </span>
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'favorites' && (
          <div>
            {userFavorites.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                {userFavorites.map(favorite => (
                  <MovieCard key={favorite.id} movie={favorite.movie} />
                ))}
              </div>
            ) : (
              <div className="bg-neutral-800 rounded-lg p-8 text-center">
                <Heart className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Favorites Yet</h3>
                <p className="text-gray-400 mb-4">
                  Movies and series you add to your favorites will appear here.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Film className="h-4 w-4 mr-2" />
                  <span>Explore Movies</span>
                </button>
              </div>
            )}
          </div>
        )}
        
        {activeTab === 'reviews' && (
          <div>
            {userReviews.length > 0 ? (
              <div className="space-y-6">
                {userReviews.map(review => {
                  const movie = review.movie;
                  
                  return (
                    <motion.div 
                      key={review.id}
                      className="bg-neutral-800 rounded-lg overflow-hidden shadow-md"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Movie Poster (small) */}
                        <div className="md:w-1/4 lg:w-1/5 aspect-[2/3] md:aspect-auto">
                          <img 
                            src={review.movie?.posterUrl} 
                            alt={review.movie?.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        {/* Review Content */}
                        <div className="flex-1 p-5">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="text-xl font-bold text-white">
                              <span className="cursor-pointer hover:text-red-500 transition-colors" onClick={() => navigate(`/movie/${review.movieId}`)}>
                                {review.movie?.title}
                              </span>
                            </h3>
                            <div className="flex items-center">
                              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
                              <span className="text-white font-semibold">{review.rating}</span>
                            </div>
                          </div>
                          
                          <p className="text-gray-300 mb-4 line-clamp-3">
                            {review.content}
                          </p>
                          
                          <div className="flex justify-between items-center text-sm">
                            <span className="text-gray-400">
                              {formatDate(review.createdAt)}
                            </span>
                            <button
                              onClick={() => navigate(`/movie/${review.movieId}`)}
                              className="text-red-500 hover:text-red-400 transition-colors"
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
              <div className="bg-neutral-800 rounded-lg p-8 text-center">
                <Star className="h-16 w-16 mx-auto text-gray-600 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No Reviews Yet</h3>
                <p className="text-gray-400 mb-4">
                  Your reviews will appear here once you start rating movies and series.
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Film className="h-4 w-4 mr-2" />
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