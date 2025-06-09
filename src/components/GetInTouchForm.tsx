"use client";

import React, { useState } from "react";
import { Box, Typography, Button, useTheme, Snackbar, Alert, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { CallOutlined, Person as PersonIcon } from "@mui/icons-material";
import { TextInputUi } from "./TextInputUi";
import { FONTS } from "@/utils/theme";

interface GetInTouchFormProps {
  showTitle?: boolean;
  showInquiryOptions?: boolean;
  variant?: "full" | "compact";
}

export default function GetInTouchForm({ showTitle = true, showInquiryOptions = true, variant = "full" }: GetInTouchFormProps) {
  const theme = useTheme();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "How can we help you?",
  });

  const [errorMessage, setErrorMessage] = useState({
    name: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "phone") {
      debugger;
      const newVal = e.target.value.replace(/\D/g, ""); // Only allow digits
      if (newVal.length <= 10 && /^\d*$/.test(newVal)) {
        value = newVal;
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || /^\d*$/.test(formData.phone.trim())) {
      const newErrorMessage = { ...errorMessage };
      if (!formData.name.trim()) {
        newErrorMessage.name = "Please enter name";
      }
      if (/^\d*$/.test(formData.phone.trim())) {
        newErrorMessage.phone = "Please enter valid phone number";
      }
      setErrorMessage(newErrorMessage);
      return;
    }

    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSnackbar({
        open: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
        severity: "success",
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
    setFormData({
      name: "",
      phone: "",
      message: "How can we help you?",
    });
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
            <CallOutlined sx={{ color: theme.palette.primary.main }} />
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

      <Box
        sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: showInquiryOptions && variant === "full" ? "repeat(2, 1fr)" : "1fr" }, gap: 4 }}
      >
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
                <TextInputUi
                  label="Your Name"
                  value={formData.name}
                  handleValueChange={handleChange}
                  name="name"
                  // required
                  placeholder="Enter your full name"
                  errorMessage={errorMessage.name}
                  startAdornment={<PersonIcon sx={{ display: "block" }} />}
                />
              </Box>

              <Box sx={{ mb: 2 }}>
                <TextInputUi
                  label="Phone Number"
                  value={formData.phone}
                  handleValueChange={handleChange}
                  name="phone"
                  // required
                  placeholder="8650XXXXXX"
                  errorMessage={errorMessage.phone}
                  startAdornment={
                    <Typography variant="subtitle2" sx={{ display: "block", fontFamily: FONTS.text, fontSize: "1rem" }}>
                      +91
                    </Typography>
                  }
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <TextInputUi
                  label="Message"
                  value={formData.message}
                  handleValueChange={handleChange}
                  name="message"
                  required
                  multiline
                  rows={5}
                  placeholder="Enter your message"
                  // errorMessage={errorMessage.}
                  // startAdornment={<EmailIcon />}
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
                onClick={handleSubmit}
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
