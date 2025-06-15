"use client";

import { Box, Typography } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import Link from "next/link";

interface ExploreAllCtaProps {
  title: string;
  icon: React.ReactNode;
  href: string;
}

const ExploreAllCta = ({ title, icon, href }: ExploreAllCtaProps) => {

  return (
    <Box
      component={Link}
      href={href}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 3,
        my: 2,
        textDecoration: "none",
        color: "text.primary",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          "& .arrow-icon": {
            transform: "translateX(4px)",
          },
          "& .title": {
            color: "primary.main",
          }
        },
      }}
    >
      <Box sx={{ color: "primary.main", mr: 1.5 }}>{icon}</Box>
      <Typography 
        variant="h6" 
        fontWeight="medium"
        className="title"
        sx={{ 
          transition: "color 0.2s ease-in-out",
          color: "primary.main"
        }}
      >
        {title}
      </Typography>
      <ArrowForward 
        className="arrow-icon" 
        sx={{ 
          fontSize: 20, 
          color: "primary.main",
          ml: 1.5,
          transition: "transform 0.2s ease-in-out"
        }} 
      />
    </Box>
  );
};

export default ExploreAllCta;
