'use client';

import { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';

interface TruncatedDescriptionProps {
  description: string;
  maxLines?: number;
}

export default function TruncatedDescription({ description, maxLines = 4 }: TruncatedDescriptionProps) {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{
          display: expanded ? 'block' : '-webkit-box',
          WebkitLineClamp: expanded ? 'unset' : maxLines,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          mb: 1
        }}
      >
        {description}
      </Typography>
      <Button
        onClick={toggleExpanded}
        variant="text"
        size="small"
        sx={{ mt: 1, p: 0, minWidth: 'auto', textTransform: 'none' }}
      >
        {expanded ? 'Read Less' : 'Read More'}
      </Button>
    </Box>
  );
}
