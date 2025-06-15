"use client";

import { Box, Container, Typography, Stack, Link as MuiLink, Divider, IconButton, useMediaQuery } from "@mui/material";
import Link from "next/link";
import { Favorite as HeartIcon } from "@mui/icons-material";
import Image from "next/image";
import theme from "@/utils/theme";

const Footer = () => {
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down("md"));

  const currentYear = new Date().getFullYear();
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: theme.palette.secondary.main,
        color: "white",
        // marginTop: 15,
        paddingBottom: isMobileOrTablet ? "8rem" : "4rem",
        mt: 20,
      }}
    >
      {/* Main footer content */}
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",

            justifyContent: "space-between",
            gap: 4,
            mb: 4,
            mt: -20,
            bgcolor: "white",
            borderRadius: 2,
            p: { xs: 3, md: 5 },
            boxShadow: `0px 4px 20px ${theme.palette.secondary.main}`,
            // marginTop: -15,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              justifyContent: "space-between",
              gap: 2,
              // mb: 4,
              // mt: -20,
              // bgcolor: "white",
              // borderRadius: 2,
              // p: { xs: 3, md: 5 },
              // boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
              // marginTop: -15,
            }}
          >
            {/* Quick Links Column */}
            <Box sx={{ width: { xs: "100%", md: "33%" } }}>
              <Box display="flex" alignItems="center" justifyContent="flex-start" gap={1} sx={{ mb: 4 }}>
                <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                  Made with
                </Typography>
                <HeartIcon sx={{ color: theme.palette.error.light }} />
                <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                  by
                </Typography>
                <Typography variant="h6" sx={{ color: theme.palette.secondary.main }}>
                  Zingvel
                </Typography>
              </Box>
              {/* <Box
              component="img"
              src="/zingvel_logo.png"
              alt="Zingvel Logo"
              sx={{
                height: 40,
                mb: 2,
                maxWidth: "100%",
                objectFit: "contain",
                // filter: "brightness(0) invert(1)", // Make logo white
              }}
            /> */}
              <Typography variant="subtitle2" sx={{ color: theme.palette.grey[400], textAlign: "left", my: 2, flexGrow: 1 }}>
                Discover and book travel packages, tours, and custom itineraries to destinations worldwide. Plan your perfect trip with Zingvel.
              </Typography>
              {/* <Typography sx={{ color: "black" }}>For any inquiries, please contact us at support@zingvel.com or +91 9457234349.</Typography> */}
              <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}>
                {[
                  { icon: "/icons/facebook_icon.svg", href: "https://facebook.com/zingvel", alt: "Facebook" },
                  { icon: "/icons/instagram_icon.svg", href: "https://instagram.com/zingvel", alt: "Instagram" },
                  { icon: "/icons/x_icon.svg", href: "https://twitter.com/zingvel", alt: "X" },
                  { icon: "/icons/youtube_icon.svg", href: "https://youtube.com/zingvel", alt: "YouTube" },
                  { icon: "/icons/whatsapp.svg", href: "https://wa.me/919457234349", alt: "WhatsApp" },
                ].map((social, index) => (
                  <IconButton key={index} component="a" href={social.href} target="_blank" rel="noopener noreferrer" size="large">
                    <Image src={social.icon} alt={social.alt} width={35} height={35} />
                  </IconButton>
                ))}
              </Box>
            </Box>

            {/* Travel Destinations Column */}
            <Box sx={{ width: { xs: "100%", md: "33%", textAlign: { xs: "left", md: "center" } } }}>
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
              </Stack>
            </Box>
          </Box>

          {/* <Box mt={5}>
          <Typography variant="body2" color="text.secondary" align="center">
            {currentYear} Zingvel. All rights reserved.
          </Typography>
        </Box> */}
          <Box
            sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, mt: 1, gap: 2, justifyContent: "space-between", alignItems: "center" }}
          >
            <Box
              component="a"
              href="https://apps.apple.com/app/zingvel"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: `1px solid ${theme.palette.secondary.main}`,
                borderStyle: "dashed",
                borderRadius: 2,
                p: 1,
                display: "flex",
                // flexDirection: { xs: "column", md: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                flex: 1,
                width: "100%",
                textDecoration: "none",
              }}
            >
              <Image src="/icons/apple_icon.svg" alt="App Store" width={40} height={40} />
              <Typography variant="body2" sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>
                Download our iOS App
              </Typography>
            </Box>
            <Box
              component="a"
              href="https://play.google.com/store/apps/details?id=com.zingvel.app"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                border: `1px solid ${theme.palette.secondary.main}`,
                borderStyle: "dashed",
                borderRadius: 2,
                p: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
                flex: 1,
                width: "100%",
                textDecoration: "none",
              }}
            >
              <Image src="/icons/play_store_icon.svg" alt="Play Store" width={40} height={40} />
              <Typography variant="body2" sx={{ color: theme.palette.secondary.main, fontWeight: "bold" }}>
                {/* <DownloadIcon sx={{ color: theme.palette.secondary.main, fontSize: "1rem" }} /> */}
                Download our Android App
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Logo and social links */}
      <Container maxWidth="lg" sx={{ textAlign: "center", mt: 4 }}>
        {/* <Box display="flex" alignItems="center" justifyContent="center" gap={1} sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ color: theme.palette.common.white }}>
            Made with
          </Typography>
          <HeartIcon sx={{ color: theme.palette.error.light }} />
          <Typography variant="h6" sx={{ color: theme.palette.common.white }}>
            by
          </Typography>
          <Typography variant="h6" sx={{ color: theme.palette.primary.main }}>
            Zingvel
          </Typography>
        </Box> */}

        <Box
          component="img"
          src="/zingvel_logo.png"
          alt="Zingvel Logo"
          sx={{
            height: 40,
            mb: 2,
            maxWidth: "100%",
            objectFit: "contain",
          }}
        />

        <Typography variant="subtitle2" color={theme.palette.grey[300]}>
          &copy; {currentYear} Zingvel.com All rights reserved.
        </Typography>

        <Divider sx={{ borderColor: theme.palette.grey[300], my: 2 }} />

        <Typography
          variant="caption"
          color={theme.palette.grey[300]}
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
