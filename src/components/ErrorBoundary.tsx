"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { Box, Button, Container, Typography, Paper, Fade, Tooltip } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import RefreshIcon from "@mui/icons-material/Refresh";
import BugReportIcon from "@mui/icons-material/BugReport";
import { keyframes } from "@emotion/react";
import { logError, ErrorCategory, createErrorId, formatErrorMessage } from "@/utils/errorHandling";

// Animation keyframes
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

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  showDetails?: boolean; // Whether to show technical details (defaults to dev mode only)
  resetOnPropsChange?: boolean; // Whether to reset error state when props change
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
  errorId: string | null;
  isLoading: boolean;
}

/**
 * Client-side error boundary component to catch and handle React rendering errors
 * This can be used to wrap sections of your app that might throw errors
 */
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
    errorId: null,
    isLoading: false,
  };

  // Track mounted state to prevent state updates after unmount
  private isMounted = false;

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return {
      hasError: true,
      error,
      errorInfo: null,
      errorId: createErrorId(error),
      isLoading: false,
    };
  }

  public componentDidMount() {
    this.isMounted = true;
  }

  public componentWillUnmount() {
    this.isMounted = false;
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error to our error handling system
    logError(error, 'ErrorBoundary', true, ErrorCategory.UI);

    // Update state with error info
    if (this.isMounted) {
      this.setState({
        error,
        errorInfo,
        errorId: createErrorId(error)
      });
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }



  // Reset the error boundary state
  public handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      isLoading: true, // Show loading state briefly
    });

    // Brief delay to show loading state before resetting
    setTimeout(() => {
      if (this.isMounted) {
        this.setState({ isLoading: false });
      }
    }, 500);
  };

  // Check if we should reset when props change
  public componentDidUpdate(prevProps: Props) {
    if (
      this.props.resetOnPropsChange &&
      this.state.hasError &&
      prevProps.children !== this.props.children
    ) {
      this.handleReset();
    }
  }

  public render() {
    const { hasError, error, errorInfo, errorId, isLoading } = this.state;
    const { fallback, showDetails = process.env.NODE_ENV === "development" } = this.props;

    // If loading after reset, show minimal loading indicator
    if (isLoading) {
      return (
        <Fade in={true}>
          <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center' }}>
            <Typography>Reloading content...</Typography>
          </Container>
        </Fade>
      );
    }

    // If there's an error, show error UI
    if (hasError) {
      // If custom fallback is provided, use it
      if (fallback) {
        return fallback;
      }

      // Default error UI
      return (
        <Fade in={true}>
          <Container maxWidth="md" sx={{ py: 8 }}>
            <Paper
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 2,
                textAlign: "center",
                backgroundColor: "background.paper",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <ErrorOutlineIcon
                  color="error"
                  sx={{
                    fontSize: 60,
                    animation: `${bounce} 2s ease infinite`,
                  }}
                />
                <Typography variant="h4" component="h1" gutterBottom>
                  Something went wrong
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  We apologize for the inconvenience. Please try again or contact
                  support if the problem persists.
                </Typography>

                {errorId && (
                  <Typography variant="caption" color="text.secondary">
                    Error ID: {errorId}
                  </Typography>
                )}

                {showDetails && error && (
                  <Fade in={true}>
                    <Box
                      sx={{
                        mt: 2,
                        p: 2,
                        bgcolor: "grey.100",
                        color: "grey.900",
                        borderRadius: 1,
                        width: "100%",
                        textAlign: "left",
                        overflow: "auto",
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="subtitle2" gutterBottom sx={{ mb: 0 }}>
                          Error Details {process.env.NODE_ENV === "development" ? "" : "(Technical Information)"}:
                        </Typography>
                        <Tooltip title="This information helps developers fix the issue">
                          <BugReportIcon fontSize="small" color="action" />
                        </Tooltip>
                      </Box>
                      <Typography
                        variant="body2"
                        component="pre"
                        sx={{ whiteSpace: "pre-wrap", color: "error.main", fontFamily: 'monospace' }}
                      >
                        {formatErrorMessage(error)}
                      </Typography>
                      {errorInfo && (
                        <Typography
                          variant="body2"
                          component="pre"
                          sx={{
                            mt: 2,
                            whiteSpace: "pre-wrap",
                            fontSize: "0.75rem",
                            fontFamily: 'monospace',
                            maxHeight: '200px',
                            overflow: 'auto'
                          }}
                        >
                          {errorInfo.componentStack}
                        </Typography>
                      )}
                    </Box>
                  </Fade>
                )}

                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<RefreshIcon />}
                  onClick={this.handleReset}
                  sx={{ mt: 2 }}
                >
                  Try Again
                </Button>
              </Box>
            </Paper>
          </Container>
        </Fade>
      );
    }

    // No error, render children normally
    return this.props.children;
  }
}

export default ErrorBoundary;
