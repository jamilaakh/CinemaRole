import { useState } from 'react';
import { Users, Search, UserPlus, Shield, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl font-bold text-white">Users</h1>
        <button className="flex items-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors">
          <UserPlus className="h-5 w-5 mr-2" />
          <span>Add User</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-neutral-800 rounded-lg p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-700 text-white rounded-md py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="bg-neutral-700 text-white rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-red-600"
            >
              <option value="all">All Roles</option>
              <option value="user">Regular Users</option>
              <option value="admin">Admins</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-neutral-800 rounded-lg overflow-hidden shadow-md">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-neutral-700">
                <th className="text-left text-sm font-semibold text-white p-4">User</th>
                <th className="text-left text-sm font-semibold text-white p-4">Email</th>
                <th className="text-left text-sm font-semibold text-white p-4">Role</th>
                <th className="text-left text-sm font-semibold text-white p-4">Joined</th>
                <th className="text-right text-sm font-semibold text-white p-4">Actions</th>
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
          <div className="p-6 text-center">
            <Users className="h-12 w-12 mx-auto text-gray-600 mb-3" />
            <p className="text-gray-400">
              {searchQuery ? 'No users found matching your search.' : 'No users available.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- JSX version: remove type annotation from props ---
const UserRow = ({ user, isCurrentUser, formatDate }) => {
  return (
    <tr className="border-b border-neutral-700 hover:bg-neutral-750 transition-colors">
      <td className="p-4">
        <div className="flex items-center">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-neutral-700 flex items-center justify-center mr-3">
              <span className="text-lg font-semibold text-neutral-300">
                {user.name.charAt(0)}
              </span>
            </div>
          )}
          <div>
            <div className="text-white font-medium">
              {user.name}
              {isCurrentUser && (
                <span className="ml-2 text-xs bg-neutral-700 text-gray-300 px-2 py-0.5 rounded">You</span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td className="p-4">
        <span className="text-gray-300">{user.email}</span>
      </td>
      <td className="p-4">
        <div className="flex items-center">
          {user.role === 'admin' ? (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-500">
              <Shield className="h-3 w-3 mr-1" />
              Admin
            </span>
          ) : (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-500">
              User
            </span>
          )}
        </div>
      </td>
      <td className="p-4">
        <span className="text-gray-300">
          {formatDate(user.createdAt)}
        </span>
      </td>
      <td className="p-4 text-right">
        <div className="flex items-center justify-end space-x-2">
          <button
            className="p-1 text-gray-400 hover:text-white transition-colors"
            disabled={isCurrentUser}
            title={isCurrentUser ? "You can't edit your own account here" : "Edit user"}
          >
            <Edit className={`h-5 w-5 ${isCurrentUser ? 'opacity-50 cursor-not-allowed' : ''}`} />
          </button>
          <button
            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            disabled={isCurrentUser}
            title={isCurrentUser ? "You can't delete your own account" : "Delete user"}
          >
            <Trash2 className={`h-5 w-5 ${isCurrentUser ? 'opacity-50 cursor-not-allowed' : ''}`} />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default AdminUsers;