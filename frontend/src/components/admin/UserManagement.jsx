import React, { useState } from 'react';
import { Search, UserPlus, Edit, Trash2, UserCircle, Check, X } from 'lucide-react';

// Mock user data
const mockUsers = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'admin', avatar: null, status: 'active' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'user', avatar: null, status: 'active' },
  { id: '3', name: 'Bob Johnson', email: 'bob.johnson@example.com', role: 'user', avatar: null, status: 'inactive' },
  { id: '4', name: 'Alice Williams', email: 'alice.williams@example.com', role: 'user', avatar: null, status: 'active' },
  { id: '5', name: 'Charlie Brown', email: 'charlie.brown@example.com', role: 'user', avatar: null, status: 'active' },
];

const UserManagement = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(null);

  // Filter users based on search term
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (user) => {
    setIsEditing(user.id);
    setEditedUser({ ...user });
  };

  const handleCancelEdit = () => {
    setIsEditing(null);
    setEditedUser(null);
  };

  const handleSaveEdit = () => {
    if (!editedUser) return;
    setUsers(users.map(user => 
      user.id === editedUser.id ? editedUser : user
    ));
    setIsEditing(null);
    setEditedUser(null);
  };

  const confirmDelete = (userId) => {
    setIsConfirmingDelete(userId);
  };

  const cancelDelete = () => {
    setIsConfirmingDelete(null);
  };

  const handleDelete = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
    setIsConfirmingDelete(null);
  };

  return (
    <div className="um-container">
      <div className="um-header-row">
        <h2 className="um-title">Users</h2>
        <div className="um-controls">
          <div className="um-search-wrapper">
            <div className="um-search-icon">
              <Search style={{ width: 20, height: 20 }} />
            </div>
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="um-search-input"
            />
          </div>
          <button className="um-add-btn">
            <UserPlus style={{ width: 16, height: 16, marginRight: 8 }} />
            Add User
          </button>
        </div>
      </div>
      
      {/* Users table */}
      <div className="um-table-container">
        <table className="um-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map(user => (
              <tr key={user.id}>
                <td>
                  <div className="um-user-cell">
                    <div className="um-avatar">
                      {user.avatar ? (
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="um-avatar-img"
                        />
                      ) : (
                        <UserCircle style={{ width: 40, height: 40, color: '#9ca3af' }} />
                      )}
                    </div>
                    <div className="um-user-details">
                      {isEditing === user.id ? (
                        <input
                          type="text"
                          value={editedUser.name}
                          onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                          className="um-table-input"
                        />
                      ) : (
                        <div className="um-user-name">{user.name}</div>
                      )}
                    </div>
                  </div>
                </td>
                <td>
                  {isEditing === user.id ? (
                    <input
                      type="email"
                      value={editedUser.email}
                      onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                      className="um-table-input"
                    />
                  ) : (
                    <div className="um-user-email">{user.email}</div>
                  )}
                </td>
                <td>
                  {isEditing === user.id ? (
                    <select
                      value={editedUser.role}
                      onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                      className="um-table-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  ) : (
                    <span className={`um-badge ${user.role}`}>
                      {user.role}
                    </span>
                  )}
                </td>
                <td>
                  {isEditing === user.id ? (
                    <select
                      value={editedUser.status}
                      onChange={(e) => setEditedUser({ ...editedUser, status: e.target.value })}
                      className="um-table-select"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  ) : (
                    <span className={`um-badge ${user.status}`}>
                      {user.status}
                    </span>
                  )}
                </td>
                <td style={{ textAlign: 'right' }}>
                  {isEditing === user.id ? (
                    <div className="um-actions-row">
                      <button
                        onClick={handleSaveEdit}
                        className="um-action-btn confirm"
                        title="Save"
                      >
                        <Check style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="um-action-btn cancel"
                        title="Cancel"
                      >
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  ) : isConfirmingDelete === user.id ? (
                    <div className="um-actions-row">
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="um-action-btn delete"
                        title="Confirm Delete"
                      >
                        <Check style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={cancelDelete}
                        className="um-action-btn gray"
                        title="Cancel"
                      >
                        <X style={{ width: 20, height: 20 }} />
                      </button>
                    </div>
                  ) : (
                    <div className="um-actions-row">
                      <button
                        onClick={() => handleEdit(user)}
                        className="um-action-btn edit"
                        title="Edit"
                      >
                        <Edit style={{ width: 20, height: 20 }} />
                      </button>
                      <button
                        onClick={() => confirmDelete(user.id)}
                        className="um-action-btn delete"
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
      <div className="um-pagination">
        <div className="um-pagination-info">
          Showing <span style={{ fontWeight: 500 }}>1</span> to <span style={{ fontWeight: 500 }}>{filteredUsers.length}</span> of{' '}
          <span style={{ fontWeight: 500 }}>{filteredUsers.length}</span> results
        </div>
        <div className="um-pagination-nav">
          <button className="um-pagination-btn rounded-l" title="Previous">&larr;</button>
          <button className="um-pagination-btn active">1</button>
          <button className="um-pagination-btn rounded-r" title="Next">&rarr;</button>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;