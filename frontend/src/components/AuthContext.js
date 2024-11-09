// AuthContext.js
import { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Create a provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // This can also come from your JWT token, session, etc.

  const login = (userData) => {
    setUser(userData); // Store user data, possibly from a JWT token.
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user; // Check if user is authenticated

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);
