"use client";

import { Box, Container, Typography, Stack, Link as MuiLink, Divider, IconButton, useMediaQuery } from "@mui/material";
import Link from "next/link";
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  YouTube as YouTubeIcon,
  Favorite as HeartIcon,
} from "@mui/icons-material";
import theme from "@/utils/theme";

const Footer = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const currentYear = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: "#2A2E33",
        color: "white",
        marginTop: 15,
        paddingBottom: isMobileOrTablet ? "10rem" : "4rem",
      }}
    >
      {/* Main footer content */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            gap: 4,
            mb: 4,
            bgcolor: "white",
            borderRadius: 2,
            p: { xs: 3, md: 5 },
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
            marginTop: -15,
          }}
        >
          {/* Quick Links Column */}
          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <Typography variant="h6" fontWeight="bold" color="#2A2E33" gutterBottom>
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <MuiLink component={Link} href="/terms-and-conditions" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                Terms & Conditions
              </MuiLink>
              <MuiLink component={Link} href="/privacy-policy" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                Privacy Policy
              </MuiLink>
              <MuiLink component={Link} href="/faq" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                FAQ
              </MuiLink>
              <MuiLink component={Link} href="/about" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                About Us
              </MuiLink>
              <MuiLink component={Link} href="/contact-us" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                Contact Us
              </MuiLink>
              <MuiLink component={Link} href="/partner" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                Partner With Us
              </MuiLink>
              <MuiLink component={Link} href="/support" underline="hover" color="text.primary" sx={{ fontSize: "0.875rem" }}>
                Support
              </MuiLink>
            </Stack>
          </Box>

          {/* Travel Destinations Column */}
          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <Typography sx={{ color: "black" }}>
              Made with <HeartIcon /> by Zingvel
            </Typography>
          </Box>

          {/* Contact Info Column */}
          <Box sx={{ width: { xs: "100%", md: "33%" } }}>
            <Typography variant="h6" fontWeight="bold" color="#2A2E33" gutterBottom>
              Contact Info
            </Typography>
            <Stack spacing={2}>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="#2A2E33">
                  Address:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Noida, Uttar Pradesh, India
                </Typography>
              </Box>

              <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="#2A2E33">
                  Reach Us:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: support@zingvel.com
                  <br />
                  Phone: +91-9457234349
                  <br />
                  Hours: All days: 9 am to 9 pm
                </Typography>
              </Box>

              {/* <Box>
                <Typography variant="subtitle2" fontWeight="bold" color="#2A2E33">
                  Business Inquiries:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: support@zingvel.com
                  <br />
                  Phone: +91 98765 43211
                </Typography>
              </Box> */}
            </Stack>
          </Box>
        </Box>

        {/* <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {currentYear} Zingvel. All rights reserved.
          </Typography>
        </Box> */}
      </Container>

      {/* Logo and social links */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        <Box
          component="img"
          src="/zingvel_logo.png"
          alt="Zingvel Logo"
          sx={{
            height: 40,
            mb: 2,
            maxWidth: "100%",
            objectFit: "contain",
            filter: "brightness(0) invert(1)", // Make logo white
          }}
        />

        <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
          {[
            { icon: <FacebookIcon />, href: "https://facebook.com/zingvel" },
            { icon: <InstagramIcon />, href: "https://instagram.com/zingvel" },
            { icon: <TwitterIcon />, href: "https://twitter.com/zingvel" },
            { icon: <LinkedInIcon />, href: "https://linkedin.com/company/zingvel" },
            { icon: <YouTubeIcon />, href: "https://youtube.com/zingvel" },
          ].map((social, index) => (
            <IconButton
              key={index}
              component="a"
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: "rgba(255,255,255,0.7)",
                bgcolor: "rgba(255,255,255,0.1)",
                "&:hover": {
                  bgcolor: "rgba(255,255,255,0.2)",
                  color: "white",
                },
              }}
            >
              {social.icon}
            </IconButton>
          ))}
        </Box>

        <Divider sx={{ borderColor: "rgba(255,255,255,0.1)", mb: 3 }} />

        <Typography variant="caption" color="rgba(255,255,255,0.7)">
          {currentYear} Zingvel.com All rights reserved.
        </Typography>

        <Typography
          variant="caption"
          color="rgba(255,255,255,0.5)"
          sx={{ display: "block", mt: 1, fontSize: "0.7rem", maxWidth: "800px", mx: "auto" }}
        >
          The content and images used on this site are copyright protected and copyrights vests with the respective owners. The usage of the content
          and images on this website is intended to promote the works and no endorsement of the artist shall be implied. Unauthorized use is
          prohibited and punishable by law.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
