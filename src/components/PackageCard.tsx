"use client";

import { Card, CardMedia, CardContent, Typography, Box, Chip, Rating, useTheme } from "@mui/material";
import { LocationOn as LocationIcon, AccessTime as TimeIcon } from "@mui/icons-material";
import Link from "next/link";
import { IPackageItem } from "@/interfaces/IPacakges";

interface IProps {
  packageData: IPackageItem;
}

const PackageCard = ({ packageData }: IProps) => {
  const theme = useTheme();

  // Format location string from location object
  const locationString = packageData?.location ? [packageData.location.city, packageData.location.country].filter(Boolean).join(", ") : "";

  // Format duration string
  const durationString = packageData?.duration ? `${packageData.duration.days} days / ${packageData.duration.nights} nights` : "";

  // Calculate discount percentage if applicable
  const hasDiscount = packageData?.salePrice < packageData?.regularPrice;
  const discountPercentage = hasDiscount ? Math.round(((packageData?.regularPrice - packageData?.salePrice) / packageData?.regularPrice) * 100) : 0;

  // Get the first image URL from media array or use a placeholder
  const imageUrl = packageData?.media && packageData?.media.length > 0 ? packageData.media[0].url : undefined;

  return (
    <Card
      component={Link}
      href={`/package/${packageData._id}`}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: theme.shadows[2],
        transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: theme.shadows[4],
        },
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

        {hasDiscount && discountPercentage > 0 && (
          <Chip
            label={`${discountPercentage}% OFF`}
            color="error"
            size="small"
            sx={{
              position: "absolute",
              top: 12,
              left: 12,
              fontWeight: "bold",
            }}
          />
        )}

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
            p: 2,
            pt: 3,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ color: "white", fontWeight: "bold" }}>
            {packageData.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <LocationIcon sx={{ color: "white", fontSize: "0.875rem", mr: 0.5, opacity: 0.9 }} />
            <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
              {locationString}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TimeIcon sx={{ color: "text.secondary", fontSize: "0.875rem", mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {durationString}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          {/* Use a default rating of 0 if not available */}
          <Rating value={0} precision={0.5} size="small" readOnly sx={{ mr: 1, color: theme.palette.primary.main }} />
          <Typography variant="body2" color="text.secondary">
            (0)
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", mt: 1 }}>
          <Typography variant="h6" component="span" color="primary" fontWeight="bold">
            ${packageData?.salePrice?.toLocaleString()}
          </Typography>
          {hasDiscount && (
            <Typography variant="body2" component="span" color="text.secondary" sx={{ ml: 1, textDecoration: "line-through" }}>
              ${packageData?.regularPrice?.toLocaleString()}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ ml: "auto" }}>
            per person
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
