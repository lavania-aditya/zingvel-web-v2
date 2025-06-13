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
} from "@mui/material";
import { PhotoCamera as PhotoCameraIcon, DeleteForever as DeleteIcon } from "@mui/icons-material";
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
  });

  // Profile picture state
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(user?.avatarImage || null);

  // Delete account dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [confirmPhoneNumber, setConfirmPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");

  // Handle profile picture change
  const handleProfilePictureChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfilePicture(file);

      // Create a preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
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
    console.log("Profile picture to upload:", profilePicture);

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
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: 0 }}>
      <Box component="form" onSubmit={handleSubmit}>
        {/* Page Title Card */}
        <Card
          sx={{
            mb: 4,
            bgcolor: isDarkMode ? "background.paper" : "white",
            color: isDarkMode ? "text.primary" : "inherit",
            // px: 0,
            // backgroundColor: "yellow",
          }}
        >
          <CardContent>
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Personal Information
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Update your details and profile information.
            </Typography>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* Left Column */}
          <Box sx={{ flex: 1 }}>
            {/* Profile Picture Section */}
            <Card
              sx={{
                mb: 4,
                bgcolor: isDarkMode ? "background.paper" : "white",
                color: isDarkMode ? "text.primary" : "inherit",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Profile Picture
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                  <Avatar
                    src={previewUrl || undefined}
                    alt={`${profileData.firstName} ${profileData.lastName}`}
                    sx={{ width: 150, height: 150, mb: 2 }}
                  />
                  <Box sx={{ width: "100%", textAlign: "center" }}>
                    <input
                      accept="image/*"
                      style={{ display: "none" }}
                      id="profile-picture-upload"
                      type="file"
                      onChange={handleProfilePictureChange}
                    />
                    <label htmlFor="profile-picture-upload">
                      <Button variant="contained" component="span" startIcon={<PhotoCameraIcon />} fullWidth>
                        Upload Photo
                      </Button>
                    </label>
                    <Typography variant="caption" display="block" sx={{ mt: 1 }}>
                      JPG, PNG or GIF. Max size 2MB.
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>

            {/* Travel Preferences Section */}
            <Card
              sx={{
                mb: 4,
                bgcolor: isDarkMode ? "background.paper" : "white",
                color: isDarkMode ? "text.primary" : "inherit",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Travel Preferences
                </Typography>
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
              </CardContent>
            </Card>
          </Box>

          {/* Right Column */}
          <Box sx={{ flex: 1 }}>
            {/* Personal Information Section */}
            <Card
              sx={{
                mb: 4,
                bgcolor: isDarkMode ? "background.paper" : "white",
                color: isDarkMode ? "text.primary" : "inherit",
              }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="medium" gutterBottom>
                  Personal Information
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="First Name"
                      name="firstName"
                      value={profileData.firstName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Last Name"
                      name="lastName"
                      value={profileData.lastName}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Username"
                      name="username"
                      value={profileData.username}
                      onChange={handleInputChange}
                      disabled
                      helperText="Username cannot be changed"
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField fullWidth margin="normal" label="Email" name="email" value={profileData.email} onChange={handleInputChange} />
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      label="Phone Number"
                      name="phoneNumber"
                      value={profileData.phoneNumber}
                      onChange={handleInputChange}
                    />
                  </Box>
                  <Box sx={{ mb: 2 }}>
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
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel id="gender-label">Gender</InputLabel>
                      <Select labelId="gender-label" name="gender" value={profileData.gender} label="Gender" onChange={handleSelectChange}>
                        <MenuItem value="">Select Gender</MenuItem>
                        <MenuItem value="male">Male</MenuItem>
                        <MenuItem value="female">Female</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                        <MenuItem value="prefer-not-to-say">Prefer not to say</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                  <Box sx={{ mb: 2 }}>
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
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>

        {/* Submit Button */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained" color="primary" size="large">
            Save Changes
          </Button>
        </Box>

        {/* Delete Account Section */}
        <Card
          sx={{
            mt: 4,
            mb: 3,
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
            <Button variant="outlined" color="error" onClick={handleOpenDeleteDialog} startIcon={<DeleteIcon color="error" />}>
              <Typography variant="inherit" color="error">
                Delete Account
              </Typography>
            </Button>
          </CardContent>
        </Card>
      </Box>

      {/* Delete Account Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <DialogTitle sx={{ color: theme.palette.error.main }}>Confirm Account Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            This action cannot be undone. All your data will be permanently deleted. To confirm deletion, please enter your phone number below.
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
