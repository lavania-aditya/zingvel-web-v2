"use client";

import { Box, Card, CardContent, useTheme } from "@mui/material";
import { keyframes } from "@mui/system";

interface ShimmerCardProps {
  height?: string | number;
  width?: string | number;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

const ShimmerCard = ({ height = "100%", width = "100%" }: ShimmerCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height,
        width,
        borderRadius: 2,
        overflow: "hidden",
        boxShadow: theme.shadows[1],
      }}
    >
      {/* Image area */}
      <Box
        sx={{
          height: "200px",
          width: "100%",
          background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[200]} 75%)`,
          backgroundSize: "200% 100%",
          animation: `${shimmer} 1.5s infinite linear`,
        }}
      />

      <CardContent>
        {/* Title */}
        <Box
          sx={{
            height: "24px",
            width: "70%",
            mb: 1,
            background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[200]} 75%)`,
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite linear`,
            borderRadius: 1,
          }}
        />

        {/* Location */}
        <Box
          sx={{
            height: "16px",
            width: "40%",
            mb: 2,
            background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[200]} 75%)`,
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite linear`,
            borderRadius: 1,
          }}
        />

        {/* Details */}
        <Box
          sx={{
            height: "16px",
            width: "60%",
            mb: 1,
            background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[200]} 75%)`,
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite linear`,
            borderRadius: 1,
          }}
        />

        <Box
          sx={{
            height: "16px",
            width: "50%",
            background: `linear-gradient(90deg, ${theme.palette.grey[200]} 25%, ${theme.palette.grey[300]} 50%, ${theme.palette.grey[200]} 75%)`,
            backgroundSize: "200% 100%",
            animation: `${shimmer} 1.5s infinite linear`,
            borderRadius: 1,
          }}
        />
      </CardContent>
    </Card>
  );
};

export default ShimmerCard;
