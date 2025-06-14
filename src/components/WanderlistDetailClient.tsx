"use client";

import { Box, Button, IconButton, Typography, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Paper } from "@mui/material";
import { Share as ShareIcon, Favorite as FavoriteIcon, FavoriteBorder as FavoriteBorderIcon } from "@mui/icons-material";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { likeWanderListService, checkedWanderlistLiked } from "@/services/SWanderlist";
import LoginDialog from "./LoginDialog";

// Dynamically import the common inquiry form component
const CommonInquiryForm = dynamic(() => import("@/components/CommonInquiryForm"), { ssr: false });

interface WanderlistDetailClientProps {
  wanderlistData: IWanderlistItem;
}

export default function WanderlistDetailClient({ wanderlistData }: WanderlistDetailClientProps) {
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

  const handleShareClick = () => {
    setShareDialogOpen(true);
  };

  const handleLikeClick = async () => {
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

  const handleAddToWanderlist = () => {
    if (!isAuthenticated) {
      setPendingAction("add");
      setLoginDialogOpen(true);
      return;
    }

    // Implementation for adding to wanderlist would go here
    showToast("Added to your wanderlists", "success");
  };

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
            setLikeCount((prevCount) => prevCount + 1);
            showToast("Added to favorites", "success");
          } catch (error) {
            console.error("Error liking wanderlist:", error);
            showToast("Failed to update favorite status", "error");
          }
        } else if (pendingAction === "add") {
          // Implementation for adding to wanderlist would go here
          showToast("Added to your wanderlists", "success");
        }
        setPendingAction(null);
      }
    };

    handlePendingAction();
  }, [isAuthenticated, pendingAction, wanderlistData.id, showToast]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    showToast("Link copied to clipboard", "success");
    setShareDialogOpen(false);
  };

  return (
    <Box
      sx={{
        width: { xs: "100%", md: "33.333%" },
        position: { xs: "static", md: "sticky" },
        top: { md: "24px" },
        alignSelf: "flex-start",
        height: "fit-content",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
      id="wanderlist-user-form"
    >
      {/* Action buttons row */}
      {/* Share button on the left */}
      {/* <Tooltip title="Share Wanderlist"> */}

      {/* </Tooltip> */}

      <Paper
        sx={{
          px: 3,
          py: 1.5,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
        elevation={3}
      >
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* <Typography variant="body2" color="text.secondary">
            {likeCount}
          </Typography> */}
          {/* Like button */}
          {/* <Box sx={{ display: "flex", alignItems: "center" }}> */}
          <IconButton onClick={handleShareClick} color="primary">
            <ShareIcon />
          </IconButton>
          <IconButton onClick={handleLikeClick} color={isLiked ? "error" : "default"}>
            {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              {likeCount}
            </Typography>
          </IconButton>
          {/* </Box> */}

          {/* Add to Wanderlist button - only show if not the owner */}
          {/* {!isOwner && (
            <Button variant="contained" color="primary" onClick={handleAddToWanderlist} disabled={isOwner}>
              Add to Wanderlist
            </Button>
          )} */}
        </Box>
      </Paper>

      {/* Inquiry Form */}
      <CommonInquiryForm data={wanderlistData} type="wanderlist" formId="wanderlist-user-form" />

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
    </Box>
  );
}
