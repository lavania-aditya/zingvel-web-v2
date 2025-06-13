"use client";

import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Typography,
  Button,
  Avatar,
  MenuItem,
  Select,
  SelectChangeEvent,
  FormControl,
  InputLabel,
  useTheme,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Container,
  IconButton,
  useMediaQuery,
  Drawer,
  Grid,
} from "@mui/material";
import { Edit as EditIcon, DeleteForever as DeleteIcon } from "@mui/icons-material";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import { useThemeContext } from "@/context/ThemeContext";

const ProfileClient = () => {
  const { user, logout } = useAuth();
  const { showToast } = useToast();
  const { mode } = useThemeContext();
  const theme = useTheme();
  const isDarkMode = mode === "dark";

  // Profile form state
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "Guest",
    lastName: user?.lastName || "User",
    username: user?.userName || "",
    email: user?.email || "",
    bio: user?.bio || "",
    gender: user?.gender || "",
    dateOfBirth: user?.dateOfBirth || "",
    travelStyle: user?.typeOfTravel?.[0] || "",
    placesTravelledPerYear: user?.placesTravelledYear?.[0] || "",
    phoneNumber: user?.phNumber || "",
    whatsappNumber: user?.whatsappNumber || "",
  });

  // Profile picture state
  const [selectedAvatar, setSelectedAvatar] = useState<string>(user?.avatarImage || "/avatars/avatar1.png");

  // Avatar selection dialog state
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);

  // Delete account dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Check if device is mobile
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Sample avatar images
  const avatarOptions = [
    "/avatars/avatar1.png",
    "/avatars/avatar2.png",
    "/avatars/avatar3.png",
    "/avatars/avatar4.png",
    "/avatars/avatar5.png",
    "/avatars/avatar6.png",
    "/avatars/avatar7.png",
    "/avatars/avatar8.png",
    "/avatars/avatar9.png",
    "/avatars/avatar10.png",
  ];

  // Handle avatar dialog open
  const handleOpenAvatarDialog = () => {
    setAvatarDialogOpen(true);
  };

  // Handle avatar dialog close
  const handleCloseAvatarDialog = () => {
    setAvatarDialogOpen(false);
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    handleCloseAvatarDialog();
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle select changes
  const handleSelectChange = (e: SelectChangeEvent) => {
    const name = e.target.name as string;
    const value = e.target.value as string;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you would call your API to update the profile
    console.log("Profile data to update:", profileData);
    console.log("Selected avatar:", selectedAvatar);

    // Show success toast
    showToast("Profile updated successfully!", "success");
  };

  // Handle delete account dialog open
  const handleOpenDeleteDialog = () => {
    setDeleteDialogOpen(true);
    setConfirmPhoneNumber("");
    setPhoneNumberError("");
  };

  // Handle delete account dialog close
  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // Handle phone number input for confirmation
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPhoneNumber(e.target.value);
    setPhoneNumberError("");
  };

  // Handle account deletion confirmation
  const handleConfirmDeleteAccount = () => {
    // Check if phone number matches the one on file
    if (confirmPhoneNumber !== user?.phNumber) {
      setPhoneNumberError("Phone number doesn't match your account.");
      return;
    }

    // Here you would call your API to delete the account
    console.log("Deleting account...");

    // Close dialog
    setDeleteDialogOpen(false);

    // Log the user out after account deletion
    logout();

    // Show success toast
    showToast("Account deleted successfully!", "success");
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {/* Page Title Card */}
        <Card sx={{
          mb: 4,
          bgcolor: isDarkMode ? "background.paper" : "white",
          color: isDarkMode ? "text.primary" : "inherit",
        }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Update your details and profile information.
            </Typography>
          </CardContent>
        </Card>

        {/* Main Content Card */}
        <Card sx={{
          mb: 4,
          bgcolor: isDarkMode ? "background.paper" : "white",
          color: isDarkMode ? "text.primary" : "inherit",
        }}>
          <CardContent>
            {/* Profile Picture with Edit Icon */}
            <Box sx={{ display: "flex", justifyContent: "center", mb: 4 }}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  src={selectedAvatar}
                  alt={`${profileData.firstName} ${profileData.lastName}`}
                  sx={{ width: 150, height: 150 }}
                />
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 5,
                    right: 5,
                    backgroundColor: theme.palette.primary.main,
                    color: "white",
                    "&:hover": {
                      backgroundColor: theme.palette.primary.dark,
                    },
                    width: 36,
                    height: 36,
                  }}
                  onClick={handleOpenAvatarDialog}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Form Fields in Two Columns */}
            <Grid container spacing={3}>
              {/* Left Column */}
              <Grid item xs={12} md={6} component="div">
                <TextField
                  fullWidth
                  margin="normal"
                  label="First Name"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Last Name"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Username"
                  name="username"
                  value={profileData.username}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Phone Number"
                  name="phoneNumber"
                  value={profileData.phoneNumber}
                  InputProps={{ readOnly: true }}
                  helperText="Phone number cannot be changed"
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="WhatsApp Number"
                  name="whatsappNumber"
                  value={profileData.whatsappNumber}
                  InputProps={{ readOnly: true }}
                  helperText="WhatsApp number cannot be changed"
                />
              </Grid>

              {/* Right Column */}
              <Grid item xs={12} md={6} component="div">
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  name="email"
                  value={profileData.email}
                  onChange={handleInputChange}
                />
                <TextField
                  fullWidth
                  margin="normal"
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  value={profileData.dateOfBirth}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                />
                <FormControl fullWidth margin="normal">
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="gender"
                    value={profileData.gender}
                    label="Gender"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">Select Gender</MenuItem>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                    <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Bio"
                  name="bio"
                  multiline
                  rows={3}
                  value={profileData.bio}
                  onChange={handleInputChange}
                  placeholder="Tell us a bit about yourself..."
                />
              </Grid>
            </Grid>

            {/* Travel Preferences */}
            <Typography variant="h6" fontWeight="medium" sx={{ mt: 4, mb: 2 }}>
              Travel Preferences
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} component="div">
                <FormControl fullWidth margin="normal">
                  <InputLabel id="travel-style-label">Travel Style</InputLabel>
                  <Select
                    labelId="travel-style-label"
                    name="travelStyle"
                    value={profileData.travelStyle}
                    label="Travel Style"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">Select Travel Style</MenuItem>
                    <MenuItem value="luxury">Luxury</MenuItem>
                    <MenuItem value="budget">Budget</MenuItem>
                    <MenuItem value="adventure">Adventure</MenuItem>
                    <MenuItem value="cultural">Cultural</MenuItem>
                    <MenuItem value="relaxation">Relaxation</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6} component="div">
                <FormControl fullWidth margin="normal">
                  <InputLabel id="places-travelled-label">Places Travelled Per Year</InputLabel>
                  <Select
                    labelId="places-travelled-label"
                    name="placesTravelledPerYear"
                    value={profileData.placesTravelledPerYear}
                    label="Places Travelled Per Year"
                    onChange={handleSelectChange}
                  >
                    <MenuItem value="">Select Frequency</MenuItem>
                    <MenuItem value="1-2">1-2 places</MenuItem>
                    <MenuItem value="3-5">3-5 places</MenuItem>
                    <MenuItem value="6-10">6-10 places</MenuItem>
                    <MenuItem value="10+">More than 10 places</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            {/* Save Button */}
            <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
              <Button type="submit" variant="contained" color="primary" size="large">
                Save Changes
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Delete Account Card */}
        <Card
          sx={{
            mb: 4,
            borderColor: theme.palette.error.main,
            borderWidth: 1,
            borderStyle: "solid",
            bgcolor: isDarkMode ? "background.paper" : "white",
            color: isDarkMode ? "text.primary" : "inherit",
          }}
        >
          <CardContent>
            <Typography variant="h6" fontWeight="medium" color="error" gutterBottom>
              Delete Account
            </Typography>
            <Typography variant="body2" color="error" sx={{ mb: 2 }}>
              Once you delete your account, there is no going back. Please be certain.
            </Typography>
            <Button
              variant="outlined"
              color="error"
              onClick={handleOpenDeleteDialog}
              startIcon={<DeleteIcon />}
            >
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Avatar Selection Dialog for Desktop */}
      {!isMobile && (
        <Dialog open={avatarDialogOpen} onClose={handleCloseAvatarDialog} maxWidth="md">
          <DialogTitle>Select an Avatar</DialogTitle>
          <DialogContent>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, justifyContent: "center", p: 2 }}>
              {avatarOptions.map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  sx={{
                    width: 80,
                    height: 80,
                    cursor: "pointer",
                    border: selectedAvatar === avatar ? `2px solid ${theme.palette.primary.main}` : "none",
                    "&:hover": {
                      transform: "scale(1.05)",
                      boxShadow: "0 0 10px rgba(0,0,0,0.2)"
                    }
                  }}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseAvatarDialog}>Cancel</Button>
          </DialogActions>
        </Dialog>
      )}

      {/* Avatar Selection Drawer for Mobile */}
      {isMobile && (
        <Drawer
          anchor="bottom"
          open={avatarDialogOpen}
          onClose={handleCloseAvatarDialog}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Select an Avatar</Typography>
            <Box sx={{ display: "flex", overflowX: "auto", gap: 2, pb: 2 }}>
              {avatarOptions.map((avatar, index) => (
                <Avatar
                  key={index}
                  src={avatar}
                  alt={`Avatar ${index + 1}`}
                  sx={{
                    width: 70,
                    height: 70,
                    flexShrink: 0,
                    cursor: "pointer",
                    border: selectedAvatar === avatar ? `2px solid ${theme.palette.primary.main}` : "none",
                  }}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
              <Button onClick={handleCloseAvatarDialog}>Cancel</Button>
            </Box>
          </Box>
        </Drawer>
      )}

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ color: theme.palette.error.main }}>
          Confirm Account Deletion
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted.
            To confirm deletion, please enter your phone number below.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            label="Phone Number"
            type="tel"
            fullWidth
            value={confirmPhoneNumber}
            onChange={handlePhoneNumberChange}
            error={!!phoneNumberError}
            helperText={phoneNumberError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleConfirmDeleteAccount} color="error">
            Confirm Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProfileClient;
