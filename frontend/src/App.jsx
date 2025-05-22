import React, { useState } from 'react';
import { UserCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import ProfilePage from './pages/ProfilePage';
import AdminDashboard from './pages/AdminDashboard';

// Mock user data
const currentUser = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'admin', // or 'user'
  avatar: null,
  showPersonalInfo: true,
};

function App() {
  const [page, setPage] = useState('profile'); // 'profile' or 'admin'
  const [user, setUser] = useState(currentUser);

  const updateUser = (updatedUser) => {
    setUser(updatedUser);
  };

  return (
    <div className="app-root">
      <Navbar 
        user={user} 
        onNavigate={setPage} 
        currentPage={page} 
      />
      
      <main className="app-main">
        {page === 'profile' && (
          <ProfilePage user={user} onUpdateUser={updateUser} />
        )}
        
        {page === 'admin' && user.role === 'admin' && (
          <AdminDashboard />
        )}
        
        {page === 'admin' && user.role !== 'admin' && (
          <div className="app-access-denied">
            <UserCircle className="w-16 h-16" style={{ color: '#9ca3af', marginBottom: '1rem' }} />
            <h2 className="app-access-denied-title">Access Denied</h2>
            <p className="app-access-denied-desc">You don't have permission to access the admin dashboard.</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;