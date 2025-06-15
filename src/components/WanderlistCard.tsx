"use client";

import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Box,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Divider,
} from "@mui/material";
import {
  LocationOn as LocationIcon,
  AccessTime as TimeIcon,
  Share as ShareIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import MediaFallback from "./MediaFallback";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import React, { useState, useEffect } from "react";
import { likeWanderListService, checkedWanderlistLiked } from "@/services/SWanderlist";

// Import context hooks and components
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import LoginDialog from "./LoginDialog";
// import theme from "@/utils/theme";

interface IProps {
  wanderlistData: IWanderlistItem;
  onAddToWanderlist?: (wanderlistId: string) => void;
}

const WanderlistCard = ({ wanderlistData, onAddToWanderlist }: IProps) => {
  const { user, isAuthenticated } = useAuth();
  const { showToast } = useToast();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(wanderlistData.likeCount || 0);
  const [shareDialogOpen, setShareDialogOpen] = useState<boolean>(false);
  const [loginDialogOpen, setLoginDialogOpen] = useState<boolean>(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [pendingAction, setPendingAction] = useState<"like" | "add" | null>(null);

  // Check if the current user is the creator of the wanderlist
  const isOwner = user?.id === wanderlistData.userId;

  // Handle login dialog close
  const handleLoginDialogClose = () => {
    setLoginDialogOpen(false);
    setPendingAction(null);
  };

  // Effect to handle post-login actions
  useEffect(() => {
    const handlePendingAction = async () => {
      if (isAuthenticated && pendingAction && wanderlistData.id) {
        if (pendingAction === "like") {
          try {
            await likeWanderListService(wanderlistData.id);
            setIsLiked(true);
            showToast("Added to favorites", "success");
          } catch (error) {
            console.error("Error liking wanderlist:", error);
            showToast("Failed to update favorite status", "error");
          }
        } else if (pendingAction === "add") {
          // Console log the user ID and wanderlist ID after login as requested
          console.log("User ID after login:", user?.id, "Wanderlist ID:", wanderlistData.id);

          if (onAddToWanderlist) {
            onAddToWanderlist(wanderlistData.id);
            showToast("Added to your wanderlists", "success");
          }
        }
        setPendingAction(null);
      }
    };

    handlePendingAction();
  }, [isAuthenticated, pendingAction, wanderlistData.id, onAddToWanderlist, showToast, user?.id]);

  useEffect(() => {
    // Set the share URL when the component mounts
    if (typeof window !== "undefined") {
      setShareUrl(`${window.location.origin}/wanderlist/${wanderlistData.id}`);
    }

    // Check if the user has liked this wanderlist
    const checkLikeStatus = async () => {
      if (isAuthenticated && wanderlistData.id) {
        try {
          const response = await checkedWanderlistLiked(wanderlistData.id);
          setIsLiked(response.isLiked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      }
    };

    checkLikeStatus();
  }, [isAuthenticated, wanderlistData.id]);

  const handleShareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShareDialogOpen(true);
  };

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setPendingAction("like");
      setLoginDialogOpen(true);
      return;
    }

    try {
      if (wanderlistData.id) {
        await likeWanderListService(wanderlistData.id);
        setIsLiked(!isLiked);
        setLikeCount((prevCount) => (isLiked ? prevCount - 1 : prevCount + 1));
        showToast(isLiked ? "Removed from favorites" : "Added to favorites", "success");
      }
    } catch (error) {
      console.error("Error liking wanderlist:", error);
      showToast("Failed to update favorite status", "error");
    }
  };

  const handleAddToWanderlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      setPendingAction("add");
      setLoginDialogOpen(true);
      return;
    }

    if (wanderlistData.id && !isOwner) {
      // Console log the user ID and wanderlist ID as requested
      console.log("User ID:", user?.id, "Wanderlist ID:", wanderlistData.id);

      if (onAddToWanderlist) {
        onAddToWanderlist(wanderlistData.id);
        showToast("Added to your wanderlists", "success");
      }
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast("Link copied to clipboard", "success");
  };

  return (
    <>
      {/* Main Card Component */}
      <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ position: "relative" }}>
          {wanderlistData.city && wanderlistData.city.heroImage ? (
            <CardMedia
              component="div"
              sx={{
                height: 200,
                backgroundImage: `url(${wanderlistData.city.heroImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ) : (
            <MediaFallback height={200} />
          )}

          {/* Gradient overlay removed from top */}

          {/* Share button */}
          <IconButton
            onClick={handleShareClick}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              bgcolor: "rgba(255, 255, 255, 0.8)",
              "&:hover": {
                bgcolor: "rgba(255, 255, 255, 0.9)",
              },
            }}
            size="small"
            aria-label="share"
          >
            <ShareIcon fontSize="small" />
          </IconButton>

          {/* Bottom - Wanderlist Name, City, State */}
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.6) 50%, rgba(0,0,0,0) 100%)",
              p: 2,
              pt: 3,
            }}
          >
            {/* Wanderlist name */}
            <Typography variant="h6" sx={{ color: "white", fontWeight: "bold", textShadow: "0px 1px 2px rgba(0,0,0,0.5)", mb: 0.5 }}>
              {wanderlistData.name}
            </Typography>
            
            {/* Location info */}
            <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
              <LocationIcon sx={{ color: "white", fontSize: "0.875rem", mr: 0.5, opacity: 0.9 }} />
              <Typography variant="body2" sx={{ color: "white", opacity: 0.9 }}>
                {wanderlistData.city ? wanderlistData.city.city : ""}
                {wanderlistData.city && wanderlistData.city.state ? `, ${wanderlistData.city.state}` : ""}
              </Typography>
            </Box>
          </Box>
        </Box>

        <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
          {/* Date, Time, and Days in one row */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <TimeIcon sx={{ color: "text.secondary", fontSize: "0.875rem", mr: 0.5 }} />
              <Typography variant="body2" color="text.secondary">
                {wanderlistData.travelDate ? new Date(wanderlistData.travelDate).toLocaleDateString() : ""}
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {wanderlistData.numberOfDays} days
            </Typography>
          </Box>

          {/* Created by username */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Created by: {wanderlistData?.user?.firstName || "Anonymous"}
            </Typography>
          </Box>

          {/* Count of things */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Typography variant="body2" color="text.secondary">
              {wanderlistData.activities?.length || 0} activities
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {wanderlistData.places?.length || 0} places
            </Typography>
            {wanderlistData.restaurants?.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {wanderlistData.restaurants.length} restaurants
              </Typography>
            )}
          </Box>

          {/* Like and Add to Wanderlist buttons */}
          <Divider sx={{ my: 1 }} />
          <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between" }}>
            {/* Like Button */}
            <Button
              variant="outlined"
              sx={{
                minWidth: "auto",
                borderRadius: 2,
                border: "1px solid #e0e0e0",
                // p: 0,
                "&:hover": {
                  border: "1px solid #e0e0e0",
                  bgcolor: "rgba(0, 0, 0, 0.04)",
                },
              }}
            >
              <IconButton
                onClick={handleLikeClick}
                size="small"
                aria-label={isLiked ? "unlike" : "like"}
                sx={{
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                {isLiked ? <FavoriteIcon fontSize="small" color="error" /> : <FavoriteBorderIcon fontSize="small" />}
              </IconButton>
              <Typography variant="body2" color="text.secondary">
                {likeCount}
              </Typography>
            </Button>

            <Button
              fullWidth
              variant="outlined"
              color="primary"
              onClick={(e) => {
                if (!isOwner) {
                  handleAddToWanderlist(e);
                }
              }}
              sx={{
                borderRadius: 2,
              }}
            >
              {isOwner ? "You own this Wanderlist" : "Add to Wanderlist"}
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Share Dialog */}
      <Dialog open={shareDialogOpen} onClose={() => setShareDialogOpen(false)}>
        <DialogTitle>Share Wanderlist</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            value={shareUrl}
            margin="dense"
            InputProps={{
              readOnly: true,
            }}
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShareDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleCopyLink} variant="contained" color="primary">
            Copy Link
          </Button>
        </DialogActions>
      </Dialog>

      {/* Login Dialog */}
      <LoginDialog open={loginDialogOpen} onClose={handleLoginDialogClose} />
    </>
  );
};

export default WanderlistCard;
