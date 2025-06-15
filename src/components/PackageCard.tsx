"use client";

import { Card, CardMedia, CardContent, Typography, Box, useTheme, Button, Divider } from "@mui/material";
import { Check as CheckIcon, Star as StarIcon, Share as ShareIcon } from "@mui/icons-material";
import MediaFallback from "./MediaFallback";
import Link from "next/link";
import { IPackageItem } from "@/interfaces/IPacakges";
import { FONTS } from "@/utils/theme";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import LoginDialog from "./LoginDialog";

interface IProps {
  packageData: IPackageItem;
}

const PackageCard = ({ packageData }: IProps) => {
  const theme = useTheme();
  const [loginDialogOpen, setLoginDialogOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Format location string from location object
  const locationString = packageData?.location ? [packageData.location.city, packageData.location.country].filter(Boolean).join(", ") : "";

  // Calculate discount percentage
  const hasDiscount = packageData?.salePrice && packageData?.regularPrice && packageData.salePrice < packageData.regularPrice;
  const discountPercentage = hasDiscount ? Math.round(((packageData.regularPrice - packageData.salePrice) / packageData.regularPrice) * 100) : 0;

  // Get the first image URL from media array or use a placeholder
  const imageUrl = packageData?.media && packageData?.media.length > 0 ? packageData.media[0].url : undefined;

  // Extract key features for highlights (from inclusions or custom data)
  const highlights = packageData?.inclusions?.slice(0, 3) || ["3 Star Hotels", "Airport Pickup & Drop", "Selected Meals"];

  // Handle click for "I am interested" button
  const handleInterestClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to package detail page

    if (isAuthenticated) {
      // User is logged in, show success toast and log details
      showToast("Thank you for your interest!", "success");
      console.log("User ID:", user?.id, "Package ID:", packageData._id);
      // Here you would call your API to register interest
    } else {
      // User is not logged in, open login dialog
      setLoginDialogOpen(true);
    }
  };

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(`${window.location.origin}/package/${packageData._id}`);
      showToast("Link copied to clipboard", "success");
    }
  };

  // Handle login dialog close
  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);

    // Check if user is now authenticated after closing the dialog
    if (isAuthenticated) {
      showToast("Thank you for your interest!", "success");
      console.log("User ID:", user?.id, "Package ID:", packageData._id);
    }
  };

  return (
    <>
      <Card
        sx={{
          borderRadius: 2,
          overflow: "hidden",
          boxShadow: theme.shadows[1],
          height: "100%",
          display: "flex",
          flexDirection: "column",
          color: "inherit",
        }}
      >
        {/* Card content as a link to package detail page */}
        <Box
          component={Link}
          href={`/package/${packageData._id}`}
          sx={{
            textDecoration: "none",
            color: "inherit",
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <Box sx={{ position: "relative", height: 200 }}>
            {imageUrl ? (
              <CardMedia
                component="div"
                sx={{
                  height: 200,
                  backgroundImage: `url(${imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />
            ) : (
              <MediaFallback height={200} />
            )}

            {/* Share button */}
            <Box
              onClick={handleShareClick}
              sx={{
                display: "flex",
                alignItems: "center",
                p: 1,
                borderRadius: 2,
                position: "absolute",
                top: 10,
                right: 10,
                fontWeight: "bold",
                backgroundColor: theme.palette.common.white,
                opacity: 0.9,
                borderColor: theme.palette.primary.main,
                borderWidth: 1,
              }}
            >
              <ShareIcon fontSize="medium" sx={{ color: theme.palette.primary.main }} />
            </Box>

            {/* Discount badge removed as requested */}
            
            {/* Overlay at the bottom of the image with days and rating */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0) 100%)",
                color: "white",
                p: 1.5,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {/* Days/Nights */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "white" }}>
                  {packageData.duration?.days || "N/A"}D / {packageData.duration?.nights || "N/A"}N
                </Typography>
              </Box>
              
              {/* Rating */}
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <StarIcon sx={{ color: "#FFD700", fontSize: "1rem", mr: 0.5 }} />
                <Typography variant="body2" sx={{ fontWeight: "bold", color: "white" }}>
                  {packageData.rating || "4.5"}
                </Typography>
              </Box>
            </Box>
          </Box>

          <CardContent sx={{ flexGrow: 1, p: 2, pb: 1 }}>
            {/* Package name */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Typography
                variant="h6"
                component="h3"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  mb: 0.5,
                  fontFamily: FONTS.heading,
                  lineHeight: 1.2,
                }}
              >
                {packageData.name}
              </Typography>
            </Box>

            {/* Itinerary summary */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.8rem",
                fontFamily: FONTS.heading,
                mb: 1,
              }}
            >
              {locationString || "2N Munnar • 1N Thekkady • 1N Alleppey"}
            </Typography>
            {/* Highlights - more compact */}

            {highlights.length > 2 && (
              <>
                <Divider sx={{ my: 1 }} />

                <Box sx={{ mb: 1 }}>
                  {highlights.slice(0, 2).map((item, index) => (
                    <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.3 }}>
                      <CheckIcon sx={{ color: "#2e7d32", fontSize: "0.8rem", mr: 0.5 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          color: theme.palette.text.primary,
                          fontSize: "0.8rem",
                          lineHeight: 1.2,
                        }}
                      >
                        {item}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </>
            )}
          </CardContent>

          {/* Price section - optimized to single row */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
              // bgcolor: "#f9f9f9",
              py: 1.2,
              px: 2,
              borderTop: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h4" color={theme.palette.common.black} sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                {`₹ ${packageData?.salePrice?.toLocaleString() || "N/A"}`}
              </Typography>
              <Typography variant="subtitle2" color={theme.palette.common.black} sx={{ ml: 0.5 }}>
                / person
              </Typography>
            </Box>

            {hasDiscount && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="subtitle2" color={theme.palette.common.black} sx={{ textDecoration: "line-through" }}>
                  ₹{packageData?.regularPrice?.toLocaleString() || "N/A"}
                </Typography>
                <Typography variant="subtitle1" color={theme.palette.primary.main} sx={{ fontWeight: "bold", ml: 0.5 }}>
                  {discountPercentage}% OFF
                </Typography>
              </Box>
            )}
          </Box>
          {/* <Box sx={{ bgcolor: "#f9f9f9", py: 1.2, px: 2, borderTop: "1px solid", borderColor: "divider" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <Typography variant="h6" color="primary.main" sx={{ fontWeight: "bold", fontSize: "1.1rem" }}>
                  ₹{packageData?.salePrice?.toLocaleString() || "18,224"}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ ml: 0.5 }}>
                  /person
                </Typography>
              </Box>

              {hasDiscount && (
                <Box sx={{ display: "flex", alignItems: "center", ml: 1.5 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through", fontSize: "0.8rem" }}>
                    ₹{packageData?.regularPrice?.toLocaleString()}
                  </Typography>
                  <Typography variant="caption" color="error.main" sx={{ fontWeight: "bold", ml: 0.5 }}>
                    {discountPercentage}% OFF
                  </Typography>
                </Box>
              )}
            </Box>
          </Box> */}
        </Box>

        {/* CTA Buttons */}
        <Box sx={{ display: "flex", gap: 1, px: 2, pb: 1.5 }}>
          {/* WhatsApp Button */}
          <Button
            variant="outlined"
            sx={{
              // minWidth: "auto",
              // width: 50,
              // height: 50,
              borderRadius: 2,
              border: "1px solid #e0e0e0",
              p: 0,
              "&:hover": {
                border: "1px solid #e0e0e0",
                bgcolor: "rgba(0, 0, 0, 0.04)",
              },
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#25D366">
              <path d="M17.6 6.32A7.85 7.85 0 0 0 12.05 4c-4.38 0-7.93 3.56-7.93 7.93a7.9 7.9 0 0 0 1.07 3.98L4 20l4.17-1.09a7.9 7.9 0 0 0 3.79.96h.01c4.38 0 7.93-3.56 7.93-7.94 0-2.12-.82-4.11-2.3-5.61zm-5.55 12.17h-.01a6.57 6.57 0 0 1-3.35-.92l-.24-.14-2.48.65.66-2.42-.16-.25a6.57 6.57 0 0 1-1-3.48c0-3.64 2.96-6.6 6.6-6.6a6.56 6.56 0 0 1 4.66 1.93 6.56 6.56 0 0 1 1.93 4.67c0 3.64-2.97 6.6-6.6 6.6zm3.61-4.94c-.2-.1-1.18-.58-1.36-.65-.18-.07-.32-.1-.45.1-.13.2-.5.65-.62.78-.11.13-.23.15-.43.05-.2-.1-.84-.31-1.6-.99-.59-.53-.99-1.18-1.1-1.38-.12-.2-.01-.31.09-.41.09-.09.2-.23.3-.35.1-.12.13-.2.2-.34.07-.13.03-.25-.02-.35-.05-.1-.45-1.08-.62-1.48-.16-.39-.33-.33-.45-.34-.11-.01-.25-.01-.38-.01-.13 0-.34.05-.52.25-.18.2-.68.67-.68 1.63 0 .96.7 1.9.8 2.03.1.13 1.4 2.13 3.38 2.99.47.2.84.32 1.13.41.48.15.9.13 1.24.08.38-.06 1.17-.48 1.33-.94.17-.46.17-.86.12-.94-.05-.08-.19-.13-.4-.23z" />
            </svg>
          </Button>

          {/* I am Interested Button */}
          <Button
            fullWidth
            variant="outlined"
            color="primary"
            onClick={handleInterestClick}
            // disabled={isInterested}
            sx={{
              color: theme.palette.primary.main,
              fontWeight: "bold",
              fontFamily: FONTS.heading,
            }}
          >
            REQUEST CALLBACK
          </Button>
        </Box>
      </Card>

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
    </>
  );
};

export default PackageCard;
