import { useState } from 'react';
import { Users, Search, UserPlus, Shield, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import './AdminUsers.css';

const AdminUsers = () => {
  const { currentUser } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  // Get users from localStorage
  const users = JSON.parse(localStorage.getItem('users') || '[]');

  // Filter users based on search and role
  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <div className="admin-users-header">
        <h1 className="admin-users-title">Users</h1>
        <button className="admin-users-add-btn">
          <UserPlus style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="admin-users-filters">
        <div className="admin-users-filters-row">
          <div className="admin-users-search-wrapper">
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="admin-users-search-input"
            />
            <Search className="admin-users-search-icon" />
          </div>
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="admin-users-role-select"
            >
              <option value="all">All Roles</option>
              <option value="user">Regular Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="admin-users-table-container">
        <div className="admin-users-table-scroll">
          <table className="admin-users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <UserRow
                  key={user.id}
                  user={user}
                  isCurrentUser={currentUser?.id === user.id}
                  formatDate={formatDate}
                />
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="admin-users-empty-state">
            <Users className="admin-users-empty-icon" />
            <p className="admin-users-empty-text">
              {searchQuery ? 'No users found matching your search.' : 'No users available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

const UserRow = ({ user, isCurrentUser, formatDate }) => {
  return (
    <tr>
      <td>
        <div className="admin-users-avatar-row">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="admin-users-avatar-img"
            />
          ) : (
            <div className="admin-users-avatar-placeholder">
              <span className="admin-users-avatar-initial">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div style={{ color: '#fff', fontWeight: 500 }}>
              {user.name}
              {isCurrentUser && (
                <span className="admin-users-current-user-badge">You</span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td>
        <span style={{ color: '#d1d5db' }}>{user.email}</span>
      </td>
      <td>
        <div>
          {user.role === 'admin' ? (
            <span className="admin-users-role-badge admin">
              <Shield style={{ width: '1rem', height: '1rem', marginRight: '0.25rem' }} />
              Admin
            </span>
          ) : (
            <span className="admin-users-role-badge user">
              User
            </span>
          )}
        </div>
      </td>
      <td>
        <span style={{ color: '#d1d5db' }}>
          {formatDate(user.createdAt)}
        </span>
      </td>
      <td style={{ textAlign: 'right' }}>
        <div className="admin-users-actions-row">
          <button
            className="admin-users-action-btn edit"
            disabled={isCurrentUser}
            title={isCurrentUser ? "You can't edit your own account here" : "Edit user"}
          >
            <Edit style={{ width: '1.25rem', height: '1.25rem', opacity: isCurrentUser ? 0.5 : 1 }} />
          </button>
          <button
            className="admin-users-action-btn delete"
            disabled={isCurrentUser}
            title={isCurrentUser ? "You can't delete your own account" : "Delete user"}
          >
            <Trash2 style={{ width: '1.25rem', height: '1.25rem', opacity: isCurrentUser ? 0.5 : 1 }} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminUsers;