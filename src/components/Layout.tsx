"use client";

import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import Header from "./Header";
import Footer from "./Footer";
import BottomNavigation from "./BottomNavigation";
import SubNavigation from "./SubNavigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <SubNavigation />
      <Container maxWidth="lg">
        <Box
          component="main"
          sx={{
            flex: "1 0 auto",
            display: "flex",
            flexDirection: "column",
            // Add padding at the bottom for mobile/tablet to account for bottom navigation
            pb: isMobileOrTablet ? "56px" : 0,
          }}
        >
          {children}
        </Box>
      </Container>
      {/* Show Footer on all devices */}
      <Footer />
      {/* Show BottomNavigation on mobile and tablet */}
      <BottomNavigation />
    </Box>
  );
};

export default Layout;
