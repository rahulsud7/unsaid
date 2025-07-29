import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserTier } from '../types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => void;
  updateTier: (tier: UserTier) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('unsaid-user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Failed to parse user data:', error);
        localStorage.removeItem('unsaid-user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (token: string) => {
    try {
      // Mock API call - replace with actual API
      const mockUser: User = {
        id: '1',
        email: 'user@example.com',
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
        tier: 'free'
      };
      
      setUser(mockUser);
      localStorage.setItem('unsaid-user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('unsaid-user');
    localStorage.removeItem('unsaid-sessions');
    localStorage.removeItem('unsaid-memories');
    localStorage.removeItem('unsaid-usage');
  };

  const updateTier = (tier: UserTier) => {
    if (user) {
      const updatedUser = { ...user, tier };
      setUser(updatedUser);
      localStorage.setItem('unsaid-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout, updateTier }}>
      {children}
    </AuthContext.Provider>
  );
};