"use client";

import { Card, CardMedia, CardContent, Typography, Box, useTheme, IconButton, Tooltip, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { LocationOn as LocationIcon, AccessTime as TimeIcon, Share as ShareIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon, Add as AddIcon } from "@mui/icons-material";
import Link from "next/link";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import React, { useState, useEffect } from "react";
import { likeWanderListService, checkedWanderlistLiked } from "@/services/SWanderlist";

// Import context hooks and components
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import LoginDialog from "./LoginDialog";

interface IProps {
  wanderlistData: IWanderlistItem;
  onAddToWanderlist?: (wanderlistId: string) => void;
}

const WanderlistCard = ({ wanderlistData, onAddToWanderlist }: IProps) => {
  const theme = useTheme();
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
        } else if (pendingAction === "add" && onAddToWanderlist) {
          onAddToWanderlist(wanderlistData.id);
          showToast("Added to your wanderlists", "success");
        }
        setPendingAction(null);
      }
    };

    handlePendingAction();
  }, [isAuthenticated, pendingAction, wanderlistData.id, onAddToWanderlist, showToast]);

  useEffect(() => {
    // Set the share URL when the component mounts
    if (typeof window !== 'undefined') {
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
        setLikeCount(prevCount => isLiked ? prevCount - 1 : prevCount + 1);
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
    
    if (onAddToWanderlist && wanderlistData.id) {
      onAddToWanderlist(wanderlistData.id);
      showToast("Added to your wanderlists", "success");
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast("Link copied to clipboard", "success");
    setShareDialogOpen(false);
  };

  // Create the card component
  const cardComponent = (
    <Card
      component={Link}
      href={`/wanderlist/${wanderlistData.id}`}
      sx={{
        borderRadius: 3,
        overflow: "hidden",
        boxShadow: theme.shadows[2],
        // transition: "transform 0.3s ease, box-shadow 0.3s ease",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        textDecoration: "none",
        color: "inherit",
        // "&:hover": {
        //   transform: "translateY(-4px)",
        //   boxShadow: theme.shadows[4],
        // },
      }}
    >
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: theme.palette.primary.main,
            backgroundImage: wanderlistData.city && wanderlistData.city.heroImage ? `url(${wanderlistData.city.heroImage})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        
        {/* Share button - positioned at top right */}
        <IconButton
          onClick={handleShareClick}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            backgroundColor: "rgba(255, 255, 255, 0.7)",
            '&:hover': {
              backgroundColor: "rgba(255, 255, 255, 0.9)",
            },
            width: 36,
            height: 36,
          }}
          aria-label="share"
        >
          <ShareIcon fontSize="small" />
        </IconButton>

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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {/* Like button */}
            <IconButton 
              onClick={handleLikeClick} 
              size="small" 
              sx={{ p: 0.5 }}
              aria-label={isLiked ? "unlike" : "like"}
            >
              {isLiked ? 
                <FavoriteIcon fontSize="small" color="error" /> : 
                <FavoriteBorderIcon fontSize="small" />}
            </IconButton>
            
            <Typography variant="body2" color="text.secondary">
              {likeCount} likes
            </Typography>
            
            {/* Add to Wanderlist button - only show if not the owner */}
            {!isOwner && onAddToWanderlist && (
              <Tooltip title="Add to my wanderlists">
                <IconButton 
                  onClick={handleAddToWanderlist} 
                  size="small" 
                  sx={{ p: 0.5 }}
                  aria-label="add to wanderlist"
                >
                  <AddIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <>
      {/* Main Card Component */}
      {cardComponent}
      
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
