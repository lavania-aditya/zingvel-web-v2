"use client";

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs, 
  Link as MuiLink,
  TextField,
  Button,
  MenuItem,
  Paper,
  Snackbar,
  Alert,
  CircularProgress,
  Grid
} from '@mui/material';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
        message: 'Your message has been sent successfully! We will get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 1500);
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({
      ...prev,
      open: false
    }));
  };

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">Contact Us</Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Contact Us
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          We&apos;d love to hear from you! Please fill out the form below or use our contact information to get in touch.
        </Typography>

        <Grid container spacing={4} sx={{ mt: 2 }}>
          {/* Contact Form */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Send Us a Message
              </Typography>
              
              <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Your Name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      required
                      fullWidth
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField
                      select
                      fullWidth
                      label="Inquiry Type"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleChange}
                    >
                      <MenuItem value="general">General Inquiry</MenuItem>
                      <MenuItem value="booking">Booking Assistance</MenuItem>
                      <MenuItem value="support">Technical Support</MenuItem>
                      <MenuItem value="feedback">Feedback</MenuItem>
                      <MenuItem value="partnership">Business Partnership</MenuItem>
                    </TextField>
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      required
                      fullWidth
                      label="Subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={12}>
                    <TextField
                      required
                      fullWidth
                      multiline
                      rows={4}
                      label="Your Message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                    />
                  </Grid>
                  <Grid size={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading}
                      sx={{ mt: 2 }}
                    >
                      {loading ? <CircularProgress size={24} /> : 'Send Message'}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Paper>
          </Grid>
          
          {/* Contact Information */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={2} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                Contact Information
              </Typography>
              
              <Box sx={{ mt: 4 }}>
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <LocationOnIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      Our Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Travel Street, Suite 101<br />
                      Mumbai, Maharashtra 400001<br />
                      India
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <PhoneIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      Phone Numbers
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer Support: +91 98765 43210<br />
                      Business Inquiries: +91 98765 43211
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <EmailIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      Email Addresses
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      General Inquiries: info@zingvel.com<br />
                      Customer Support: support@zingvel.com<br />
                      Business Partnerships: partners@zingvel.com
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', mb: 3 }}>
                  <AccessTimeIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
                  <Box>
                    <Typography variant="subtitle1" fontWeight="600">
                      Working Hours
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Customer Support: 24/7<br />
                      Office Hours: Monday - Friday, 9:00 AM - 6:00 PM IST
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                  Connect With Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                  {['facebook', 'twitter', 'instagram', 'linkedin'].map((social) => (
                    <Box
                      key={social}
                      component="a"
                      href={`https://${social}.com/zingvel`}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        transition: 'all 0.3s',
                        '&:hover': {
                          bgcolor: 'primary.dark',
                          transform: 'translateY(-3px)'
                        }
                      }}
                    >
                      <Box 
                        component="img" 
                        src={`/social/${social}.svg`} 
                        alt={social} 
                        sx={{ width: 20, height: 20, filter: 'brightness(0) invert(1)' }} 
                      />
                    </Box>
                  ))}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        
        {/* Map Section */}
        <Box sx={{ mt: 6, borderRadius: 2, overflow: 'hidden', height: 400 }}>
          <Box 
            component="iframe"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.11609823277!2d72.74109995709657!3d19.08219783958221!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1654321234567!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </Box>
      </Container>
      
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
