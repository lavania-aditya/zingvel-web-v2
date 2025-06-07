"use client";

import { Card, CardMedia, CardContent, Typography, Box, useTheme } from "@mui/material";
import { LocationOn as LocationIcon, AccessTime as TimeIcon } from "@mui/icons-material";
import Link from "next/link";
import { IWanderlistItem } from "@/interfaces/IWanderlist";

interface IProps {
  wanderlistData: IWanderlistItem;
}

const WanderlistCard = ({ wanderlistData }: IProps) => {
  const theme = useTheme();

  return (
    <Card
      component={Link}
      href={`/wanderlist/${wanderlistData.id}`}
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
            backgroundColor: theme.palette.primary.main,
            backgroundImage: wanderlistData.city && wanderlistData.city.heroImage ? 
              `url(${wanderlistData.city.heroImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* No discount in wanderlist data structure */}

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
            {wanderlistData.name}
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
            <LocationIcon sx={{ color: "white", fontSize: "0.875rem", mr: 0.5, opacity: 0.9 }} />
            <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
              {wanderlistData.city ? wanderlistData.city.city : ""}
            </Typography>
          </Box>
        </Box>
      </Box>

      <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <TimeIcon sx={{ color: "text.secondary", fontSize: "0.875rem", mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {wanderlistData.travelDate ? new Date(wanderlistData.travelDate).toLocaleDateString() : ""}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
          <Typography variant="body2" color="text.secondary">
            {wanderlistData.numberOfDays} days
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "baseline", mt: 1, justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {wanderlistData.activities?.length || 0} activities
            </Typography>
          </Box>
          
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              {wanderlistData.likeCount || 0} likes
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default WanderlistCard;
