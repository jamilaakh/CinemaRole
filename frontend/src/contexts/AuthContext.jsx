import { createContext, useState, useContext, useEffect } from 'react';

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
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('currentUser', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (name, email, password) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find(u => u.email === email)) {
      return false;
    }
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
      role: 'user',
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    return true;
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