"use client";

import { useState } from "react";
import { Box, Container, Typography, TextField, Button, Grid, Paper, Snackbar, Alert, Link as MuiLink } from "@mui/material";
import Link from "next/link";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

export default function ContactUsClient() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
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
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);

    // Show success message
    setSnackbar({
      open: true,
      message: "Your message has been sent! We will get back to you soon.",
      severity: "success",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
            Contact Us
          </Typography>
          <Typography variant="h6" sx={{ maxWidth: 800, mx: "auto", mb: 4 }}>
            Have questions or need assistance? We&apos;re here to help! Reach out to our team using the form below or through our contact information.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Contact Form */}
          <Grid item xs={12} md={8}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Send Us a Message
              </Typography>
              <Typography variant="body1" paragraph color="text.secondary">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Your Name" name="name" value={formData.name} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField required fullWidth label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField fullWidth label="Subject" name="subject" value={formData.subject} onChange={handleChange} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      label="Message"
                      name="message"
                      multiline
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large" sx={{ mt: 2 }}>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>

          {/* Contact Information */}
          <Grid item xs={12} md={4}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, height: "100%" }}>
              <Typography variant="h4" component="h2" gutterBottom>
                Contact Information
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: "flex", mb: 3 }}>
                  <LocationOnIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Our Office
                    </Typography>
                    <Typography variant="body1">123 Travel Street, Bangalore, Karnataka 560001, India</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mb: 3 }}>
                  <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Email Us
                    </Typography>
                    <Typography variant="body1">
                      <MuiLink href="mailto:info@zingvel.com" underline="hover">
                        info@zingvel.com
                      </MuiLink>
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex" }}>
                  <PhoneIcon sx={{ mr: 2, color: "primary.main" }} />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      Call Us
                    </Typography>
                    <Typography variant="body1">
                      <MuiLink href="tel:+919876543210" underline="hover">
                        +91 98765 43210
                      </MuiLink>
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box sx={{ mt: 6 }}>
                <Typography variant="h6" gutterBottom>
                  Business Hours
                </Typography>
                <Typography variant="body1">Monday - Friday: 9:00 AM - 6:00 PM</Typography>
                <Typography variant="body1">Saturday: 10:00 AM - 4:00 PM</Typography>
                <Typography variant="body1">Sunday: Closed</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        {/* FAQ Link */}
        <Box sx={{ mt: 6, textAlign: "center" }}>
          <Typography variant="body1">
            Have general questions? Check out our{" "}
            <MuiLink component={Link} href="/faq" underline="hover">
              Frequently Asked Questions
            </MuiLink>{" "}
            page.
          </Typography>
        </Box>
      </Container>

      {/* Success/Error Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity === "success" ? "success" : "error"} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
