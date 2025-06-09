"use client";

import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  useTheme,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

interface GetInTouchFormProps {
  showTitle?: boolean;
  showInquiryOptions?: boolean;
  variant?: "full" | "compact";
}

export default function GetInTouchForm({
  showTitle = true,
  showInquiryOptions = true,
  variant = "full",
}: GetInTouchFormProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "How can we help you?",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
        severity: "success",
      });

      // Reset form
      setFormData({
        name: "",
        phone: "",
        message: "How can we help you?",
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const InquiryOptions = () => (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        How can we help you?
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}10`,
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: `${theme.palette.primary.main}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <ChatBubbleOutlineIcon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              General Inquiries
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Questions about our services, packages, or company information
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}10`,
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: `${theme.palette.primary.main}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <HelpOutlineIcon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Support & Troubleshooting
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Need help with bookings, payments, or technical issues
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            p: 2,
            border: "1px solid",
            borderColor: theme.palette.divider,
            borderRadius: 2,
            cursor: "pointer",
            transition: "all 0.2s",
            "&:hover": {
              borderColor: theme.palette.primary.main,
              backgroundColor: `${theme.palette.primary.main}10`,
            },
          }}
        >
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              backgroundColor: `${theme.palette.primary.main}20`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              mr: 2,
            }}
          >
            <CallOutlinedIcon sx={{ color: theme.palette.primary.main }} />
          </Box>
          <Box>
            <Typography variant="subtitle2" fontWeight={600}>
              Contact Us Directly
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Speak with our customer service team for immediate assistance
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );

  return (
    <Box>
      {showTitle && (
        <Typography variant="h4" component="h2" fontWeight={700} gutterBottom>
          Get in Touch
        </Typography>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: showInquiryOptions && variant === "full" ? 'repeat(2, 1fr)' : '1fr' }, gap: 4 }}>
        {showInquiryOptions && variant === "full" && (
          <Box>
            <InquiryOptions />
          </Box>
        )}

        <Box>
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Send us a message
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Your Name <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  placeholder="Enter your full name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Phone Number
                </Typography>
                <TextField
                  fullWidth
                  placeholder="9876543210"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  variant="outlined"
                  size="small"
                  InputProps={{
                    startAdornment: (
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 0.5 }}>
                        +91
                      </Typography>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" sx={{ mb: 0.5 }}>
                  Your Message <span style={{ color: "red" }}>*</span>
                </Typography>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  placeholder="How can we help you?"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  variant="outlined"
                  size="small"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 1,
                    },
                  }}
                />
              </Box>

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <SendIcon />}
                sx={{
                  py: 1.5,
                  borderRadius: 1,
                  backgroundColor: theme.palette.primary.main,
                  "&:hover": {
                    backgroundColor: theme.palette.primary.dark,
                  },
                }}
              >
                Send Message
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
