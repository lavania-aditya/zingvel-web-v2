"use client";

/**
 * Utility functions for error handling throughout the application
 * Enhanced with better error categorization and reporting
 */

// Define error categories for better organization
export enum ErrorCategory {
  API = 'api_error',
  NETWORK = 'network_error',
  AUTH = 'auth_error',
  VALIDATION = 'validation_error',
  UI = 'ui_error',
  UNKNOWN = 'unknown_error'
}

// Interface for structured error data
export interface ErrorData {
  message: string;
  code?: string | number;
  id?: string;
  category: ErrorCategory;
  timestamp: number;
  context?: string;
  originalError?: unknown;
  stack?: string;
}

/**
 * Log an error to the console and optionally to an error tracking service
 * @param error - The error object
 * @param context - Additional context about where the error occurred
 * @param shouldReport - Whether to report to external service (default: true)
 * @param category - Error category for better organization (default: UNKNOWN)
 */
export const logError = (
  error: unknown, 
  context: string, 
  shouldReport = true,
  category: ErrorCategory = ErrorCategory.UNKNOWN
): void => {
  // Create structured error data
  const errorData: ErrorData = {
    message: formatErrorMessage(error),
    category,
    timestamp: Date.now(),
    context,
    originalError: error,
    id: createErrorId(error),
    stack: error instanceof Error ? error.stack : undefined
  };
  
  // Always log to console with structured data
  console.error(`[${category}] Error in ${context}:`, errorData);
  
  // In production, send to error tracking service
  if (shouldReport && process.env.NODE_ENV === 'production') {
    // Example implementation with structured data
    sendToErrorTracking(errorData);
  }
};

/**
 * Send error to a tracking service (placeholder implementation)
 * In production, this would connect to your error tracking service
 */
const sendToErrorTracking = (errorData: ErrorData): void => {
  // This is a placeholder - in production, implement your error tracking service
  // Example: Sentry.captureException(errorData.originalError, { extra: errorData });
  
  // For development, we'll just log that we would have sent this
  if (process.env.NODE_ENV !== 'production') {
    console.info('Would send to error tracking:', errorData);
  }
};

/**
 * Format an error message for display to users
 * @param error - The error object
 * @returns A user-friendly error message
 */
export const formatErrorMessage = (error: unknown): string => {
  // Handle Error objects
  if (error instanceof Error) {
    return error.message;
  }
  
  // Handle string errors
  if (typeof error === 'string') {
    return error;
  }
  
  // Handle API error responses
  if (error && typeof error === 'object') {
    // Common API error formats
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }
    
    if ('error' in error && typeof error.error === 'string') {
      return error.error;
    }
    
    if ('data' in error && error.data && typeof error.data === 'object' && 'message' in error.data) {
      return String(error.data.message);
    }
    
    // Try to stringify the object if all else fails
    try {
      return `Error: ${JSON.stringify(error)}`;
    } catch {
      // If we can't stringify (circular references, etc.)
      return 'An error occurred with the request';
    }
  }
  
  return 'An unexpected error occurred';
};

/**
 * Create a unique error ID for tracking purposes
 * @param error - The error object
 * @returns A unique error ID
 */
export const createErrorId = (error: unknown): string => {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8);
  
  let errorType = 'unknown';
  
  // Get more specific error type information
  if (error instanceof Error) {
    errorType = error.name.substring(0, 4).toLowerCase();
  } else if (error && typeof error === 'object') {
    if ('status' in error && typeof error.status === 'number') {
      // Handle HTTP status errors
      errorType = `http${error.status}`;
    } else if ('code' in error) {
      // Handle error code objects
      errorType = `code${String(error.code).substring(0, 4)}`;
    }
  }
  
  return `${errorType}-${timestamp}-${random}`;
};

/**
 * Safely execute a function and catch any errors
 * @param fn - The function to execute
 * @param fallback - Fallback value if the function throws
 * @param context - Context for error logging
 * @param category - Error category for better organization
 * @returns The result of the function or the fallback value
 */
