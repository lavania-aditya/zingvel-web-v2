/**
 * Application configuration based on environment variables
 * This file centralizes all environment variable access
 */

// Define environment types
export type Environment = 'development' | 'production' | 'regression';

// Get current environment
const getEnvironment = (): Environment => {
  const env = process.env.NEXT_PUBLIC_APP_ENV || process.env.NODE_ENV;
  if (env === 'production' || env === 'development' || env === 'regression') {
    return env;
  }
  return 'development'; // Default to development
};

// Configuration object
export const config = {
  // Current environment
  environment: getEnvironment(),
  
  // API base URLs
  api: {
    wanderlist: process.env.NEXT_PUBLIC_WANDERLIST_API_URL || 'http://localhost:3434/api',
    packages: process.env.NEXT_PUBLIC_PACKAGES_API_URL || 'http://localhost:8082/api',
  },
  
  // Application URLs
  app: {
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  
  // Environment-specific configurations
  isDevelopment: getEnvironment() === 'development',
  isProduction: getEnvironment() === 'production',
  isRegression: getEnvironment() === 'regression',
};

export default config;
