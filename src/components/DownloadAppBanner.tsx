"use client";

import { Box, Container, Typography, Paper, useTheme } from "@mui/material";
import Image from "next/image";

export default function DownloadAppBanner() {
  const theme = useTheme();

  const handleGooglePlayClick = () => {
    window.open("https://play.google.com/store/apps/details?id=com.zingvel.app", "_blank", "noopener, noreferrer");
  };

  const handleAppStoreClick = () => {
    window.open("https://apps.apple.com/app/zingvel", "_blank", "noopener, noreferrer");
  };

  return (
    <Container sx={{ mb: 4 }}>
      <Paper
        sx={{
          borderRadius: 3,
          overflow: "hidden",
          backgroundColor: theme.palette.background.default,
          border: "2px dashed",
          borderColor: "primary.main",
          p: { xs: 3, md: 4 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" component="h2" color="text.primary" fontWeight="bold" sx={{ mb: 1 }}>
            Download the Zingvel App
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: "600px" }}>
            Get the best travel experience with our mobile app. Book trips, manage itineraries, and discover new destinations on the go.
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "center",
            gap: 4,
          }}
        >
          {/* Google Play Button */}
          <Box
            onClick={handleGooglePlayClick}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.common.white,
              borderRadius: 2,
              p: 1.5,
              px: 3,
              cursor: "pointer !important",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <Image src="/icons/play_store_icon.svg" alt="Play Store" width={40} height={40} />
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="body1" color={theme.palette.secondary.main} sx={{ display: "block", fontSize: "0.8rem" }}>
                Download On The
              </Typography>
              <Typography variant="body1" color={theme.palette.secondary.main} sx={{ fontWeight: "bold", fontSize: "1rem", lineHeight: 1.2 }}>
                Google Play Store
              </Typography>
            </Box>
          </Box>

          {/* App Store Button */}
          <Box
            onClick={handleAppStoreClick}
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: theme.palette.common.white,
              borderRadius: 2,
              p: 1.5,
              px: 3,
              cursor: "pointer !important",
              "&:hover": {
                opacity: 0.9,
              },
            }}
          >
            <Box sx={{ mr: 2, display: "flex", alignItems: "center" }}>
              <Image src="/icons/apple_icon.svg" alt="App Store" width={40} height={40} />
            </Box>
            <Box sx={{ textAlign: "left" }}>
              <Typography variant="caption" color={theme.palette.secondary.main} sx={{ display: "block", fontSize: "0.7rem" }}>
                Download On The
              </Typography>
              <Typography variant="body1" color={theme.palette.secondary.main} sx={{ fontWeight: "bold", lineHeight: 1.2 }}>
                Apple App Store
              </Typography>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
