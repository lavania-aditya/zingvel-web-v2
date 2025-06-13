'use client';

import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, Paper } from '@mui/material';
import { IWanderlistItem } from '@/interfaces/IWanderlist';
import { useMediaQuery, useTheme } from '@mui/material';

interface StickyUserFormProps {
  wanderlistData: IWanderlistItem;
}

interface UserData {
  fullName: string;
  email: string;
  phone: string;
  message: string;
}

export default function StickyUserForm({ wanderlistData }: StickyUserFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  // State for form data
  const [userData, setUserData] = useState<UserData>({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  
  // State for logged in status (mock for now)
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  
  // Effect to check if user is logged in and fetch user data
  useEffect(() => {
    // Mock check for logged in user - in a real app, this would check auth state
    const checkLoggedInUser = () => {
      // Mock user data - in a real app, this would come from auth context or API
      const mockLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
      
      if (mockLoggedIn) {
        setIsLoggedIn(true);
        // Mock user data
        setUserData({
          fullName: localStorage.getItem('userName') || '',
          email: localStorage.getItem('userEmail') || '',
          phone: localStorage.getItem('userPhone') || '',
          message: '',
        });
      }
    };
    
    checkLoggedInUser();
  }, []);
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', userData);
    // Here you would typically send the data to your backend
    alert('Form submitted successfully!');
  };
  
  // Mock login for demo purposes
  const handleMockLogin = () => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', 'John Doe');
    localStorage.setItem('userEmail', 'john.doe@example.com');
    localStorage.setItem('userPhone', '1234567890');
    setIsLoggedIn(true);
    setUserData({
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      message: '',
    });
  };
  
  // Mock logout for demo purposes
  const handleMockLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPhone');
    setIsLoggedIn(false);
    setUserData({
      fullName: '',
      email: '',
      phone: '',
      message: '',
    });
  };
  
  return (
    <Box
      sx={{
        position: isMobile ? 'static' : 'sticky',
        top: isMobile ? 'auto' : 24,
        width: '100%',
        zIndex: 10,
      }}
    >
      <Paper 
        sx={{ 
          p: 3, 
          borderRadius: 2, 
          bgcolor: 'white',
          boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
          width: '100%',
        }}
      >
        <Typography variant="h5" fontWeight="bold" mb={3}>
          {isLoggedIn ? 'Welcome Back!' : 'Join the Adventure'}
        </Typography>
        
        {/* For demo purposes only - these buttons toggle mock login state */}
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleMockLogin}
            disabled={isLoggedIn}
          >
            Demo: Login
          </Button>
          <Button 
            variant="outlined" 
            size="small" 
            onClick={handleMockLogout}
            disabled={!isLoggedIn}
          >
            Demo: Logout
          </Button>
        </Box>

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name*"
            variant="outlined"
            margin="normal"
            required
            size="small"
            name="fullName"
            value={userData.fullName}
            onChange={handleInputChange}
            disabled={isLoggedIn}
          />
          
          <TextField
            fullWidth
            label="Email*"
            variant="outlined"
            margin="normal"
            required
            type="email"
            size="small"
            name="email"
            value={userData.email}
            onChange={handleInputChange}
            disabled={isLoggedIn}
          />
          
          <TextField
            fullWidth
            label="Phone Number*"
            variant="outlined"
            margin="normal"
            required
            size="small"
            name="phone"
            value={userData.phone}
            onChange={handleInputChange}
            disabled={isLoggedIn}
          />
          
          <TextField
            fullWidth
            label="Message..."
            variant="outlined"
            margin="normal"
            multiline
            rows={4}
            size="small"
            name="message"
            value={userData.message}
            onChange={handleInputChange}
          />
          
          <Button 
            fullWidth 
            variant="contained" 
            color="primary" 
            sx={{ 
              mt: 2, 
              py: 1.5,
              fontWeight: 'bold',
              fontSize: '1rem'
            }}
            type="submit"
          >
            {isLoggedIn ? 'Send Message' : 'Register & Connect'}
          </Button>
          
          {!isLoggedIn && (
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
              By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
          )}
        </Box>
      </Paper>
      
      {/* Mobile sticky bottom bar - only visible on mobile */}
      {isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 2,
            boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight="bold">
              {wanderlistData.name}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {wanderlistData.city?.city}, {wanderlistData.city?.country}
            </Typography>
          </Box>
          <Box
            component="button"
            sx={{
              backgroundColor: 'primary.main',
              color: 'white',
              padding: '10px 20px',
              borderRadius: 1,
              border: 'none',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
            onClick={() => {
              // Scroll to user form
              const element = document.getElementById('wanderlist-user-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Connect
          </Box>
        </Box>
      )}
    </Box>
  );
}
