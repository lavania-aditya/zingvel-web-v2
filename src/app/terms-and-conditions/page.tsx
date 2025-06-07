"use client";

import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function TermsAndConditions() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">Terms and Conditions</Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Terms and Conditions
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
            1. Introduction
          </Typography>
          <Typography paragraph>
            Welcome to Zingvel. These Terms and Conditions govern your use of our website and services. 
            By accessing or using Zingvel, you agree to be bound by these Terms. If you disagree with any 
            part of the terms, you may not access the service.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            2. Use of Our Services
          </Typography>
          <Typography paragraph>
            Our services are available for personal, non-commercial use. You must not modify, copy, 
            distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, 
            transfer, or sell any information, software, products or services obtained from our website.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            3. Booking and Reservations
          </Typography>
          <Typography paragraph>
            When making a booking through Zingvel, you agree to provide accurate and complete information. 
            All bookings are subject to availability and confirmation. Prices and availability may change 
            without notice prior to booking confirmation.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            4. Payment and Fees
          </Typography>
          <Typography paragraph>
            Payment terms vary depending on the service booked. All prices are displayed in the selected 
            currency and include applicable taxes unless stated otherwise. Additional fees such as service 
            charges, facility fees, or resort fees may apply and will be clearly disclosed before booking.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            5. Cancellations and Refunds
          </Typography>
          <Typography paragraph>
            Cancellation policies vary by service provider. Please review the specific cancellation policy 
            associated with your booking before confirming your reservation. Refunds, when applicable, will 
            be processed according to the stated policy.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            6. User Accounts
          </Typography>
          <Typography paragraph>
            When you create an account with us, you must provide accurate and complete information. You are 
            responsible for maintaining the confidentiality of your account and password and for restricting 
            access to your computer. You agree to accept responsibility for all activities that occur under 
            your account.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            7. Limitation of Liability
          </Typography>
          <Typography paragraph>
            Zingvel shall not be liable for any direct, indirect, incidental, special, consequential, or 
            punitive damages resulting from your use or inability to use the service, or for the cost of 
            procurement of substitute services.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            8. Changes to Terms
          </Typography>
          <Typography paragraph>
            We reserve the right to modify these terms at any time. We will provide notice of significant 
            changes by posting the new Terms on our website. Your continued use of the website after such 
            modifications constitutes your acceptance of the modified Terms.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            9. Governing Law
          </Typography>
          <Typography paragraph>
            These Terms shall be governed by the laws of India, without regard to its conflict of law provisions.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            10. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about these Terms, please contact us at legal@zingvel.com.
          </Typography>

          <Typography sx={{ mt: 6, fontStyle: 'italic' }}>
            Last updated: June 7, 2025
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
