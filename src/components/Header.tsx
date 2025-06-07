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
  Paper,
  Divider,
  Menu,
  MenuItem,
  Switch,
} from "@mui/material";
import {
  Close as CloseIcon,
  Search as SearchIcon,
  KeyboardArrowDown as ChevronDownIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  // GetApp as DownloadIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import Link from "next/link";
import { useThemeContext } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import LoginDialog from "./LoginDialog";
import { FONTS } from "@/utils/theme";

const Header = () => {
  const theme = useTheme();
  // const router = useRouter();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { mode, toggleTheme } = useThemeContext();
  const { isAuthenticated, logout } = useAuth();
  const isDarkMode = mode === "dark";

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
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
          <ListItemButton component={Link} href="/download">
            {/* <DownloadIcon sx={{ mr: 2 }} /> */}
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
                height: 40,
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
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <IconButton component={Link} href="/search" sx={{ mr: 1 }}>
                <SearchIcon />
              </IconButton>
              <IconButton edge="end" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <PersonIcon />
              </IconButton>
            </Box>
          ) : (
            // Desktop navigation - Right section
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <IconButton onClick={() => router.push("/search")} sx={{ color: "inherit", mr: 1 }} aria-label="search">
                <SearchIcon />
              </IconButton> */}
              <Button component={Link} href="/packages" sx={{ color: "inherit", mr: 1, fontFamily: FONTS.Ubuntu, fontSize: "0.875rem" }}>
                Packages
              </Button>
              <Button component={Link} href="/wanderlists" sx={{ color: "inherit", mr: 1, fontFamily: FONTS.Ubuntu, fontSize: "0.875rem" }}>
                Wanderlists
              </Button>
              <Button component={Link} href="/inquires" sx={{ color: "inherit", mr: 1, fontFamily: FONTS.Ubuntu, fontSize: "0.875rem" }}>
                Inquires
              </Button>

              {/* User avatar with dropdown */}
              <Box sx={{ ml: 2 }}>
                <Button
                  onClick={handleUserMenuOpen}
                  sx={{
                    textTransform: "none",
                    color: "inherit",
                  }}
                  endIcon={<ChevronDownIcon />}
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
                </Button>
                <Menu
                  anchorEl={userMenuAnchor}
                  open={Boolean(userMenuAnchor)}
                  onClose={handleUserMenuClose}
                  sx={{ mt: 1.5 }}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <MenuItem onClick={() => setLoginDialogOpen(true)}>
                    <Button variant="contained" fullWidth>
                      {isAuthenticated ? "My Account" : "Login / Sign Up"}
                    </Button>
                  </MenuItem>
                  <MenuItem href="/partner">
                    <Button variant="outlined" fullWidth>
                      Join as Partner
                    </Button>
                  </MenuItem>

                  <MenuItem component={Link} href="/download" onClick={handleUserMenuClose}>
                    {/* <DownloadIcon fontSize="small" sx={{ mr: 1 }} /> */}
                    Download App
                  </MenuItem>
                  <Divider />
                  <MenuItem onClick={handleThemeToggle}>
                    {isDarkMode ? (
                      <>
                        <LightModeIcon fontSize="small" sx={{ mr: 1 }} />
                        Light Theme
                      </>
                    ) : (
                      <>
                        <DarkModeIcon fontSize="small" sx={{ mr: 1 }} />
                        Dark Theme
                      </>
                    )}
                    <Switch checked={isDarkMode} onChange={handleThemeToggle} color="primary" size="small" sx={{ ml: "auto" }} />
                  </MenuItem>
                  {isAuthenticated && (
                    <MenuItem
                      onClick={() => {
                        handleUserMenuClose();
                        logout();
                      }}
                      sx={{
                        fontWeight: "bold",
                        color: "primary.main",
                      }}
                    >
                      Logout
                    </MenuItem>
                  )}
                </Menu>
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
    </AppBar>
  );
};

export default Header;
