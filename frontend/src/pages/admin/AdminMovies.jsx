import { useState } from 'react';
import { Film, Search, Plus, Edit, Trash2, Star } from 'lucide-react';
import { useMovies } from '../../contexts/MovieContext';

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
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--netflix-black)' }}>Movies & Series</h1>
        <button style={{
          display: 'flex',
          alignItems: 'center',
          background: 'var(--netflix-red)',
          color: 'var(--netflix-white)',
          padding: '0.5rem 1rem',
          borderRadius: '0.375rem',
          border: 'none',
          cursor: 'pointer'
        }}>
          <Plus style={{ width: 20, height: 20, marginRight: 8 }} />
          <span>Add New</span>
        </button>
      </div>

      {/* Filters */}
      <div style={{ background: 'var(--netflix-light-gray)', borderRadius: '0.5rem', padding: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
          <div style={{ flex: 1 }}>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="cm-search-input"
                style={{ width: '100%' }}
              />
              <Search style={{ position: 'absolute', left: 12, top: 12, width: 20, height: 20, color: '#9ca3af' }} />
            </div>
          </div>
          <div>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="cm-filter-select"
            >
              <option value="all">All Types</option>
              <option value="movie">Movies Only</option>
              <option value="series">Series Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Movies Table */}
      <div style={{ background: 'var(--netflix-white)', borderRadius: '0.5rem', overflow: 'hidden', boxShadow: '0 1px 2px 0 rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'var(--netflix-light-gray)' }}>
                <th style={{ textAlign: 'left', fontWeight: 600, padding: '1rem' }}>Title</th>
                <th style={{ textAlign: 'left', fontWeight: 600, padding: '1rem' }}>Type</th>
                <th style={{ textAlign: 'left', fontWeight: 600, padding: '1rem' }}>Year</th>
                <th style={{ textAlign: 'left', fontWeight: 600, padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Star style={{ width: 16, height: 16, color: '#eab308', marginRight: 4 }} />
                    Rating
                  </div>
                </th>
                <th style={{ textAlign: 'right', fontWeight: 600, padding: '1rem' }}>Actions</th>
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
          <div style={{ padding: '2rem', textAlign: 'center' }}>
            <Film style={{ width: 48, height: 48, color: '#9ca3af', marginBottom: 12 }} />
            <p style={{ color: '#6b7280' }}>
              {searchQuery ? 'No movies found matching your search.' : 'No movies available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- JSX version: remove type annotation from props ---
const MovieRow = ({ movie }) => {
  return (
    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
      <td style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={movie.posterUrl}
            alt={movie.title}
            style={{ width: 40, height: 60, objectFit: 'cover', borderRadius: '0.375rem', marginRight: 12 }}
          />
          <div style={{ color: 'var(--netflix-black)', fontWeight: 500 }}>{movie.title}</div>
        </div>
      </td>
      <td style={{ padding: '1rem' }}>
        <span style={{ color: '#374151', textTransform: 'capitalize' }}>{movie.type}</span>
      </td>
      <td style={{ padding: '1rem' }}>
        <span style={{ color: '#374151' }}>{movie.releaseYear}</span>
      </td>
      <td style={{ padding: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Star style={{ width: 16, height: 16, color: '#eab308', marginRight: 4 }} />
          <span style={{ color: 'var(--netflix-black)' }}>{movie.rating}</span>
          <span style={{ color: '#6b7280', marginLeft: 4 }}>({movie.reviewCount})</span>
        </div>
      </td>
      <td style={{ padding: '1rem', textAlign: 'right' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}>
          <button style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}>
            <Edit style={{ width: 20, height: 20 }} />
          </button>
          <button style={{ background: 'none', border: 'none', color: '#E50914', cursor: 'pointer' }}>
            <Trash2 style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminMovies;