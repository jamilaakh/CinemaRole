import React, { useState } from 'react';
import { Search, Flag, Trash2, Check, X, ThumbsUp, MessageSquare } from 'lucide-react';

// Mock comments data
const mockComments = [
  { id: '1', author: 'John Doe', content: 'Great movie! Loved the action sequences.', target: 'The Matrix', type: 'review', rating: 5, flagged: false, date: '2023-05-10' },
  { id: '2', author: 'Jane Smith', content: 'The plot was too confusing.', target: 'Inception', type: 'review', rating: 3, flagged: false, date: '2023-05-09' },
  { id: '3', author: 'Bob Johnson', content: 'This is inappropriate content that should be removed.', target: 'Breaking Bad', type: 'comment', rating: null, flagged: true, date: '2023-05-08' },
  { id: '4', author: 'Alice Williams', content: 'The ending was spectacular!', target: 'The Witcher', type: 'comment', rating: null, flagged: false, date: '2023-05-07' },
  { id: '5', author: 'Charlie Brown', content: 'Amazing performance by the lead actor.', target: 'Joker', type: 'review', rating: 4, flagged: false, date: '2023-05-06' },
];

const CommentManagement = () => {
  const [comments, setComments] = useState(mockComments);
  const [searchTerm, setSearchTerm] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'flagged', 'reviews', 'comments'

  // Filter comments based on search term and filter
  const filteredComments = comments.filter(comment => {
    const matchesSearch = 
      comment.content.toLowerCase().includes(searchTerm.toLowerCase()) || 
      comment.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comment.target.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'flagged') return matchesSearch && comment.flagged;
    if (filter === 'reviews') return matchesSearch && comment.type === 'review';
    if (filter === 'comments') return matchesSearch && comment.type === 'comment';
    
    return matchesSearch;
  });

  const handleFlag = (commentId) => {
    setComments(comments.map(comment => 
      comment.id === commentId 
        ? { ...comment, flagged: !comment.flagged } 
        : comment
    ));
  };

  const confirmDelete = (commentId) => {
    setIsConfirmingDelete(commentId);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(null);
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter(comment => comment.id !== commentId));
    setIsConfirmingDelete(null);
  };

  return (
    <div className="cm-container">
      <div className="cm-header-row">
        <h2 className="cm-title">Comments & Reviews</h2>
        <div className="cm-controls">
          <div className="cm-search-wrapper">
            <div className="cm-search-icon">
              <Search style={{ width: 20, height: 20 }} />
            </div>
            <input
              type="text"
              placeholder="Search comments..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="cm-search-input"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="cm-filter-select"
          >
            <option value="all">All Comments</option>
            <option value="flagged">Flagged</option>
            <option value="reviews">Reviews</option>
            <option value="comments">Comments</option>
          </select>
        </div>
      </div>
      
      {/* Comments list */}
      <div className="cm-comments-list">
        {filteredComments.map(comment => (
          <div key={comment.id} className={`cm-comment-card${comment.flagged ? ' flagged' : ''}`}>
            <div className="cm-comment-top">
              <div className="cm-author-row">
                <div className="cm-avatar">
                  <span className="cm-avatar-initial">{comment.author.charAt(0)}</span>
                </div>
                <div className="cm-author-details">
                  <p className="cm-author-name">{comment.author}</p>
                  <p className="cm-author-meta">
                    {comment.date} • On: {comment.target}
                  </p>
                </div>
              </div>
              <div className="cm-type-row">
                <span className={`cm-type-badge ${comment.type}`}>
                  {comment.type === 'review' ? (
                    <ThumbsUp style={{ width: 12, height: 12, marginRight: 4 }} />
                  ) : (
                    <MessageSquare style={{ width: 12, height: 12, marginRight: 4 }} />
                  )}
                  {comment.type === 'review' ? 'Review' : 'Comment'}
                </span>
                {comment.rating && (
                  <span className="cm-rating-badge">
                    ★ {comment.rating}/5
                  </span>
                )}
              </div>
            </div>
            <div className="cm-content">
              <p>{comment.content}</p>
            </div>
            <div className="cm-actions">
              {isConfirmingDelete === comment.id ? (
                <>
                  <button
                    onClick={() => handleDelete(comment.id)}
                    className="cm-btn cm-btn-confirm"
                  >
                    <Check style={{ width: 12, height: 12, marginRight: 4 }} />
                    Confirm
                  </button>
                  <button
                    onClick={cancelDelete}
                    className="cm-btn cm-btn-cancel"
                  >
                    <X style={{ width: 12, height: 12, marginRight: 4 }} />
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleFlag(comment.id)}
                    className={`cm-btn cm-btn-flag${comment.flagged ? ' flagged' : ''}`}
                  >
                    <Flag style={{ width: 12, height: 12, marginRight: 4 }} />
                    {comment.flagged ? 'Unflag' : 'Flag'}
                  </button>
                  <button
                    onClick={() => confirmDelete(comment.id)}
                    className="cm-btn cm-btn-delete"
                  >
                    <Trash2 style={{ width: 12, height: 12, marginRight: 4 }} />
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {filteredComments.length === 0 && (
          <div className="cm-empty-state">
            <MessageSquare style={{ width: 48, height: 48, color: '#9ca3af' }} />
            <h3 className="cm-empty-title">No comments found</h3>
            <p className="cm-empty-desc">
              {searchTerm 
                ? 'Try adjusting your search terms.' 
                : filter !== 'all' 
                  ? `No ${filter} comments available.` 
                  : 'No comments or reviews have been added yet.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentManagement;