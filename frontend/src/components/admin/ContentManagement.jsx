import React, { useState } from 'react';
import { Search, PlusCircle, Edit, Trash2, Film, Play, Check, X } from 'lucide-react';

// Mock movie/TV series data
const mockContent = [
  { id: '1', title: 'The Matrix', type: 'movie', year: 2001, genre: 'Sci-Fi', status: 'published' },
  { id: '2', title: 'Inception', type: 'movie', year: 2010, genre: 'Sci-Fi', status: 'published' },
  { id: '3', title: 'Breaking Bad', type: 'series', year: 2008, genre: 'Drama', status: 'published' },
  { id: '4', title: 'The Witcher', type: 'series', year: 2019, genre: 'Fantasy', status: 'published' },
  { id: '5', title: 'Joker', type: 'movie', year: 2019, genre: 'Drama', status: 'draft' },
];

const ContentManagement = () => {
  const [content, setContent] = useState(mockContent);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editedContent, setEditedContent] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);
  const [contentType, setContentType] = useState('all'); // 'all', 'movie', 'series'

  // Filter content based on search term and content type
  const filteredContent = content.filter(item => 
    (item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.genre.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (contentType === 'all' || item.type === contentType)
  );

  const handleEdit = (item) => {
    setIsEditing(item.id);
    setEditedContent({ ...item });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedContent(null);
  };

  const handleSaveEdit = () => {
    if (!editedContent) return;
    setContent(content.map(item => 
      item.id === editedContent.id ? editedContent : item
    ));
    setIsEditing(null);
    setEditedContent(null);
  };

  const confirmDelete = (contentId) => {
    setIsConfirmingDelete(contentId);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(null);
  };

  const handleDelete = (contentId) => {
    setContent(content.filter(item => item.id !== contentId));
    setIsConfirmingDelete(null);
  };

  return (
    <div className="cm-container">
      <div className="cm-header-row">
        <h2 className="cm-title">Content Management</h2>
        <div className="cm-controls">
          <div className="cm-search-wrapper">
            <div className="cm-search-icon">
              <Search style={{ width: 20, height: 20 }} />
            </div>
            <input
              type="text"
              placeholder="Search content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cm-search-input"
            />
          </div>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="cm-filter-select"
          >
            <option value="all">All Types</option>
            <option value="movie">Movies</option>
            <option value="series">TV Series</option>
          </select>
          <button className="cm-add-btn">
            <PlusCircle style={{ width: 16, height: 16, marginRight: 8 }} />
            Add Content
          </button>
        </div>
      </div>
      
      {/* Content table */}
      <div className="cm-table-container">
        <table className="cm-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Year</th>
              <th>Genre</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContent.map(item => (
              <tr key={item.id}>
                <td>
                  <div className="cm-title-cell">
                    <div className="cm-icon-cell">
                      {item.type === 'movie' ? (
                        <Film style={{ width: 24, height: 24, color: '#6b7280' }} />
                      ) : (
                        <Play style={{ width: 24, height: 24, color: '#6b7280' }} />
                      )}
                    </div>
                    <div className="cm-title-text">
                      {isEditing === item.id ? (
                        <input
                          type="text"
                          value={editedContent.title}
                          onChange={(e) => setEditedContent({ ...editedContent, title: e.target.value })}
                          className="cm-table-input"
                        />
                      ) : (
                        item.title
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {isEditing === item.id ? (
                    <select
                      value={editedContent.type}
                      onChange={(e) => setEditedContent({ ...editedContent, type: e.target.value })}
                      className="cm-table-select"
                    >
                      <option value="movie">Movie</option>
                      <option value="series">TV Series</option>
                    </select>
                  ) : (
                    <span className={`cm-badge ${item.type}`}>
                      {item.type === 'movie' ? 'Movie' : 'TV Series'}
                    </span>
                  )}
                </td>
                <td>
                  {isEditing === item.id ? (
                    <input
                      type="number"
                      value={editedContent.year}
                      onChange={(e) => setEditedContent({ ...editedContent, year: parseInt(e.target.value) })}
                      className="cm-table-input"
                    />
                  ) : (
                    <span className="cm-user-email">{item.year}</span>
                  )}
                </td>
                <td>
                  {isEditing === item.id ? (
                    <input
                      type="text"
                      value={editedContent.genre}
                      onChange={(e) => setEditedContent({ ...editedContent, genre: e.target.value })}
                      className="cm-table-input"
                    />
                  ) : (
                    <span className="cm-user-email">{item.genre}</span>
                  )}
                </td>
                <td>
                  {isEditing === item.id ? (
                    <select
                      value={editedContent.status}
                      onChange={(e) => setEditedContent({ ...editedContent, status: e.target.value })}
                      className="cm-table-select"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                    </select>
                  ) : (
                    <span className={`cm-badge ${item.status}`}>
                      {item.status}
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {isEditing === item.id ? (
                    <div className="cm-actions-row">
                      <button
                        onClick={handleSaveEdit}
                        className="cm-action-btn confirm"
                        title="Save"
                      >
                        <Check style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="cm-action-btn cancel"
                        title="Cancel"
                      >
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  ) : isConfirmingDelete === item.id ? (
                    <div className="cm-actions-row">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="cm-action-btn delete"
                        title="Confirm Delete"
                      >
                        <Check style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="cm-action-btn gray"
                        title="Cancel"
                      >
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  ) : (
                    <div className="cm-actions-row">
                      <button
                        onClick={() => handleEdit(item)}
                        className="cm-action-btn edit"
                        title="Edit"
                      >
                        <Edit style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={() => confirmDelete(item.id)}
                        className="cm-action-btn delete"
                        title="Delete"
                      >
                        <Trash2 style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="cm-pagination">
        <div className="cm-pagination-info">
          Showing <span style={{ fontWeight: 500 }}>1</span> to <span style={{ fontWeight: 500 }}>{filteredContent.length}</span> of{' '}
          <span style={{ fontWeight: 500 }}>{filteredContent.length}</span> results
        </div>
        <div className="cm-pagination-nav">
          <button className="cm-pagination-btn rounded-l" title="Previous">&larr;</button>
          <button className="cm-pagination-btn active">1</button>
          <button className="cm-pagination-btn rounded-r" title="Next">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default ContentManagement;