"use client";

import { createContext, useContext, useState, ReactNode } from 'react';

// Define cart item type
interface CartItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  type: 'hotel' | 'flight' | 'activity' | 'package';
  imageUrl?: string;
  startDate?: string;
  endDate?: string;
}

// Define the shape of our context state
interface AppContextState {
  // User related state
  user: {
    isLoggedIn: boolean;
    name: string | null;
    email: string | null;
  };
  // Travel preferences
  preferences: {
    currency: string;
    language: string;
  };
  // Saved/favorite destinations
  favorites: string[];
  // Search history
  searchHistory: string[];
  // Cart items for booking
  cart: {
    items: CartItem[];
    total: number;
  };
}

// Define the shape of our context actions/methods
interface AppContextActions {
  login: (name: string, email: string) => void;
  logout: () => void;
  updatePreferences: (preferences: Partial<AppContextState['preferences']>) => void;
  addToFavorites: (destinationId: string) => void;
  removeFromFavorites: (destinationId: string) => void;
  addToSearchHistory: (searchTerm: string) => void;
  clearSearchHistory: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
}

// Combine state and actions for the full context value
interface AppContextValue extends AppContextState, AppContextActions {}

// Create the context with a default value
const AppContext = createContext<AppContextValue | undefined>(undefined);

// Initial state
const initialState: AppContextState = {
  user: {
    isLoggedIn: false,
    name: null,
    email: null,
  },
  preferences: {
    currency: 'USD',
    language: 'en',
  },
  favorites: [],
  searchHistory: [],
  cart: {
    items: [],
    total: 0,
  },
};

// Provider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<AppContextState>(initialState);

  // Actions
  const login = (name: string, email: string) => {
    setState(prev => ({
      ...prev,
      user: {
        isLoggedIn: true,
        name,
        email,
      },
    }));
  };

  const logout = () => {
    setState(prev => ({
      ...prev,
      user: {
        isLoggedIn: false,
        name: null,
        email: null,
      },
    }));
  };

  const updatePreferences = (preferences: Partial<AppContextState['preferences']>) => {
    setState(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...preferences,
      },
    }));
  };

  const addToFavorites = (destinationId: string) => {
    setState(prev => ({
      ...prev,
      favorites: [...prev.favorites, destinationId],
    }));
  };

  const removeFromFavorites = (destinationId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.filter(id => id !== destinationId),
    }));
  };

  const addToSearchHistory = (searchTerm: string) => {
    setState(prev => ({
      ...prev,
      searchHistory: [searchTerm, ...prev.searchHistory.slice(0, 9)], // Keep only last 10 searches
    }));
  };

  const clearSearchHistory = () => {
    setState(prev => ({
      ...prev,
      searchHistory: [],
    }));
  };

  const addToCart = (item: CartItem) => {
    setState(prev => {
      const newItems = [...prev.cart.items, item];
      const newTotal = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      
      return {
        ...prev,
        cart: {
          items: newItems,
          total: newTotal,
        },
      };
    });
  };

  const removeFromCart = (itemId: string) => {
    setState(prev => {
      const newItems = prev.cart.items.filter(item => item.id !== itemId);
      const newTotal = newItems.reduce((sum, item) => sum + (item.price || 0), 0);
      
      return {
        ...prev,
        cart: {
          items: newItems,
          total: newTotal,
        },
      };
    });
  };

  const clearCart = () => {
    setState(prev => ({
      ...prev,
      cart: {
        items: [],
        total: 0,
      },
    }));
  };

  // Combine state and actions
  const value: AppContextValue = {
    ...state,
    login,
    logout,
    updatePreferences,
    addToFavorites,
    removeFromFavorites,
    addToSearchHistory,
    clearSearchHistory,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
