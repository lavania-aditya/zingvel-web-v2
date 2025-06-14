import { getWanderlistByIdService } from "@/services/SWanderlist";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import { notFound } from "next/navigation";
import { Box, Container, Typography, Paper } from "@mui/material";
import Image from "next/image";
import { LocationOn, CalendarMonth, Person, AccessTime } from "@mui/icons-material";
import WanderlistDetailWrapper from "@/components/WanderlistDetailWrapper";
import TruncatedDescription from "@/components/TruncatedDescription";

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

export default async function WanderlistDetailPage({ params }: Props) {
  // Fetch wanderlist data server-side
  const wanderlistData = await getWanderlistData(params.id);

  // If wanderlist not found, show 404 page
  if (!wanderlistData) {
    notFound();
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Full-width image section */}
      <Box mb={4}>
        <Paper
          sx={{
            position: "relative",
            height: 500,
            overflow: "hidden",
            borderRadius: 2,
            width: "100%",
          }}
        >
          {wanderlistData.city?.heroImage ? (
            <Image src={wanderlistData.city.heroImage} alt={wanderlistData.city?.city || "City Image"} fill style={{ objectFit: "cover" }} />
          ) : (
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "grey.200",
              }}
            >
              <Typography variant="h6" color="text.secondary">
                No image available
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>

      <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
        {/* Left side - Wanderlist details */}
        <Box sx={{ flex: "1 1 auto", maxWidth: { xs: "100%", md: "calc(66.666% - 16px)" } }}>
          {/* Full-width overview section */}
          <Box mb={4}>
            <Paper elevation={2} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h4" component="h1">
                  {wanderlistData.name}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={1} mb={2}>
                <LocationOn color="primary" />
                <Typography variant="subtitle1">
                  {wanderlistData.city?.city}, {wanderlistData.city?.state}, {wanderlistData.city?.country}
                </Typography>
              </Box>

              <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
                <Box display="flex" alignItems="center">
                  <CalendarMonth fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">Travel Date: {new Date(wanderlistData.travelDate).toLocaleDateString()}</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <AccessTime fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{wanderlistData.numberOfDays} Days</Typography>
                </Box>
                <Box display="flex" alignItems="center">
                  <Person fontSize="small" sx={{ mr: 0.5 }} />
                  <Typography variant="body2">{wanderlistData.likes?.length || 0} Likes</Typography>
                </Box>
              </Box>
            </Paper>
          </Box>
          {/* City Description with Read More/Less */}
          <Box mb={4}>
            <Paper sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" component="h2" fontWeight="bold" mb={2}>
                About {wanderlistData.city?.city}
              </Typography>
              <TruncatedDescription description={wanderlistData.city?.description || "No description available."} maxLines={4} />
            </Paper>
          </Box>

          {/* Places */}
          {wanderlistData.places && wanderlistData.places.length > 0 && (
            <Box mb={4}>
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
                  Places to Visit
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                  {wanderlistData.places.map((place) => (
                    <Paper key={place.id} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="h6" gutterBottom>
                        {place.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {place.description || "No description available."}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}

          {/* Activities */}
          {wanderlistData.activities && wanderlistData.activities.length > 0 && (
            <Box mb={4}>
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
                  Activities
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                  {wanderlistData.activities.map((activity) => (
                    <Paper key={activity.id} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="h6" gutterBottom>
                        {activity.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {activity.description || "No description available."}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}

          {/* Restaurants */}
          {wanderlistData.restaurants && wanderlistData.restaurants.length > 0 && (
            <Box mb={4}>
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
                  Restaurants
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                  {wanderlistData.restaurants.map((restaurant) => (
                    <Paper key={restaurant.id} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="h6" gutterBottom>
                        {restaurant.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {restaurant.description || "No description available."}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}

          {/* Accommodations */}
          {wanderlistData.accommodations && wanderlistData.accommodations.length > 0 && (
            <Box mb={4}>
              <Paper sx={{ p: 4, borderRadius: 2 }}>
                <Typography variant="h5" component="h2" fontWeight="bold" mb={3}>
                  Accommodations
                </Typography>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" }, gap: 2 }}>
                  {wanderlistData.accommodations.map((accommodation) => (
                    <Paper key={accommodation.id} sx={{ p: 2, borderRadius: 2, height: "100%" }}>
                      <Typography variant="h6" gutterBottom>
                        {accommodation.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {accommodation.description || "No description available."}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
              </Paper>
            </Box>
          )}
        </Box>

        {/* Right side - User form */}
        <WanderlistDetailWrapper wanderlistData={wanderlistData} />
      </Box>
    </Container>
  );
}

// Helper function to fetch wanderlist data
async function getWanderlistData(id: string): Promise<IWanderlistItem | null> {
  try {
    const response = await getWanderlistByIdService(id);
    return response;
  } catch (error) {
    console.error("Error fetching wanderlist data:", error);
    return null;
  }
}
