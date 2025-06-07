"use client";

import { Box, Button, Container, Typography, Card, CardContent, CardMedia, Chip, useTheme, useMediaQuery } from "@mui/material";
import {
  LocationOn as LocationIcon,
  Star as StarIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  DirectionsCar as CarIcon,
  Restaurant as FoodIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import CategoryBar from "@/components/CategoryBar";
import PackageCard from "@/components/PackageCard";
import Link from "next/link";
import { categoriesData } from "@/dummyData";

export default function Home() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // Sample data for featured destinations
  const featuredDestinations = [
    {
      name: "Paris",
      country: "France",
      description: "The city of lights and love",
      rating: 4.8,
      image: "#fca21a", // Placeholder color using our primary color
    },
    {
      name: "Bali",
      country: "Indonesia",
      description: "Tropical paradise with stunning beaches",
      rating: 4.7,
      image: "#2196f3", // Placeholder color using our secondary color
    },
    {
      name: "Tokyo",
      country: "Japan",
      description: "Modern metropolis with rich culture",
      rating: 4.9,
      image: "#4caf50", // Placeholder color
    },
  ];

  // Sample data for travel categories
  // const travelCategories = [
  //   { name: "Flights", icon: <FlightIcon />, color: "#fca21a" },
  //   { name: "Hotels", icon: <HotelIcon />, color: "#2196f3" },
  //   { name: "Cars", icon: <CarIcon />, color: "#4caf50" },
  //   { name: "Food", icon: <FoodIcon />, color: "#f44336" },
  // ];

  // Sample package data
  const packages = [
    {
      id: 1,
      title: "Bali Beach Retreat",
      location: "Bali, Indonesia",
      duration: "7 days",
      price: 1299,
      rating: 4.8,
      reviewCount: 245,
      discount: 15,
    },
    {
      id: 2,
      title: "Paris City Explorer",
      location: "Paris, France",
      duration: "5 days",
      price: 1499,
      rating: 4.5,
      reviewCount: 187,
    },
    {
      id: 3,
      title: "Tokyo Adventure",
      location: "Tokyo, Japan",
      duration: "8 days",
      price: 2199,
      rating: 4.9,
      reviewCount: 312,
      discount: 10,
    },
    {
      id: 4,
      title: "New York City Break",
      location: "New York, USA",
      duration: "4 days",
      price: 1099,
      rating: 4.6,
      reviewCount: 156,
    },
    {
      id: 5,
      title: "Swiss Alps Hiking",
      location: "Interlaken, Switzerland",
      duration: "6 days",
      price: 1799,
      rating: 4.7,
      reviewCount: 203,
      discount: 5,
    },
  ];

  return (
    <Box sx={{ pb: { xs: 2, sm: 4 } }}>
      {/* Sticky Category Bar */}
      <CategoryBar categoriesData={categoriesData} />

      {/* Package Categories */}
      <Container sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Package Categories
          </Typography>
          <Button component={Link} href="/package-categories" size="small" color="primary" endIcon={<ChevronRightIcon />}>
            View All
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2.5,
            overflowX: "auto",
            pb: 2,
            mx: -2,
            px: 2,
            // Hide scrollbar but keep functionality
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {packages.map((pkg) => (
            <Box
              key={pkg.id}
              sx={{
                width: {
                  xs: "calc(100% - 16px)", // Mobile: 1 per row
                  sm: "calc(50% - 20px)", // Tablet: 2 per row
                  md: "calc(31% - 20px)", // Desktop: ~3.2 per row
                },
                minWidth: {
                  xs: "calc(100% - 16px)",
                  sm: "calc(50% - 20px)",
                  md: "calc(31% - 20px)",
                },
                flexShrink: 0,
              }}
            >
              <PackageCard {...pkg} />
            </Box>
          ))}
        </Box>
      </Container>

      {/* Featured Destinations - App Style */}
      <Container sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Popular Destinations
          </Typography>
          <Button size="small" color="primary">
            View All
          </Button>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            pb: 1,
            // Hide scrollbar but keep functionality
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {featuredDestinations.map((destination) => (
            <Card
              key={destination.name}
              sx={{
                minWidth: { xs: 260, sm: 280 },
                maxWidth: { xs: 260, sm: 280 },
                borderRadius: 3,
                flexShrink: 0,
                overflow: "hidden",
              }}
            >
              <CardMedia
                sx={{
                  height: 160,
                  backgroundColor: destination.image,
                  position: "relative",
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    bgcolor: "rgba(255,255,255,0.9)",
                    borderRadius: 5,
                    px: 1,
                    py: 0.5,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <StarIcon sx={{ color: theme.palette.primary.main, fontSize: 18, mr: 0.5 }} />
                  <Typography variant="caption" fontWeight="bold">
                    {destination.rating}
                  </Typography>
                </Box>
              </CardMedia>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="h6" component="h3" gutterBottom>
                      {destination.name}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <LocationIcon sx={{ fontSize: 16, color: "text.secondary", mr: 0.5 }} />
                      <Typography variant="body2" color="text.secondary">
                        {destination.country}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label="Popular"
                    size="small"
                    sx={{
                      bgcolor: `${theme.palette.primary.main}20`,
                      color: theme.palette.primary.main,
                      fontWeight: 500,
                    }}
                  />
                </Box>
                <Button variant="contained" fullWidth sx={{ mt: 2, borderRadius: 2 }}>
                  Explore
                </Button>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Special Offers Section */}
      <Container sx={{ mb: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
          <Typography variant="h6" component="h2" fontWeight="bold">
            Special Offers
          </Typography>
          <Button size="small" color="primary">
            View All
          </Button>
        </Box>

        <Card
          sx={{
            borderRadius: 3,
            overflow: "hidden",
            position: "relative",
            height: 180,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: theme.palette.primary.main,
              backgroundImage: `linear-gradient(45deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              p: 3,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Chip
              label="Limited Time"
              size="small"
              sx={{
                bgcolor: "rgba(255,255,255,0.9)",
                color: theme.palette.primary.main,
                fontWeight: 500,
                mb: 2,
                alignSelf: "flex-start",
              }}
            />
            <Typography variant="h5" component="h3" color="white" fontWeight="bold" gutterBottom>
              30% Off Summer Packages
            </Typography>
            <Typography variant="body2" color="white" sx={{ mb: 2, opacity: 0.9 }}>
              Book by June 30th for special discounts
            </Typography>
            <Button
              variant="contained"
              sx={{
                alignSelf: "flex-start",
                bgcolor: "white",
                color: theme.palette.primary.main,
                "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
              }}
            >
              Book Now
            </Button>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
