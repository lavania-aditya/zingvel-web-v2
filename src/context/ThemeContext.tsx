"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PaletteMode } from '@mui/material';

interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Default to 'light' theme
  const [mode, setMode] = useState<PaletteMode>('light');

  // Initialize theme from localStorage when component mounts (client-side only)
  useEffect(() => {
    // Check if we're in the browser environment
    if (typeof window !== 'undefined') {
      const storedTheme = localStorage.getItem('theme') as PaletteMode | null;
      if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
        setMode(storedTheme);
      }
    }
  }, []);

  const toggleTheme = () => {
    const newMode = mode === 'light' ? 'dark' : 'light';
    setMode(newMode);
    // Only access localStorage on the client
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newMode);
    }
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};
