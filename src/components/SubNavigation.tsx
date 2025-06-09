"use client";

import { useState } from "react";
import { Box, Container, Button, useTheme, useMediaQuery, Switch, Typography, Divider } from "@mui/material";
import { DarkMode as DarkModeIcon, LightMode as LightModeIcon, GetApp as DownloadIcon, Handshake as PartnerIcon } from "@mui/icons-material";
import Link from "next/link";
import { FONTS } from "@/utils/theme";
import { useThemeContext } from "@/context/ThemeContext";
import DownloadAppDialog from "./DownloadAppDialog";

const SubNavigation = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { mode, toggleTheme } = useThemeContext();
  const isDarkMode = mode === "dark";
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);

  const handleDownloadClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setDownloadDialogOpen(true);
  };

  // If not desktop, don't render anything
  if (!isDesktop) return null;

  return (
    <Box
      sx={{
        borderBottom: `1px solid ${theme.palette.divider}`,
        py: 1,
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Left side navigation items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              component={Link}
              href="/packages"
              sx={{
                color: `${theme.palette.common.black} !important`,
                fontFamily: FONTS.heading,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Packages
            </Button>

            <Divider orientation="vertical" flexItem sx={{ alignSelf: "center", height: "1rem", borderColor: theme.palette.grey[500] }} />

            <Button
              component={Link}
              href="/wanderlists"
              sx={{
                color: `${theme.palette.common.black} !important`,
                fontFamily: FONTS.heading,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Wanderlists
            </Button>

            <Divider orientation="vertical" flexItem sx={{ alignSelf: "center", height: "1rem", borderColor: theme.palette.grey[500] }} />

            <Button
              component={Link}
              href="/inquiries"
              sx={{
                color: `${theme.palette.common.black} !important`,
                fontFamily: FONTS.heading,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Inquiries
            </Button>
          </Box>

          {/* Right side navigation items */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Button
              onClick={handleDownloadClick}
              startIcon={<DownloadIcon fontSize="small" />}
              sx={{
                color: `${theme.palette.common.black} !important`,
                fontFamily: FONTS.heading,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Download App
            </Button>

            <Divider orientation="vertical" flexItem sx={{ alignSelf: "center", height: "1rem", borderColor: theme.palette.grey[500] }} />

            <Button
              component={Link}
              href="https://partner.zingvel.com"
              target="_blank"
              startIcon={<PartnerIcon fontSize="small" />}
              sx={{
                color: `${theme.palette.common.black} !important`,
                fontFamily: FONTS.heading,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                },
              }}
            >
              Join as Partner
            </Button>

            <Divider orientation="vertical" flexItem sx={{ alignSelf: "center", height: "1rem", borderColor: theme.palette.grey[500] }} />

            <Box sx={{ display: "flex", alignItems: "center", ml: 1 }}>
              {isDarkMode ? (
                <LightModeIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
              ) : (
                <DarkModeIcon fontSize="small" sx={{ mr: 0.5, color: theme.palette.text.secondary }} />
              )}
              <Typography variant="body2" sx={{ mr: 1, fontSize: "0.8rem", color: theme.palette.text.secondary }}>
                {isDarkMode ? "Dark" : "Light"}
              </Typography>
              <Switch checked={isDarkMode} onChange={toggleTheme} color="primary" size="small" />
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Download App Dialog */}
      <DownloadAppDialog open={downloadDialogOpen} onClose={() => setDownloadDialogOpen(false)} />
    </Box>
  );
};

export default SubNavigation;
