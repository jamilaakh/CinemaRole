import { createContext, useState, useContext, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

// Removed TypeScript interface and types
const AuthContext = createContext(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Check for saved user in localStorage for persistent login
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Simple mock login for demo
      const user = mockUsers.find(u => u.email === email);
      
      // In a real app, we would verify the password here
      if (user) {
        setCurrentUser(user);
        setIsAuthenticated(true);
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const register = async (name, email, password) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check if email already exists
      const existingUser = mockUsers.find(u => u.email === email);
      if (existingUser) {
        return false;
      }
      
      // Create new user (in a real app, this would be an API call)
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        role: 'user',
        createdAt: new Date().toISOString(),
      };
      
      // Add to mock users (this would be handled by the backend in a real app)
      mockUsers.push(newUser);
      
      // Log in the new user
      setCurrentUser(newUser);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('currentUser');
  };

  const isAdmin = currentUser?.role === 'admin';

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};