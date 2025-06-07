"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  phoneNumber: string;
  name?: string;
  email?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (phoneNumber: string) => void;
  logout: () => void;
  verifyOTP: (otp: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPhoneNumber, setCurrentPhoneNumber] = useState<string>('');

  // Check if user is already logged in from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (error) {
          console.error('Failed to parse stored user data:', error);
          localStorage.removeItem('user');
        }
      }
      setIsLoading(false);
    }
  }, []);

  const login = (phoneNumber: string) => {
    // Store the phone number for OTP verification
    setCurrentPhoneNumber(phoneNumber);
    
    // In a real app, this would call an API to send OTP
    console.log(`Sending OTP to ${phoneNumber}`);
    
    // For demo purposes, we'll just log the "OTP"
    console.log('Demo OTP: 1234');
  };

  const verifyOTP = async (otp: string): Promise<boolean> => {
    // In a real app, this would verify the OTP with an API
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, any 4-digit OTP is valid
      if (otp.length === 4) {
        const newUser = {
          id: `user_${Date.now()}`,
          phoneNumber: currentPhoneNumber,
        };
        
        setUser(newUser);
        
        // Store in localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('user', JSON.stringify(newUser));
        }
        
        setIsLoading(false);
        return true;
      }
      
      setIsLoading(false);
      return false;
    } catch (error) {
      console.error('OTP verification failed:', error);
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('user');
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        verifyOTP,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
