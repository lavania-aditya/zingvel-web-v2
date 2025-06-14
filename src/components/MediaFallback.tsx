"use client";

import { Box, SvgIcon } from "@mui/material";
import React from "react";

interface IMediaFallbackProps {
  width?: string | number;
  height?: string | number;
}

const MediaFallback: React.FC<IMediaFallbackProps> = ({ width = "100%", height = 200 }) => {
  return (
    <Box
      sx={{
        width,
        height,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "grey.100", // Light grey background from theme
        color: "grey.500", // Medium grey for the icon
      }}
    >
      <SvgIcon sx={{ fontSize: 60, opacity: 0.7 }}>
        <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
      </SvgIcon>
    </Box>
  );
};

export default MediaFallback;
