"use client";

import { Box, Container, Button, useTheme, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { FONTS } from "@/utils/theme";

const SubNavigation = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

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
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              href="/option1"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 1
            </Button>
            <Button
              component={Link}
              href="/option2"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 2
            </Button>
            <Button
              component={Link}
              href="/option3"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 3
            </Button>
          </Box>

          {/* Right side navigation items */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Button
              component={Link}
              href="/option4"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 4
            </Button>
            <Button
              component={Link}
              href="/option5"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 5
            </Button>
            <Button
              component={Link}
              href="/option6"
              sx={{ 
                color: theme.palette.text.primary,
                fontFamily: FONTS.Ubuntu,
                fontSize: "0.8rem",
                fontWeight: 400,
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "transparent",
                  color: theme.palette.primary.main,
                }
              }}
            >
              Option 6
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default SubNavigation;
