"use client";

import { useEffect, useState } from 'react';
import { Box, Button, Container, Typography, Paper, Fade, CircularProgress, Tooltip } from '@mui/material';
import { ErrorOutline as ErrorIcon, Refresh as RefreshIcon, BugReport as BugReportIcon } from '@mui/icons-material';
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { ThemeProvider } from "@/context/ThemeContext";
import { ThemeWrapper } from "@/utils/themeWrapper";
import CssBaseline from "@mui/material/CssBaseline";
import { Geist, Geist_Mono } from "next/font/google";
import { keyframes } from "@emotion/react";
import { logError, ErrorCategory, createErrorId, formatErrorMessage } from "@/utils/errorHandling";

// Animation keyframes for error icon
const pulse = keyframes`
  0% {
    opacity: 0.6;
    transform: scale(0.98);
  }
  50% {
    opacity: 1;
    transform: scale(1.05);
  }
  100% {
    opacity: 0.6;
    transform: scale(0.98);
  }
`;

// Use the same font configuration as in layout.tsx
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This component handles fatal errors at the root level
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [isResetting, setIsResetting] = useState(false);
  const [errorId] = useState(() => error.digest || createErrorId(error));
  
  // Log the error to an error reporting service
  useEffect(() => {
    logError(error, 'GlobalError (Fatal)', true, ErrorCategory.UNKNOWN);
  }, [error]);
  
  // Handle reset with loading state
  const handleReset = () => {
    setIsResetting(true);
    setTimeout(() => {
      reset();
      // If reset doesn't navigate away, clear the loading state after a delay
      setTimeout(() => setIsResetting(false), 1000);
    }, 500);
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <AppRouterCacheProvider>
          <ThemeProvider>
            <ThemeWrapper>
              <CssBaseline />
              <Fade in={true} timeout={800}>
                <Container maxWidth="md">
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '100vh',
                      py: 8,
                    }}
                  >
                    <ErrorIcon 
                      color="error" 
                      sx={{ 
                        fontSize: 100, 
                        mb: 4,
                        animation: `${pulse} 2s ease-in-out infinite`
                      }} 
                    />
                    
                    <Typography 
                      variant="h3" 
                      component="h1" 
                      gutterBottom
                      sx={{
                        background: 'linear-gradient(45deg, #FF5252 30%, #FF1744 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold'
                      }}
                    >
                      Critical Error
                    </Typography>
                    
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        p: 4, 
                        mb: 4, 
                        width: '100%', 
                        maxWidth: 600,
                        bgcolor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 0, 0, 0.1)' : 'error.background',
                        border: '1px solid',
                        borderColor: 'error.light',
                        borderRadius: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="h6" gutterBottom sx={{ mb: 0 }}>
                          Fatal Application Error
                        </Typography>
                        <Tooltip title="This error has been logged for developers">
                          <BugReportIcon fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                      
                      <Typography variant="body1" gutterBottom>
                        The application has encountered a critical error and cannot continue.
                        We apologize for the inconvenience.
                      </Typography>
                      
                      {process.env.NODE_ENV === 'development' && (
                        <Box 
                          sx={{ 
                            mt: 2, 
                            p: 2, 
                            bgcolor: 'background.paper', 
                            borderRadius: 1,
                            overflow: 'auto',
                            maxHeight: '200px',
                            fontFamily: 'monospace',
                            fontSize: '0.75rem'
                          }}
                        >
                          <Typography variant="subtitle2" gutterBottom>
                            Error Details (Development Only):
                          </Typography>
                          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
                            {formatErrorMessage(error)}
                            {error.stack && `\n\n${error.stack}`}
                          </pre>
                        </Box>
                      )}
                      
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        Error ID: {errorId}
                      </Typography>
                    </Paper>
                    
                    <Button 
                      variant="contained" 
                      onClick={handleReset}
                      disabled={isResetting}
                      startIcon={isResetting ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
                      size="large"
                    >
                      {isResetting ? 'Restarting...' : 'Restart Application'}
                    </Button>
                  </Box>
                </Container>
              </Fade>
            </ThemeWrapper>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
