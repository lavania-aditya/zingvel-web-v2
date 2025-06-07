"use client";

import { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Paper, 
  Fade, 
  CircularProgress,
  useTheme
} from '@mui/material';
import { TextUi } from '@/components/customUi/TextUi';
import { ButtonUi } from '@/components/customUi/ButtonUi';
import { 
  ErrorOutline as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon
} from '@mui/icons-material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { keyframes } from "@emotion/react";
import { ErrorCategory, logError, formatErrorMessage, createErrorId } from "@/utils/errorHandling";

// Animation for error icon
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
`;

// Component to display error stack trace in development mode
interface ErrorStackDisplayProps {
  error: Error | unknown;
}

const ErrorStackDisplay = ({ error }: ErrorStackDisplayProps) => {
  // Safely extract stack if available
  const errorStack = error instanceof Error && 'stack' in error ? 
    String(error.stack) : 
    'Stack trace not available';
    
  return (
    <Box 
      sx={{ 
        mt: 2, 
        p: 2, 
        bgcolor: 'background.paper',
        borderRadius: 1,
        overflow: 'auto',
        fontSize: '0.75rem',
        maxHeight: '150px',
        fontFamily: 'monospace',
        textAlign: 'left'
      }}
    >
      <TextUi variant="caption" sx={{ display: 'block', mb: 1 }}>
        Stack Trace (Development Only):
      </TextUi>
      <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
        {errorStack}
      </pre>
    </Box>
  );
};

export interface ErrorPageProps {
  error?: Error | unknown;
  statusCode?: number;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  showRetryButton?: boolean;
  customButtons?: React.ReactNode;
  resetCallback?: () => void;
  fullHeight?: boolean;
  errorId?: string;
  errorCategory?: ErrorCategory;
  children?: React.ReactNode;
}

/**
 * Reusable error page component that can be used for various error states
 * Provides consistent styling and behavior across the application
 */
export default function ErrorPage({
  error,
  statusCode = 500,
  title,
  message,
  showHomeButton = true,
  showBackButton = true,
  showRetryButton = true,
  customButtons,
  resetCallback,
  fullHeight = true,
  errorId,
  errorCategory = ErrorCategory.UNKNOWN,
  children
}: ErrorPageProps) {
  const theme = useTheme();
  const router = useRouter();
  const [isResetting, setIsResetting] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);
  const [errorDetails] = useState(() => {
    // Generate error ID if not provided
    const id = errorId || (error ? createErrorId(error) : `err-${Date.now().toString(36)}`);
    
    // Format error message if not provided
    const errorMessage = message || (error ? formatErrorMessage(error) : 'An unexpected error occurred');
    
    // Determine title if not provided
    const errorTitle = title || (statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong');
    
    return { id, message: errorMessage, title: errorTitle };
  });

  // Log the error and handle animation
  useEffect(() => {
    // Log the error using our centralized error handling
    if (error) {
      logError(
        error,
        `ErrorPage: ${errorDetails.title}`,
        true,
        errorCategory
      );
    }
    
    // Trigger animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Check if we can go back
    try {
      setCanGoBack(window.history.length > 1);
    } catch {
      // Ignore history API errors
    }
    
    return () => clearTimeout(timer);
  }, [error, errorDetails.title, errorCategory]);
  
  // Handle reset/retry action
  const handleReset = () => {
    setIsResetting(true);
    
    setTimeout(() => {
      if (resetCallback) {
        resetCallback();
      }
      // Reset will either work or the component will re-render with the error
      setTimeout(() => {
        setIsResetting(false);
      }, 1000);
    }, 500);
  };
  
  // Handle back navigation
  const handleBack = () => {
    router.back();
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: fullHeight ? '70vh' : 'auto',
          py: fullHeight ? 8 : 4,
          textAlign: 'center',
        }}
      >
        <Fade in={isVisible} timeout={800}>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ErrorIcon 
              color="error" 
              sx={{ 
                fontSize: 80, 
                mb: 4,
                animation: `${bounce} 2s ease infinite`,
              }} 
            />
            
            <TextUi 
              variant="h2" 
              fontWeight="bold"
              sx={{ 
                mb: 2,
                background: statusCode === 404 
                  ? 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' 
                  : 'linear-gradient(45deg, #f44336 30%, #ff9800 90%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {statusCode && <span>{statusCode} - </span>}{errorDetails.title}
            </TextUi>
            
            <Paper 
              elevation={3} 
              sx={{ 
                p: 3, 
                mb: 4, 
                width: '100%', 
                maxWidth: 600,
                bgcolor: theme.palette.mode === 'dark' 
                  ? (statusCode === 404 ? 'rgba(25, 118, 210, 0.08)' : 'rgba(255, 0, 0, 0.08)') 
                  : (statusCode === 404 ? 'primary.background' : 'error.background'),
                border: '1px solid',
                borderColor: statusCode === 404 ? 'primary.light' : 'error.light',
                borderRadius: 2,
              }}
            >
              <TextUi variant="body1" sx={{ mb: 2 }}>
                {errorDetails.message}
              </TextUi>
              
              {errorDetails.id && (
                <TextUi variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Error ID: {errorDetails.id}
                </TextUi>
              )}
              
              {error && process.env.NODE_ENV === 'development' && (
                <ErrorStackDisplay error={error} />
              )}
            </Paper>
            
            {children && (
              <Box sx={{ mt: 2, width: '100%', maxWidth: 600 }}>
                {children}
              </Box>
            )}
            
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center', mt: 2 }}>
              {showRetryButton && resetCallback && (
                <ButtonUi 
                  variant="contained" 
                  startIcon={isResetting ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                  size="large"
                  disabled={isResetting}
                  color={statusCode === 404 ? "primary" : "error"}
                  sx={{ fontWeight: 'bold' }}
                  onClick={handleReset}
                >
                  {isResetting ? 'Retrying...' : 'Try Again'}
                </ButtonUi>
              )}
              
              {showHomeButton && (
                <Box component={Link} href="/" sx={{ textDecoration: 'none' }}>
                  <ButtonUi 
                    variant="outlined" 
                    size="large"
                    startIcon={<HomeIcon />}
                    color={statusCode === 404 ? "primary" : "info"}
                  >
                    Go to Homepage
                  </ButtonUi>
                </Box>
              )}
              
              {showBackButton && canGoBack && (
                <ButtonUi 
                  variant="text" 
                  size="large"
                  startIcon={<ArrowBackIcon />}
                  sx={{ mt: { xs: 2, sm: 0 } }}
                  onClick={handleBack}
                >
                  Go Back
                </ButtonUi>
              )}
              
              {customButtons}
            </Box>
          </Box>
        </Fade>
      </Box>
    </Container>
  );
}
