"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  styled,
  IconButton,
  Slide,
  Snackbar,
} from "@mui/material";
import {
  Close as CloseIcon,
  Android as AndroidIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import AdaptiveDialog from "./AdaptiveDialog";
import Image from "next/image";

interface DownloadAppDialogProps {
  open: boolean;
  onClose: () => void;
}

const StoreButton = styled(Button)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  padding: theme.spacing(1.5, 2),
  borderRadius: theme.shape.borderRadius,
  textTransform: "none",
  width: "100%",
  marginBottom: theme.spacing(1.5),
}));

const DownloadAppDialog = ({ open, onClose }: DownloadAppDialogProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleAppleStoreClick = () => {
    setSnackbarOpen(true);
  };

  const handlePlayStoreClick = () => {
    // Open Play Store link
    window.open("https://play.google.com/store/apps/details?id=com.zingvel.app", "_blank");
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <AdaptiveDialog
        open={open}
        onClose={onClose}
        title="Download Zingvel App"
        fullWidth
        maxWidth="sm"
      >
        <Box sx={{ display: "flex", flexDirection: "column", height: isMobile ? "100%" : "auto", p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: 300,
                height: 300,
              }}
            >
              <Image
                src="/app-preview.svg"
                alt="Zingvel App"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </Box>
          </Box>

          <Typography variant="h6" gutterBottom align="center">
            Get the full experience on our mobile app
          </Typography>

          <Typography variant="body2" color="text.secondary" align="center" sx={{ mb: 4 }}>
            Download the Zingvel app for a better experience, exclusive deals, and real-time notifications.
          </Typography>

          <Box sx={{ maxWidth: 300, width: "100%", mx: "auto" }}>
            <StoreButton
              variant="contained"
              startIcon={<AndroidIcon />}
              onClick={handlePlayStoreClick}
              sx={{
                backgroundColor: "#689f38",
                "&:hover": {
                  backgroundColor: "#558b2f",
                },
              }}
            >
              <Box sx={{ textAlign: "left", ml: 1 }}>
                <Typography variant="caption" display="block" sx={{ lineHeight: 1 }}>
                  GET IT ON
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  Google Play
                </Typography>
              </Box>
            </StoreButton>

            <StoreButton
              variant="contained"
              startIcon={<AppleIcon />}
              onClick={handleAppleStoreClick}
              sx={{
                backgroundColor: "#000",
                "&:hover": {
                  backgroundColor: "#333",
                },
              }}
            >
              <Box sx={{ textAlign: "left", ml: 1 }}>
                <Typography variant="caption" display="block" sx={{ lineHeight: 1 }}>
                  Download on the
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                  App Store
                </Typography>
              </Box>
            </StoreButton>
          </Box>

          <Typography variant="caption" color="text.secondary" align="center" sx={{ mt: 3 }}>
            By downloading, you agree to our Terms of Service and Privacy Policy.
          </Typography>
        </Box>
      </AdaptiveDialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="iOS app coming soon!"
        action={
          <IconButton size="small" color="inherit" onClick={handleSnackbarClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        TransitionComponent={Slide}
      />
    </>
  );
};

export default DownloadAppDialog;
