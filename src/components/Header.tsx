"use client";

import { useState } from "react";
// import { useRouter } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
  Avatar,
  Divider,
  Switch,
  Paper,
} from "@mui/material";
import { Close as CloseIcon, Search as SearchIcon, GetApp as DownloadIcon, Person as PersonIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import LoginDialog from "./LoginDialog";
import DownloadAppDialog from "./DownloadAppDialog";

const Header = () => {
  const theme = useTheme();
  const router = useRouter();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const [downloadDialogOpen, setDownloadDialogOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();
  const { isAuthenticated } = useAuth();
  const isDarkMode = mode === "dark";

  const handleDownloadClick = () => {
    setDrawerOpen(false); // Close the drawer first
    setDownloadDialogOpen(true);
  };

  const handleThemeToggle = () => {
    toggleTheme();
  };

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
      return;
    }
    setDrawerOpen(open);
  };

  const drawer = (
    <Box sx={{ width: 280 }} role="presentation">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2 }}>
        <Box
          component="img"
          src="/zingvel_logo.png"
          alt="Zingvel Logo"
          sx={{
            height: 40,
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />
        <IconButton onClick={toggleDrawer(false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Divider />

      <Box sx={{ p: 2 }}>
        <Button variant="contained" fullWidth sx={{ mb: 1 }} onClick={() => setLoginDialogOpen(true)}>
          {isAuthenticated ? "My Account" : "Login / Sign Up"}
        </Button>
        <Button variant="outlined" fullWidth sx={{ mb: 2 }} component={Link} href="/partner">
          Join as Partner
        </Button>
      </Box>

      <List>
        {/* <ListItem disablePadding>
          <ListItemButton component={Link} href="/search">
            <SearchIcon sx={{ mr: 2 }} />
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem disablePadding>
          <ListItemButton component={Link} href="/packages">
            <ListItemText primary="Packages" />
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem disablePadding>
          <ListItemButton component={Link} href="/wanderlists">
            <ListItemText primary="Wanderlists" />
          </ListItemButton>
        </ListItem> */}
        {/* <ListItem disablePadding>
          <ListItemButton component={Link} href="/inquires">
            <ListItemText primary="Inquires" />
          </ListItemButton>
        </ListItem> */}
        <ListItem disablePadding>
          <ListItemButton onClick={handleDownloadClick}>
            <DownloadIcon sx={{ mr: 2 }} />
            <ListItemText primary="Download App" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemText primary="Dark Mode" />
          <Switch checked={isDarkMode} onChange={handleThemeToggle} color="primary" edge="end" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{
        borderBottom: "1px solid",
        borderColor: (theme) => theme.palette.divider,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderRadius: "0",
        boxShadow: "none",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
          {/* Logo */}
          <Box
            component={Link}
            href="/"
            sx={{
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="/zingvel_logo.png"
              alt="Zingvel Logo"
              sx={{
                height: isMobileOrTablet ? 30 : 40,
                maxWidth: "100%",
                objectFit: "contain",
              }}
            />
          </Box>

          {/* Middle section - Search bar (desktop) or empty space (mobile) */}
          {!isMobileOrTablet && (
            <Paper
              elevation={0}
              sx={{
                display: "flex",
                alignItems: "center",
                px: 2,
                py: 1,
                mx: 4,
                flexGrow: 1,
                maxWidth: 500,
                border: "1px solid",
                borderColor: "divider",
                textDecoration: "none",
                // backgroundColor: "red",
                borderRadius: "10",
                "&:hover": {
                  boxShadow: 1,
                },
                cursor: "pointer",
              }}
              component={Link}
              href="/search"
            >
              <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
              <Typography color="text.secondary">Search Mountain, Bali, Kasol ...</Typography>
            </Paper>
          )}

          {/* Mobile search icon and user icon */}
          {isMobileOrTablet ? (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                //  backgroundColor: "red",
                width: "100%",
              }}
            >
              {/* <IconButton component={Link} href="/search">
                <SearchIcon />
              </IconButton> */}

              <Box
                // elevation={0}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  px: 2,
                  py: 1,
                  mx: 4,
                  flexGrow: 1,
                  // maxWidth: 500,
                  border: "1px solid",
                  borderColor: "divider",
                  // backgroundColor: "red",
                  borderRadius: 2,
                  "&:hover": {
                    boxShadow: 1,
                  },
                  cursor: "pointer",
                }}
                component={Link}
                href="/search"
              >
                <SearchIcon sx={{ color: "text.secondary", mr: 1, fontSize: "16px" }} />
                <Typography
                  color="text.secondary"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "100%", fontSize: "1rem" }}
                >
                  Search ...
                </Typography>
              </Box>

              {/* <IconButton edge="end" color="inherit" aria-label="menu" onClick={() => router.push("/drawer")}>
                <PersonIcon />
              </IconButton> */}
              {/* <Button
                variant="outlined"
                color="primary"
                onClick={() => (isAuthenticated ? router.push("/profile") : setLoginDialogOpen(true))}
                sx={{
                  textTransform: "none",
                  color: "inherit",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  // borderRadius: 40,
                }}
              > */}
              {/* <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: "primary.main",
                  }}
                >
                   
                  <PersonIcon fontSize="small" />
                </Avatar> */}
              <Avatar
                sx={{
                  width: 35,
                  height: 35,
                  bgcolor: "primary.main",
                }}
                onClick={() => (isAuthenticated ? router.push("/profile") : setLoginDialogOpen(true))}
              >
                <PersonIcon fontSize="small" />
              </Avatar>
              {/* <Typography
                  color="text.secondary"
                  sx={{ textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap", maxWidth: "100%", fontSize: "1rem" }}
                >
                  {isAuthenticated ? "Profile" : "Login"}
                </Typography> */}
              {/* </Button> */}
            </Box>
          ) : (
            // Desktop navigation - Right section
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton onClick={() => router.push("/search")} sx={{ color: "inherit", mr: 1 }} aria-label="search">
                <SearchIcon />
              </IconButton> */}
              {/* Navigation items moved to SubNavigation component */}

              {/* User avatar with login/account button */}
              <Box sx={{ ml: 2, display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => (isAuthenticated ? router.push("/profile") : setLoginDialogOpen(true))}
                  sx={{
                    textTransform: "none",
                    color: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: "primary.main",
                    }}
                  >
                    <PersonIcon fontSize="small" />
                  </Avatar>
                  {isAuthenticated ? "Profile" : "Login"}
                </Button>
              </Box>
            </Box>
          )}
        </Toolbar>
      </Container>

      {/* Mobile drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        {drawer}
      </Drawer>

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onClose={() => setLoginDialogOpen(false)} />

      {/* Download App Dialog */}
      <DownloadAppDialog open={downloadDialogOpen} onClose={() => setDownloadDialogOpen(false)} />
    </AppBar>
  );
};

export default Header;
