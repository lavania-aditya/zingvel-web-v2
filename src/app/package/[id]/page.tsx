import { getPackageById } from "@/services/SPackage";
import { IPackageItem } from "@/interfaces/IPacakges";
import { notFound } from "next/navigation";
import { Box, Container, Typography, Paper, Chip, Rating } from "@mui/material";
import Image from "next/image";
import { Check, Close, LocationOn, CalendarMonth } from "@mui/icons-material";
import PackageDetailClient from "@/components/PackageDetailClient";

// Define the props for the page component
type Props = {
  params: {
    id: string;
  };
};

// Hide bottom bar for this page
export const metadata = {
  other: {
    hideBottomBar: true,
  },
};

export default async function PackageDetailPage({ params }: Props) {
  // Fetch package data server-side
  const packageData = await getPackageData(params.id);

  // If package not found, show 404 page
  if (!packageData) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Left side - Package details */}
        <Box sx={{ flex: "1 1 auto", maxWidth: { xs: "100%", md: "calc(66.666% - 16px)" } }}>
          {/* Package Header */}
          <Box mb={4}>
            <Typography variant="h4" component="h1" gutterBottom>
              {packageData.name}
            </Typography>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOn color="primary" />
              <Typography variant="subtitle1">
                {packageData.location.city}, {packageData.location.state}, {packageData.location.country}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={2}>
              <Box display="flex" alignItems="center">
                <Rating value={packageData.rating} readOnly precision={0.5} />
                <Typography variant="body2" ml={1}>
                  ({packageData.rating})
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <CalendarMonth fontSize="small" sx={{ mr: 0.5 }} />
                <Typography variant="body2">
                  {packageData.duration.days} Days / {packageData.duration.nights} Nights
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Package Images */}
          <Box mb={4}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
              {packageData.media && packageData.media.length > 0 ? (
                packageData.media.slice(0, 3).map((item, index) => (
                  <Box
                    key={item.mediaId}
                    sx={{
                      width: index === 0 ? "100%" : { xs: "100%", md: "calc(50% - 8px)" },
                      position: "relative",
                    }}
                  >
                    <Paper
                      sx={{
                        position: "relative",
                        height: index === 0 ? 400 : 200,
                        overflow: "hidden",
                        borderRadius: 2,
                      }}
                    >
                      <Image src={item.url} alt={`${packageData.name} - image ${index + 1}`} fill style={{ objectFit: "cover" }} />
                    </Paper>
                  </Box>
                ))
              ) : (
                <Box sx={{ width: "100%" }}>
                  <Paper
                    sx={{
                      height: 300,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "grey.200",
                    }}
                  >
                    <Typography variant="h6" color="text.secondary">
                      No images available
                    </Typography>
                  </Paper>
                </Box>
              )}
            </Box>
          </Box>

          {/* Price and Booking */}
          <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
            <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 3 }}>
              <Box sx={{ flex: "1 1 auto" }}>
                <Typography variant="h5" gutterBottom>
                  Package Overview
                </Typography>
                <Typography variant="body1" paragraph>
                  {packageData.description}
                </Typography>
              </Box>
              <Box sx={{ width: { xs: "100%", md: "33.333%" } }}>
                <Box sx={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "center" }}>
                  <Box mb={2}>
                    <Typography variant="h5" color="primary" fontWeight="bold">
                      ₹{packageData.salePrice}
                    </Typography>
                    {packageData.regularPrice > packageData.salePrice && (
                      <Typography variant="body1" sx={{ textDecoration: "line-through" }} color="text.secondary">
                        ₹{packageData.regularPrice}
                      </Typography>
                    )}
                    <Typography variant="body2" color="success.main">
                      {Math.round(((packageData.regularPrice - packageData.salePrice) / packageData.regularPrice) * 100)}% OFF
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary" mb={2}>
                    *Price per person on twin sharing basis
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>

          {/* Package Amenities */}
          {packageData.amenities && packageData.amenities.length > 0 && (
            <Box mb={4}>
              <Typography variant="h5" component="h2" gutterBottom>
                Amenities
              </Typography>
              <Box display="flex" flexWrap="wrap" gap={1}>
                {packageData.amenities.map((amenity, index) => (
                  <Chip key={index} label={amenity} variant="outlined" color="primary" />
                ))}
              </Box>
            </Box>
          )}

          {/* Package Itinerary */}
          {packageData.itinerary && packageData.itinerary.length > 0 && (
            <Box mb={4}>
              <Typography variant="h5" component="h2" gutterBottom>
                Itinerary
              </Typography>
              <Box>
                {packageData.itinerary.map((day, index) => (
                  <Paper
                    key={index}
                    sx={{
                      p: 3,
                      mb: 2,
                      borderRadius: 2,
                      borderLeft: 4,
                      borderColor: "primary.main",
                    }}
                  >
                    <Typography variant="h6" gutterBottom>
                      Day {index + 1}: {day?.description}
                    </Typography>
                    <Typography variant="body1">{day.description}</Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          )}

          {/* What's inside the package? */}
          <Box mb={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
                What&apos;s inside the package?
              </Typography>

              <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
                {/* Inclusions */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Inclusions
                  </Typography>
                  <Box>
                    {[...packageData.inclusions, ...packageData.customInclusions].map((item, index) => (
                      <Box key={index} display="flex" alignItems="flex-start" mb={1.5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "rgba(46, 204, 113, 0.1)",
                            width: 24,
                            height: 24,
                            mr: 1.5,
                          }}
                        >
                          <Check
                            sx={{
                              color: "success.main",
                              fontSize: 16,
                            }}
                          />
                        </Box>
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>

                {/* Exclusions */}
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight="bold" mb={2}>
                    Exclusions
                  </Typography>
                  <Box>
                    {[...packageData.exclusions, ...packageData.customExclusions].map((item, index) => (
                      <Box key={index} display="flex" alignItems="flex-start" mb={1.5}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            backgroundColor: "rgba(231, 76, 60, 0.1)",
                            width: 24,
                            height: 24,
                            mr: 1.5,
                          }}
                        >
                          <Close
                            sx={{
                              color: "error.main",
                              fontSize: 16,
                            }}
                          />
                        </Box>
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Box>

        {/* Right side - Inquiry form */}
        <PackageDetailClient packageData={packageData} />
      </Box>
    </Container>
  );
}

// Helper function to fetch package data
async function getPackageData(id: string): Promise<IPackageItem | null> {
  try {
    // The API returns the package data directly, not nested under a data property
    const response = await getPackageById(id);
    console.log("Package API response:", response);
    return response; // Return the direct response
  } catch (error) {
    console.error("Error fetching package data:", error);
    return null;
  }
}
