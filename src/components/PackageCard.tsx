"use client";

import { Card, CardMedia, CardContent, Typography, Box, Chip, useTheme, Button, Divider } from "@mui/material";
import { Check as CheckIcon, Star as StarIcon } from "@mui/icons-material";
import Link from "next/link";
import { IPackageItem } from "@/interfaces/IPacakges";
import { FONTS } from "@/utils/theme";
import { useState } from "react";

interface IProps {
  packageData: IPackageItem;
}

const PackageCard = ({ packageData }: IProps) => {
  const theme = useTheme();
  const [isInterested, setIsInterested] = useState(false);

  // Format location string from location object
  const locationString = packageData?.location ? [packageData.location.city, packageData.location.country].filter(Boolean).join(", ") : "";

  // Format duration string
  const durationString = packageData?.duration ? `${packageData.duration.days}D/${packageData.duration.nights}N` : "";

  // Calculate discount percentage if applicable
  const hasDiscount = packageData?.salePrice < packageData?.regularPrice;
  const discountPercentage = hasDiscount ? Math.round(((packageData?.regularPrice - packageData?.salePrice) / packageData?.regularPrice) * 100) : 0;
  const discountAmount = hasDiscount ? packageData?.regularPrice - packageData?.salePrice : 0;

  // Get the first image URL from media array or use a placeholder
  const imageUrl = packageData?.media && packageData?.media.length > 0 ? packageData.media[0].url : undefined;

  // Extract key features for highlights (from inclusions or custom data)
  const highlights = packageData?.inclusions?.slice(0, 3) || ["3 Star Hotels", "Airport Pickup & Drop", "Selected Meals"];

  // Handle click for "I am interested" button
  const handleInterestClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation to package detail page
    setIsInterested(true);
    // Add your callback or modal opening logic here
    console.log("Interested in package:", packageData._id);
  };

  return (
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
        <Box sx={{ position: "relative" }}>
          <CardMedia
            component="div"
            sx={{
              height: 200,
              backgroundColor: imageUrl ? "transparent" : theme.palette.primary.main,
              backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Promo tag - either discount or special offer */}
          {/* {packageData?.rating && ( */}
          {/* <Chip
            // label={hasDiscount ? `SAVE ₹${discountAmount.toLocaleString()}` : "Book Now@₹1"}
            label={packageData?.rating}
            color="primary"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: "bold",
              backgroundColor: theme.palette.mode === "dark" ? "primary.main" : "#8c52ff",
              color: "white",
              borderRadius: "16px",
            }}
          /> */}

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "primary.main",
              color: "white",
              px: 0.8,
              py: 0.2,
              borderRadius: 5,
              mr: 1,
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: "bold",
              // backgroundColor: theme.palette.mode === "dark" ? "primary.main" : "#8c52ff",
              // color: "white",
              // borderRadius: "16px",
            }}
          >
            <Typography variant="body2" sx={{ fontWeight: "bold", mr: 0.5 }}>
              {packageData?.rating || 4.9}
            </Typography>
            <StarIcon sx={{ fontSize: "0.9rem" }} />
          </Box>
          {/* )} */}

          {/* Duration badge */}
          <Chip
            label={durationString || "4N/5D"}
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              right: 12,
              fontWeight: "bold",
              backgroundColor: "white",
              color: "text.primary",
              border: "1px solid",
              borderColor: "divider",
            }}
          />
        </Box>

        <CardContent sx={{ flexGrow: 1, p: 2 }}>
          {/* Package name */}
          <Typography
            variant="h6"
            component="h3"
            sx={{
              fontWeight: "bold",
              fontSize: "1.1rem",
              mb: 1,
              fontFamily: FONTS.Ubuntu,
            }}
          >
            {packageData.name}
          </Typography>

          {/* Itinerary summary */}
          <Box sx={{ display: "flex", mb: 2 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                fontSize: "0.85rem",
                fontFamily: FONTS.Ubuntu,
              }}
            >
              {locationString || "2N Munnar • 1N Thekkady • 1N Alleppey"}
            </Typography>
          </Box>

          <Divider sx={{ my: 1.5 }} />

          {/* Highlights */}
          <Box sx={{ mb: 2 }}>
            {highlights.map((item, index) => (
              <Box key={index} sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                <CheckIcon sx={{ color: "#2e7d32", fontSize: "0.9rem", mr: 1 }} />
                <Typography
                  variant="body2"
                  sx={{
                    color: theme.palette.text.primary,
                    fontSize: "0.85rem",
                  }}
                >
                  {item}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Rating */}
          {/* <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <Box 
              sx={{ 
                display: "flex", 
                alignItems: "center", 
                bgcolor: "#2e7d32", 
                color: "white", 
                px: 0.8, 
                py: 0.2, 
                borderRadius: 1,
                mr: 1,
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold", mr: 0.5 }}>
                {packageData?.rating || 4.9}
              </Typography>
              <StarIcon sx={{ fontSize: "0.9rem" }} />
            </Box>
            <Typography variant="body2" color="text.secondary">
              ({packageData?.rating ? "523" : "0"})
            </Typography>
          </Box> */}
        </CardContent>

        {/* Price section */}
        <Box sx={{ bgcolor: "#f9f9f9", p: 2, borderTop: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Box>
              <Typography variant="h6" color="primary.main" sx={{ fontWeight: "bold" }}>
                ₹{packageData?.salePrice?.toLocaleString() || "18,224"}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Total Price ₹{(packageData?.salePrice * 2)?.toLocaleString() || "36,448"}
              </Typography>
            </Box>
            {hasDiscount && (
              <Box sx={{ textAlign: "right" }}>
                <Typography variant="body2" color="text.secondary" sx={{ textDecoration: "line-through" }}>
                  ₹{packageData?.regularPrice?.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="error.main" sx={{ fontWeight: "bold" }}>
                  {discountPercentage}% OFF
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Box>

      {/* Interest CTA Button */}
      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleInterestClick}
        disabled={isInterested}
        sx={{
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          py: 1.2,
          fontWeight: "bold",
          textTransform: "none",
          fontSize: "1rem",
          fontFamily: FONTS.Ubuntu,
        }}
      >
        {isInterested ? "Thank you for your interest" : "I am interested"}
      </Button>
    </Card>
  );
};

export default PackageCard;
