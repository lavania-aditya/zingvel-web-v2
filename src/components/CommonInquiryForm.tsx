"use client";

import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, Paper, useMediaQuery, useTheme } from "@mui/material";
import { IPackageItem } from "@/interfaces/IPacakges";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import moment from "moment";
import { useAuth } from "@/context/AuthContext";
import { TextInputUi } from "./TextInputUi";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  travelDate: string;
  travellerCount: string;
  message: string;
}

interface CommonInquiryFormProps {
  data: IPackageItem | IWanderlistItem;
  type: "package" | "wanderlist";
  formId: string;
}

export default function CommonInquiryForm({ data, type, formId }: CommonInquiryFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useAuth();

  // State for form data
  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phone: user?.phNumber.toString() || "",
    travelDate: moment().format("YYYY-MM-DD"),
    travellerCount: "1",
    message: `Please share the details of the ${type === "package" ? "package" : "wanderlist"}`,
  });

  // State for logged in status (mock for now)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Effect to check if user is logged in and fetch user data
  useEffect(() => {
    // Check for logged in user
    const checkLoggedInUser = () => {
      const mockLoggedIn = localStorage.getItem("isLoggedIn") === "true";

      if (mockLoggedIn) {
        setIsLoggedIn(true);
        // Set user data from storage
        setFormData((prev) => ({
          ...prev,
          fullName: localStorage.getItem("userName") || "",
          email: localStorage.getItem("userEmail") || "",
          phone: localStorage.getItem("userPhone") || "",
        }));
      }
    };

    checkLoggedInUser();
  }, []);

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
    const { name, value } = e.target;
    if (name) {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);

    // Different API calls based on type
    if (type === "package") {
      console.log("Sending package inquiry for:", data._id);
      // TODO: Call package inquiry API
    } else {
      console.log("Adding to wanderlist:", data._id);
      // TODO: Call wanderlist API
    }

    alert(`Form submitted successfully for ${type}!`);
  };

  // Determine if this is a package to show price
  const isPackage = type === "package";
  const packageData = isPackage ? (data as IPackageItem) : null;
  const wanderlistData = !isPackage ? (data as IWanderlistItem) : null;

  return (
    <Box
      sx={{
        position: isMobile ? "static" : "sticky",
        top: isMobile ? "auto" : 24,
        width: "100%",
        zIndex: 10,
      }}
      id={formId}
    >
      <Paper
        sx={{
          p: 3,
          borderRadius: 2,
          bgcolor: "white",
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          width: "100%",
        }}
      >
        {/* Price section - only shown for packages */}
        {isPackage && packageData && (
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Box>
              <Typography variant="h6" fontWeight="bold">
                INR {packageData.salePrice.toLocaleString()}
              </Typography>
              {packageData.regularPrice !== packageData.salePrice && (
                <Box display="flex" alignItems="center" gap={1}>
                  <Typography variant="body2" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                    INR {packageData.regularPrice.toLocaleString()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "success.main",
                      bgcolor: "success.light",
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontWeight: "bold",
                    }}
                  >
                    SAVE INR {(packageData.regularPrice - packageData.salePrice).toLocaleString()}
                  </Typography>
                </Box>
              )}
            </Box>

            {packageData.rating > 0 && (
              <Box display="flex" alignItems="center" gap={0.5}>
                <Box
                  component="span"
                  sx={{
                    bgcolor: "success.main",
                    color: "white",
                    px: 0.8,
                    py: 0.3,
                    borderRadius: 1,
                    display: "flex",
                    alignItems: "center",
                    fontSize: "0.875rem",
                    fontWeight: "bold",
                  }}
                >
                  ★ {packageData.rating.toFixed(1)}
                </Box>
                <Typography variant="caption" color="text.secondary">
                  ({Math.floor(Math.random() * 1000)})
                </Typography>
              </Box>
            )}
          </Box>
        )}

        {/* Title - different based on type */}
        {!isPackage && (
          <Typography variant="h5" fontWeight="bold" mb={3}>
            {isLoggedIn ? "Welcome Back!" : "Join the Adventure"}
          </Typography>
        )}

        {/* For demo purposes only - these buttons toggle mock login state */}
        {/* <Box sx={{ mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
          <Button 
            variant={isLoggedIn ? "text" : "contained"} 
            size="small" 
            color="primary"
            onClick={handleMockLogin}
            disabled={isLoggedIn}
            sx={{ minWidth: '80px' }}
          >
            Demo: Login
          </Button>
          <Button 
            variant={!isLoggedIn ? "text" : "contained"} 
            size="small" 
            color="warning"
            onClick={handleMockLogout}
            disabled={!isLoggedIn}
            sx={{ minWidth: '80px' }}
          >
            Demo: Logout
          </Button>
        </Box> */}

        <Box component="form" onSubmit={handleSubmit}>
          <TextInputUi
            // fullWidth
            label="First Name*"
            // variant="outlined"
            // margin="normal"
            required
            size="small"
            name="firstName"
            value={formData.firstName}
            handleValueChange={handleInputChange}
            disabled={isLoggedIn}
          />

          <TextInputUi
            // fullWidth
            label="Last Name*"
            // variant="outlined"
            // margin="normal"
            required
            size="small"
            name="lastName"
            value={formData.lastName}
            handleValueChange={handleInputChange}
            disabled={isLoggedIn}
          />

          <TextInputUi
            // fullWidth
            label="Email*"
            // variant="outlined"
            // margin="normal"
            required
            type="email"
            size="small"
            name="email"
            value={formData.email}
            handleValueChange={handleInputChange}
            disabled={isLoggedIn}
          />

          <Box sx={{ mt: 2, mb: 1 }}>
            <TextInputUi
              label="Your Phone*"
              required
              size="small"
              name="phone"
              value={formData.phone}
              handleValueChange={handleInputChange}
              disabled={isLoggedIn}
            />
          </Box>

          <Box sx={{ mt: 2, mb: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <TextField
                sx={{ flex: 1 }}
                label="Travel Date*"
                variant="outlined"
                required
                size="small"
                type="date"
                InputLabelProps={{ shrink: true }}
                name="travelDate"
                value={formData.travelDate}
                onChange={handleInputChange}
              />

              <TextField
                sx={{ flex: 1 }}
                label="Traveller Count*"
                variant="outlined"
                required
                size="small"
                type="number"
                InputProps={{
                  inputProps: { min: 1 },
                }}
                name="travellerCount"
                value={formData.travellerCount}
                onChange={handleInputChange}
              />
            </Box>
          </Box>

          <TextField
            fullWidth
            label="Message..."
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            size="small"
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />

          <Button
            fullWidth
            variant="contained"
            color={isPackage ? "warning" : "primary"}
            sx={{
              mt: 2,
              py: 1.5,
              color: "white",
              fontWeight: "bold",
              fontSize: "1rem",
            }}
            type="submit"
          >
            {isPackage ? "Request Callback" : "Add to Wanderlist"}
          </Button>

          {!isLoggedIn && (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1, textAlign: "center" }}>
              By submitting, you agree to our Terms of Service and Privacy Policy
            </Typography>
          )}
        </Box>
      </Paper>

      {/* Mobile sticky bottom bar - only visible on mobile */}
      {isMobile && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "white",
            padding: 2,
            boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1000,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {isPackage ? (
            // Package bottom bar
            <>
              <Box>
                <Box sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>₹{packageData?.salePrice}</Box>
                <Box sx={{ textDecoration: "line-through", color: "text.secondary", fontSize: "0.9rem" }}>₹{packageData?.regularPrice}</Box>
              </Box>
              <Box
                component="button"
                sx={{
                  backgroundColor: "warning.main",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 1,
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Scroll to inquiry form
                  const element = document.getElementById(formId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Request Callback
              </Box>
            </>
          ) : (
            // Wanderlist bottom bar
            <>
              <Box>
                <Typography variant="body1" fontWeight="bold">
                  {wanderlistData?.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {wanderlistData?.city?.city}, {wanderlistData?.city?.country}
                </Typography>
              </Box>
              <Box
                component="button"
                sx={{
                  backgroundColor: "primary.main",
                  color: "white",
                  padding: "10px 20px",
                  borderRadius: 1,
                  border: "none",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
                onClick={() => {
                  // Scroll to user form
                  const element = document.getElementById(formId);
                  if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                  }
                }}
              >
                Add to Wanderlist
              </Box>
            </>
          )}
        </Box>
      )}
    </Box>
  );
}
