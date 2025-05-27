import { BarChart2, TrendingUp, Users, Film, Star, Heart } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import './AdminStats.css';

const AdminStats = () => {
  const { movies, reviews, favorites } = useMovies();
  
  // Calculate stats
  const totalMovies = movies.filter(m => m.type === 'movie').length;
  const totalSeries = movies.filter(m => m.type === 'series').length;
  const totalUsers = JSON.parse(localStorage.getItem('users') || '[]').length;
  const totalReviews = reviews.length;
  const totalFavorites = favorites.length;
  
  // Top rated content
  const topRated = [...movies]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 5);
  
  // Most reviewed content
  const mostReviewed = [...movies]
    .sort((a, b) => b.reviewCount - a.reviewCount)
    .slice(0, 5);
  
  return (
    <div>
      <h1 className="admin-stats-title">Dashboard Statistics</h1>
      
      {/* Stats Cards */}
      <div className="admin-stats-cards">
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          icon={<Users className="admin-stats-icon" style={{ color: '#3b82f6' }} />}
        />
        <StatCard 
          title="Total Movies" 
          value={totalMovies} 
          icon={<Film className="admin-stats-icon" style={{ color: '#dc2626' }} />}
        />
        <StatCard 
          title="Total Series" 
          value={totalSeries} 
          icon={<Film className="admin-stats-icon" style={{ color: '#a78bfa' }} />}
        />
        <StatCard 
          title="Total Reviews" 
          value={totalReviews} 
          icon={<Star className="admin-stats-icon" style={{ color: '#facc15' }} />}
        />
        <StatCard 
          title="Total Favorites" 
          value={totalFavorites} 
          icon={<Heart className="admin-stats-icon" style={{ color: '#f472b6' }} />}
        />
        <StatCard 
          title="Avg. Rating" 
          value={
            movies.length > 0
              ? (movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)
              : '0.0'
          }
          icon={<TrendingUp className="admin-stats-icon" style={{ color: '#22c55e' }} />}
        />
      </div>
      
      {/* Top Content Tables */}
      <div className="admin-stats-table-grid">
        {/* Top Rated */}
        <div className="admin-stats-table-container">
          <div className="admin-stats-table-header">
            <h2 className="admin-stats-table-title">
              <Star className="admin-stats-icon" style={{ color: '#facc15' }} />
              Top Rated Content
            </h2>
          </div>
          <div className="admin-stats-table-scroll">
            <table className="admin-stats-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ textAlign: 'right' }}>Rating</th>
                </tr>
              </thead>
              <tbody>
                {topRated.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <div className="admin-stats-table-movie-row">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="admin-stats-table-movie-img"
                        />
                        <span className="admin-stats-table-movie-title">{movie.title}</span>
                      </div>
                    </td>
                    <td>
                      <div className="admin-stats-table-rating">
                        <Star className="admin-stats-table-rating-icon" />
                        <span className="admin-stats-table-rating-value">{movie.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Most Reviewed */}
        <div className="admin-stats-table-container">
          <div className="admin-stats-table-header">
            <h2 className="admin-stats-table-title">
              <BarChart2 className="admin-stats-icon" style={{ color: '#3b82f6' }} />
              Most Reviewed Content
            </h2>
          </div>
          <div className="admin-stats-table-scroll">
            <table className="admin-stats-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th style={{ textAlign: 'right' }}>Reviews</th>
                </tr>
              </thead>
              <tbody>
                {mostReviewed.map((movie) => (
                  <tr key={movie.id}>
                    <td>
                      <div className="admin-stats-table-movie-row">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="admin-stats-table-movie-img"
                        />
                        <span className="admin-stats-table-movie-title">{movie.title}</span>
                      </div>
                    </td>
                    <td>
                      <span className="admin-stats-table-reviews-badge">
                        {movie.reviewCount} reviews
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="admin-stats-card">
      <div className="admin-stats-card-header">
        <h3 className="admin-stats-card-title">{title}</h3>
        {icon}
      </div>
      <p className="admin-stats-card-value">{value}</p>
    </div>
  );
};

export default AdminStats;