export const tryCatch = async <T>(
  fn: () => Promise<T>,
  fallback: T,
  context: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    logError(error, context, true, category);
    return fallback;
  }
};

/**
 * Safely execute a synchronous function and catch any errors
 * @param fn - The function to execute
 * @param fallback - Fallback value if the function throws
 * @param context - Context for error logging
 * @param category - Error category for better organization
 * @returns The result of the function or the fallback value
 */
export const tryCatchSync = <T>(
  fn: () => T,
  fallback: T,
  context: string,
  category: ErrorCategory = ErrorCategory.UNKNOWN
): T => {
  try {
    return fn();
  } catch (error) {
    logError(error, context, true, category);
    return fallback;
  }
};

/**
 * Get a user-friendly error message based on HTTP status code
 * @param status - HTTP status code
 * @returns User-friendly error message
 */
export const getHttpErrorMessage = (status: number): string => {
  switch (status) {
    case 400:
      return 'The request was invalid. Please check your input and try again.';
    case 401:
      return 'You need to be logged in to access this resource.';
    case 403:
      return 'You don\'t have permission to access this resource.';
    case 404:
      return 'The requested resource could not be found.';
    case 408:
      return 'The request timed out. Please try again.';
    case 409:
      return 'There was a conflict with the current state of the resource.';
    case 422:
      return 'The request was well-formed but has semantic errors.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Something went wrong on our servers. We\'re working to fix it.';
    case 502:
    case 503:
    case 504:
      return 'The service is temporarily unavailable. Please try again later.';
    default:
      return status >= 400 && status < 500
        ? 'There was an error with your request.'
        : 'Something went wrong. Please try again later.';
  }
};

/**
 * Get a short status message for HTTP status codes
 * @param status - HTTP status code
 * @returns Short status message
 */
export const getHttpStatusMessage = (status: number): string => {
  switch (status) {
    case 400: return 'Bad Request';
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not Found';
    case 408: return 'Request Timeout';
    case 409: return 'Conflict';
    case 422: return 'Unprocessable Entity';
    case 429: return 'Too Many Requests';
    case 500: return 'Internal Server Error';
    case 502: return 'Bad Gateway';
    case 503: return 'Service Unavailable';
    case 504: return 'Gateway Timeout';
    default: return status >= 400 && status < 500 ? 'Client Error' : 'Server Error';
  }
};

/**
 * Determine if an error is a network connectivity issue
 * @param error - The error to check
 * @returns True if it's a network connectivity error
 */
export const isNetworkError = (error: unknown): boolean => {
  if (error instanceof Error) {
    // Check for common network error messages
    const networkErrorMessages = [
      'network error',
      'failed to fetch',
      'network request failed',
      'network timeout',
      'offline',
      'connection refused',
      'connection failed'
    ];
    
    return networkErrorMessages.some(msg => 
      error.message.toLowerCase().includes(msg.toLowerCase())
    );
  }
  
  return false;
};

/**
 * Retry a function with exponential backoff
 * @param fn - Function to retry
 * @param maxRetries - Maximum number of retries
 * @param initialDelay - Initial delay in ms
 * @param context - Context for error logging
 * @returns Promise resolving to the function result
 */
export const retryWithBackoff = async <T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 300,
  context: string = 'retryWithBackoff'
): Promise<T> => {
  let lastError: unknown;
  
  for (let attempt = 0; attempt < maxRetries + 1; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      
      // If this was the last attempt, don't wait
      if (attempt >= maxRetries) break;
      
      // Calculate delay with exponential backoff and jitter
      const delay = initialDelay * Math.pow(2, attempt) + Math.random() * 100;
      
      // Log retry attempt
      console.warn(`Attempt ${attempt + 1} failed, retrying in ${Math.round(delay)}ms`, error);
      
      // Wait before next attempt
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  
  // If we get here, all retries failed
  logError(lastError, `${context} (after ${maxRetries} retries)`, true, ErrorCategory.NETWORK);
  throw lastError;
};
