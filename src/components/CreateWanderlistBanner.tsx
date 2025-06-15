"use client";

import { Box, Button, Container, Typography, Paper, Grid } from "@mui/material";
import { useRouter } from "next/navigation";
import { AutoAwesome as AutoAwesomeIcon, TravelExplore as TravelExploreIcon } from "@mui/icons-material";

const CreateWanderlistBanner = () => {
  const router = useRouter();

  return (
    <Box sx={{ py: 3 }}>
      <Container>
        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            bgcolor: "secondary.light",
            border: "2px dashed",
            borderColor: "primary.main",
            p: 3,
          }}
        >
          <Grid container spacing={2}>
            {/* Left content */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                <AutoAwesomeIcon sx={{ color: "primary.main", mr: 1, fontSize: 18 }} />
                <Typography variant="overline" color="primary" fontWeight="bold" fontSize="0.75rem">
                  AI-POWERED TRAVEL PLANNING
                </Typography>
              </Box>
              
              <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                Create Your Dream Wanderlist
              </Typography>
              
              <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 1 }}>
                Let our AI curate your perfect trip based on your preferences. Create personalized itineraries, 
                discover hidden gems, and turn your travel ideas into reality.
              </Typography>
              
              <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
                  <Box component="span" sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: "50%", 
                    bgcolor: "primary.main", 
                    color: "white",
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mr: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}>1</Box>
                  Select destination
                </Typography>
                
                <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
                  <Box component="span" sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: "50%", 
                    bgcolor: "primary.main", 
                    color: "white",
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mr: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}>2</Box>
                  Set preferences
                </Typography>
                
                <Typography variant="caption" sx={{ display: "flex", alignItems: "center" }}>
                  <Box component="span" sx={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: "50%", 
                    bgcolor: "primary.main", 
                    color: "white",
                    display: "inline-flex", 
                    alignItems: "center", 
                    justifyContent: "center", 
                    mr: 0.5,
                    fontSize: "0.75rem",
                    fontWeight: "bold"
                  }}>3</Box>
                  Get AI itinerary
                </Typography>
              </Box>
            </Grid>
            
            {/* Right icon */}
            <Grid size={{ xs: 12, md: 4 }} sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <Box sx={{ 
                width: 100, 
                height: 100, 
                bgcolor: "primary.light", 
                borderRadius: "50%", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
              }}>
                <TravelExploreIcon sx={{ fontSize: 50, color: "primary.main" }} />
              </Box>
            </Grid>
            
            {/* CTA Button - Full width */}
            <Grid size={{ xs: 12 }} sx={{ mt: 1 }}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AutoAwesomeIcon />}
                onClick={() => router.push("/create-wanderlist")}
                sx={{
                  py: 1,
                  borderRadius: 2,
                  fontWeight: "bold",
                }}
              >
                Create Your Wanderlist
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

export default CreateWanderlistBanner;
