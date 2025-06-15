"use client";

import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { AutoAwesome as AutoAwesomeIcon, HandshakeOutlined, TravelExplore as TravelExploreIcon, TrendingUp, Verified } from "@mui/icons-material";
import theme from "@/utils/theme";

const CreateWanderlistBanner = () => {
  const router = useRouter();

  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Paper
          elevation={2}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            // bgcolor: "secondary.light",
            // border: "2px dashed",
            // borderColor: "primary.main",
            p: 1,
          }}
        >
          <Grid container spacing={2} p={{ xs: 3, sm: 4, md: 5 }}>
            {/* Left content */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AutoAwesomeIcon sx={{ color: theme.palette.secondary.main, mr: 1, fontSize: 18 }} />
                <Typography variant="h6" fontWeight="bold" sx={{ color: theme.palette.secondary.main, letterSpacing: 1.2 }}>
                  AI-POWERED TRAVEL PLANNING
                </Typography>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="body2" color="text.secondary" paragraph sx={{ color: theme.palette.secondary.main }}>
                  Let our AI curate your perfect trip based on your preferences. Create personalized itineraries, discover hidden gems, and turn your
                  travel ideas into reality.
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, my: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <TrendingUp sx={{ color: "primary.main", mr: 1 }} />
                  <Typography color="text.primary">Select destination</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Verified sx={{ color: "primary.main", mr: 1 }} />
                  <Typography color="text.primary">Set preferences</Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <HandshakeOutlined sx={{ color: "primary.main", mr: 1 }} />
                  <Typography color="text.primary">Get AI itinerary</Typography>
                </Box>
              </Box>

              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => router.push("/create-wanderlist")}
                sx={{
                  // mt: 5,
                  fontWeight: "bold",
                  // borderRadius: 2,
                }}
              >
                CREATE YOUR DREAM WANDERLIST
              </Button>
            </Grid>

            {/* Right icon */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "center" }}>
              <Box
                sx={{
                  // width: 100,
                  // height: 100,
                  flex: 1,
                  width: "100%",
                  // bgcolor: theme.palette.common.white,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <TravelExploreIcon sx={{ fontSize: 120, color: theme.palette.primary.main }} />
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateWanderlistBanner;
