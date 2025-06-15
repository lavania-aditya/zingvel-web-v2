"use client";

import { Box, Button, Container, Typography, Paper, useTheme } from "@mui/material";
import { HandshakeOutlined, TrendingUp, Verified } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function PartnerBanner() {
  // Use state to ensure component only renders on client side
  const [isMounted, setIsMounted] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleJoinClick = () => {
    // Navigate to partner registration page
    window.open("https://partner.zingvel.com", "_blank", "noopener, noreferrer");
  };

  // Don't render anything until client-side hydration is complete
  if (!isMounted) {
    return (
      <Container sx={{ my: 4 }}>
        <Box sx={{ height: "200px" }} />
      </Container>
    );
  }

  return (
    <Container sx={{ my: 4 }}>
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          background: theme.palette.background.default,
          position: "relative",
          border: "2px dashed",
          borderColor: "primary.main",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: { xs: "100%", md: "40%" },
            height: "100%",
            opacity: 0.1,
            background: "url(/images/pattern-dots.png) repeat",
            zIndex: 1,
          }}
        />

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            p: { xs: 3, sm: 4, md: 5 },
            position: "relative",
            zIndex: 2,
          }}
        >
          <Box sx={{ mb: { xs: 3, md: 0 }, maxWidth: { md: "60%" } }}>
            <Typography variant="h4" component="h2" fontWeight="bold" color="text.primary" sx={{ mb: 1 }}>
              Become a Zingvel Partner
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Join our network of travel partners and grow your business. Get access to thousands of travelers looking for unique experiences.
            </Typography>

            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TrendingUp sx={{ color: "primary.main", mr: 1 }} />
                <Typography color="text.primary">Increase Revenue</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Verified sx={{ color: "primary.main", mr: 1 }} />
                <Typography color="text.primary">Verified Customers</Typography>
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <HandshakeOutlined sx={{ color: "primary.main", mr: 1 }} />
                <Typography color="text.primary">Easy Onboarding</Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              size="large"
              onClick={handleJoinClick}
              sx={{
                fontWeight: "bold",
                borderRadius: 2,
              }}
            >
              JOIN AS PARTNER
            </Button>
          </Box>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HandshakeOutlined sx={{ fontSize: 120, color: "primary.main", opacity: 0.8 }} />
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
