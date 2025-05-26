import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, fullName: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fitnessUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  // Mock login function
  async function login(email: string, password: string) {
    // In a real app, this would validate credentials against a backend
    const storedUsers = JSON.parse(localStorage.getItem('fitnessUsers') || '[]');
    const user = storedUsers.find((u: any) => u.email === email);
    
    if (!user || user.password !== password) {
      throw new Error('Invalid email or password');
    }
    
    const userInfo = {
      id: user.id,
      email: user.email,
      fullName: user.fullName
    };
    
    setCurrentUser(userInfo);
    localStorage.setItem('fitnessUser', JSON.stringify(userInfo));
    setIsAuthenticated(true);
  }

  // Mock signup function
  async function signup(email: string, password: string, fullName: string) {
    // In a real app, this would create a user in the backend
    const storedUsers = JSON.parse(localStorage.getItem('fitnessUsers') || '[]');
    
    // Check if user already exists
    if (storedUsers.some((user: any) => user.email === email)) {
      throw new Error('User with this email already exists');
    }
    
    const newUser = {
      id: uuidv4(),
      email,
      password, // In a real app, this would be hashed
      fullName
    };
    
    storedUsers.push(newUser);
    localStorage.setItem('fitnessUsers', JSON.stringify(storedUsers));
    
    const userInfo = {
      id: newUser.id,
      email: newUser.email,
      fullName: newUser.fullName
    };
    
    setCurrentUser(userInfo);
    localStorage.setItem('fitnessUser', JSON.stringify(userInfo));
    setIsAuthenticated(true);
  }

  function logout() {
    setCurrentUser(null);
    localStorage.removeItem('fitnessUser');
    setIsAuthenticated(false);
  }

  const value = {
    currentUser,
    login,
    signup,
    logout,
    isAuthenticated
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}