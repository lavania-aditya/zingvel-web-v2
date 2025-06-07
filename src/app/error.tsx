"use client";

import { useState } from 'react';
import { 
  Box,
  Collapse,
  IconButton,
  Typography
} from '@mui/material';
import { 
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon
} from '@mui/icons-material';
import ErrorPage from '@/components/ErrorPage';
import { ErrorCategory, isNetworkError } from "@/utils/errorHandling";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [retryCount, setRetryCount] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  // Check if this is a network error
  const isNetworkIssue = isNetworkError(error);
  
  // Get HTTP status code if present in the error
  const statusCode = error.message.match(/\b([45][0-9]{2})\b/)?.[1];
  
  // Handle reset/retry action with retry count
  const handleReset = () => {
    setRetryCount(prev => prev + 1);
    reset();
  };
  
  // Create custom error details component with toggle
  const errorDetailsComponent = (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Technical Details
        </Typography>
        
        <IconButton 
          size="small" 
          onClick={() => setShowDetails(!showDetails)}
          aria-label={showDetails ? "Hide error details" : "Show error details"}
        >
          {showDetails ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>
      
      <Collapse in={showDetails}>
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
          <Typography variant="caption" display="block" gutterBottom>
            Error Details:
          </Typography>
          <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
            {error.stack || error.message}
          </pre>
        </Box>
      </Collapse>
    </Box>
  );

  return (
    <ErrorPage
      error={error}
      statusCode={statusCode ? parseInt(statusCode) : undefined}
      title={isNetworkIssue ? 'Connection Error' : 'Something Went Wrong'}
      message={isNetworkIssue
        ? 'Unable to connect to the server. Please check your internet connection and try again.'
        : retryCount > 0 ? `Retry attempt ${retryCount} failed. Trying again...` : undefined}
      errorCategory={isNetworkIssue ? ErrorCategory.NETWORK : ErrorCategory.UI}
      showHomeButton={true}
      showBackButton={false}
      showRetryButton={true}
      resetCallback={handleReset}
      fullHeight={true}
    >
      {errorDetailsComponent}
    </ErrorPage>
  );
}
