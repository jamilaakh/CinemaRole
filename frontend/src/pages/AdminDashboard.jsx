import React, { useState } from 'react';
import { Users, Film, MessageSquare } from 'lucide-react';
import UserManagement from '../components/admin/UserManagement';
import ContentManagement from '../components/admin/ContentManagement';
import CommentManagement from '../components/admin/CommentManagement';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users'); // 'users', 'content', 'comments'

  return (
    <div className="admin-dashboard-container">
      <h1 className="admin-dashboard-title">Admin Dashboard</h1>
      
      <div className="admin-dashboard-card">
        {/* Tabs */}
        <div className="admin-dashboard-tabs">
          <nav className="admin-dashboard-nav">
            <button
              onClick={() => setActiveTab('users')}
              className={`admin-dashboard-tab-btn${activeTab === 'users' ? ' active' : ''}`}
            >
              <Users className="tab-icon" style={{ width: 20, height: 20 }} />
              User Management
            </button>
            <button
              onClick={() => setActiveTab('content')}
              className={`admin-dashboard-tab-btn${activeTab === 'content' ? ' active' : ''}`}
            >
              <Film className="tab-icon" style={{ width: 20, height: 20 }} />
              Content Management
            </button>
            <button
              onClick={() => setActiveTab('comments')}
              className={`admin-dashboard-tab-btn${activeTab === 'comments' ? ' active' : ''}`}
            >
              <MessageSquare className="tab-icon" style={{ width: 20, height: 20 }} />
              Comments & Reviews
            </button>
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="admin-dashboard-content">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'content' && <ContentManagement />}
          {activeTab === 'comments' && <CommentManagement />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;