'use client';

import React from 'react';
import { Box } from '@mui/material';
import { IPackageItem } from '@/interfaces/IPacakges';
import PackageInquiryForm from './PackageInquiryForm';
import { useMediaQuery, useTheme } from '@mui/material';

interface StickyInquiryFormProps {
  packageData: IPackageItem;
}

export default function StickyInquiryForm({ packageData }: StickyInquiryFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  
  return (
    <Box
      sx={{
        position: isMobile ? 'static' : 'sticky',
        top: isMobile ? 'auto' : 24,
        width: '100%',
        zIndex: 10,
      }}
    >
      <PackageInquiryForm packageData={packageData} />
      
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
            <Box sx={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
              ₹{packageData.salePrice}
            </Box>
            <Box sx={{ textDecoration: 'line-through', color: 'text.secondary', fontSize: '0.9rem' }}>
              ₹{packageData.regularPrice}
            </Box>
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
              // Scroll to inquiry form
              const element = document.getElementById('package-inquiry-form');
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Send Inquiry
          </Box>
        </Box>
      )}
    </Box>
  );
}
