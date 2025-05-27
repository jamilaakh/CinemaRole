import { useState } from 'react';
import { Film, Search, Plus, Edit, Trash2, Star } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';
import './AdminMovies.css';

const AdminMovies = () => {
  const { movies } = useMovies();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');

  // Filter movies based on search and type
  const filteredMovies = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || movie.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <div>
      <div className="admin-movies-header">
        <h1 className="admin-movies-title">Movies & Series</h1>
        <button className="admin-movies-add-btn">
          <Plus style={{ width: '1.25rem', height: '1.25rem' }} />
          <span>Add New</span>
        </button>
      </div>

      {/* Filters */}
      <div className="admin-movies-filters">
        <div className="admin-movies-filters-row">
          <div className="admin-movies-search-wrapper">
            <input
              type="text"
              placeholder="Search by title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-movies-search-input"
            />
            <Search className="admin-movies-search-icon" />
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="admin-movies-type-select"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies Only</option>
              <option value="series">Series Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div className="admin-movies-table-container">
        <div className="admin-movies-table-scroll">
          <table className="admin-movies-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>Year</th>
                <th>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Star style={{ width: '1rem', height: '1rem', color: '#eab308', marginRight: 4 }} />
                    Rating
                  </div>
                </th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMovies.map((movie) => (
                <MovieRow key={movie.id} movie={movie} />
              ))}
            </tbody>
          </table>
        </div>
        {filteredMovies.length === 0 && (
          <div className="admin-movies-empty-state">
            <Film className="admin-movies-empty-icon" />
            <p className="admin-movies-empty-text">
              {searchQuery ? 'No movies found matching your search.' : 'No movies available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const MovieRow = ({ movie }) => {
  return (
    <tr>
      <td>
        <div className="admin-movies-row-title">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="admin-movies-row-img"
          />
          <div className="admin-movies-row-title-text">{movie.title}</div>
        </div>
      </td>
      <td>
        <span className="admin-movies-row-type">{movie.type}</span>
      </td>
      <td>
        <span className="admin-movies-row-year">{movie.releaseYear}</span>
      </td>
      <td>
        <div className="admin-movies-row-rating">
          <Star style={{ width: '1rem', height: '1rem', color: '#eab308' }} />
          <span className="admin-movies-row-rating-value">{movie.rating}</span>
          <span className="admin-movies-row-rating-count">({movie.reviewCount})</span>
        </div>
      </td>
      <td style={{ textAlign: 'right' }}>
        <div className="admin-movies-row-actions">
          <button className="admin-movies-action-btn edit">
            <Edit style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
          <button className="admin-movies-action-btn delete">
            <Trash2 style={{ width: '1.25rem', height: '1.25rem' }} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminMovies;