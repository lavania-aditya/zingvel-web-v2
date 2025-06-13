import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Zingvel',
  description: 'Learn how Zingvel collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.',
  openGraph: {
    title: 'Privacy Policy | Zingvel',
    description: 'Learn how Zingvel collects, uses, and protects your personal information. Read our privacy policy for details on data handling and your rights.',
    images: ['/legal/privacy-policy.jpg'],
  },
};

"use client";

import { Box, Container, Typography, Breadcrumbs, Link as MuiLink } from '@mui/material';
import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">Privacy Policy</Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Privacy Policy
        </Typography>

        <Box sx={{ mt: 4 }}>
          <Typography paragraph>
            Last updated: June 7, 2025
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            1. Introduction
          </Typography>
          <Typography paragraph>
            At Zingvel, we respect your privacy and are committed to protecting your personal data. 
            This privacy policy will inform you about how we look after your personal data when you 
            visit our website and tell you about your privacy rights and how the law protects you.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            2. The Data We Collect About You
          </Typography>
          <Typography paragraph>
            Personal data means any information about an individual from which that person can be identified. 
            We may collect, use, store and transfer different kinds of personal data about you including:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li"><Typography>Identity Data: including first name, last name, username or similar identifier</Typography></Box>
            <Box component="li"><Typography>Contact Data: including email address, telephone numbers, and address</Typography></Box>
            <Box component="li"><Typography>Financial Data: including payment card details</Typography></Box>
            <Box component="li"><Typography>Transaction Data: including details about payments to and from you</Typography></Box>
            <Box component="li"><Typography>Technical Data: including internet protocol (IP) address, browser type and version</Typography></Box>
            <Box component="li"><Typography>Profile Data: including your username and password, purchases or orders made by you</Typography></Box>
            <Box component="li"><Typography>Usage Data: including information about how you use our website and services</Typography></Box>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            3. How We Use Your Personal Data
          </Typography>
          <Typography paragraph>
            We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li"><Typography>To register you as a new customer</Typography></Box>
            <Box component="li"><Typography>To process and deliver your booking</Typography></Box>
            <Box component="li"><Typography>To manage our relationship with you</Typography></Box>
            <Box component="li"><Typography>To improve our website, products/services, marketing or customer relationships</Typography></Box>
            <Box component="li"><Typography>To recommend products or services that may be of interest to you</Typography></Box>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            4. Data Security
          </Typography>
          <Typography paragraph>
            We have put in place appropriate security measures to prevent your personal data from being 
            accidentally lost, used or accessed in an unauthorized way, altered or disclosed. We limit 
            access to your personal data to those employees, agents, contractors and other third parties 
            who have a business need to know.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            5. Data Retention
          </Typography>
          <Typography paragraph>
            We will only retain your personal data for as long as necessary to fulfill the purposes we 
            collected it for, including for the purposes of satisfying any legal, accounting, or reporting 
            requirements.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            6. Your Legal Rights
          </Typography>
          <Typography paragraph>
            Under certain circumstances, you have rights under data protection laws in relation to your personal data, including:
          </Typography>
          <Box component="ul" sx={{ pl: 4 }}>
            <Box component="li"><Typography>Request access to your personal data</Typography></Box>
            <Box component="li"><Typography>Request correction of your personal data</Typography></Box>
            <Box component="li"><Typography>Request erasure of your personal data</Typography></Box>
            <Box component="li"><Typography>Object to processing of your personal data</Typography></Box>
            <Box component="li"><Typography>Request restriction of processing your personal data</Typography></Box>
            <Box component="li"><Typography>Request transfer of your personal data</Typography></Box>
            <Box component="li"><Typography>Right to withdraw consent</Typography></Box>
          </Box>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            7. Cookies
          </Typography>
          <Typography paragraph>
            Our website uses cookies to distinguish you from other users of our website. This helps us to 
            provide you with a good experience when you browse our website and also allows us to improve our site.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            8. Changes to the Privacy Policy
          </Typography>
          <Typography paragraph>
            We may update our privacy policy from time to time. We will notify you of any changes by posting 
            the new privacy policy on this page and updating the &quot;Last updated&quot; date.
          </Typography>

          <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mt: 4 }}>
            9. Contact Us
          </Typography>
          <Typography paragraph>
            If you have any questions about this privacy policy or our privacy practices, please contact us at:
          </Typography>
          <Typography paragraph>
            Email: privacy@zingvel.com<br />
            Phone: +91 98765 43210<br />
            Address: 123 Travel Street, Suite 101, Mumbai, Maharashtra 400001, India
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
