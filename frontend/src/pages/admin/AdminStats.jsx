import { BarChart2, TrendingUp, Users, Film, Star, Heart } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import { mockUsers } from '../../data/mockData';

const AdminStats = () => {
  const { movies, reviews, favorites } = useMovies();
  
  // Calculate stats
  const totalMovies = movies.filter(m => m.type === 'movie').length;
  const totalSeries = movies.filter(m => m.type === 'series').length;
  const totalUsers = mockUsers.length;
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
      <h1 className="text-2xl font-bold text-white mb-6">Dashboard Statistics</h1>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <StatCard 
          title="Total Users" 
          value={totalUsers} 
          icon={<Users className="h-6 w-6 text-blue-500" />}
        />
        <StatCard 
          title="Total Movies" 
          value={totalMovies} 
          icon={<Film className="h-6 w-6 text-red-500" />}
        />
        <StatCard 
          title="Total Series" 
          value={totalSeries} 
          icon={<Film className="h-6 w-6 text-purple-500" />}
        />
        <StatCard 
          title="Total Reviews" 
          value={totalReviews} 
          icon={<Star className="h-6 w-6 text-yellow-500" />}
        />
        <StatCard 
          title="Total Favorites" 
          value={totalFavorites} 
          icon={<Heart className="h-6 w-6 text-pink-500" />}
        />
        <StatCard 
          title="Avg. Rating" 
          value={`${(movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)}`} 
          icon={<TrendingUp className="h-6 w-6 text-green-500" />}
        />
      </div>
      
      {/* Top Content Tables */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Rated */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-4 border-b border-neutral-700">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              Top Rated Content
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-750">
                  <th className="text-left text-sm font-semibold text-white p-3">Title</th>
                  <th className="text-right text-sm font-semibold text-white p-3">Rating</th>
                </tr>
              </thead>
              <tbody>
                {topRated.map((movie) => (
                  <tr key={movie.id} className="border-b border-neutral-700">
                    <td className="p-3">
                      <div className="flex items-center">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-8 h-12 object-cover rounded mr-2"
                        />
                        <span className="text-white">{movie.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <div className="flex items-center justify-end">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="text-white font-medium">{movie.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Most Reviewed */}
        <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
          <div className="p-4 border-b border-neutral-700">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <BarChart2 className="h-5 w-5 text-blue-500 mr-2" />
              Most Reviewed Content
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-neutral-750">
                  <th className="text-left text-sm font-semibold text-white p-3">Title</th>
                  <th className="text-right text-sm font-semibold text-white p-3">Reviews</th>
                </tr>
              </thead>
              <tbody>
                {mostReviewed.map((movie) => (
                  <tr key={movie.id} className="border-b border-neutral-700">
                    <td className="p-3">
                      <div className="flex items-center">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-8 h-12 object-cover rounded mr-2"
                        />
                        <span className="text-white">{movie.title}</span>
                      </div>
                    </td>
                    <td className="p-3 text-right">
                      <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full text-xs">
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

// --- JSX version: remove type annotation from props ---
const StatCard = ({ title, value, icon }) => {
  return (
    <div className="bg-neutral-800 rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {icon}
      </div>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
  );
};

export default AdminStats;