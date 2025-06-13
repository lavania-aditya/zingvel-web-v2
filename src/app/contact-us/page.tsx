import { Metadata } from 'next';
import ContactUsClient from '../../components/ContactUsClient';

export const metadata: Metadata = {
  title: 'Contact Us | Zingvel',
  description: 'Get in touch with Zingvel travel experts. Contact us for inquiries, support, or partnership opportunities.',
  openGraph: {
    title: 'Contact Us | Zingvel',
    description: 'Get in touch with Zingvel travel experts. Contact us for inquiries, support, or partnership opportunities.',
    images: ['/contact/hero.jpg'],
  },
};

export default function ContactUsPage() {
  return <ContactUsClient />;
}

import GetInTouchForm from '@/components/GetInTouchForm';
import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs, 
  Link as MuiLink,
  Paper,
} from '@mui/material';
import Link from 'next/link';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ContactUs() {

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

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '7fr 5fr' }, gap: 4, mt: 2 }}>
          {/* Contact Form */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <GetInTouchForm showTitle={false} showInquiryOptions={false} variant="compact" />
          </Paper>
          
          {/* Contact Information */}
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, height: '100%' }}>
            <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
              Contact Information
            </Typography>
            
            <Box sx={{ display: 'flex', mb: 3 }}>
              <LocationOnIcon sx={{ color: 'primary.main', mr: 2, fontSize: 28 }} />
              <Box>
                <Typography variant="subtitle1" fontWeight="600">
                  Our Location
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  123 Travel Street, Suite 100<br />
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
                  Booking Inquiries: +91 98765 43211<br />
                  Corporate Office: +91 98765 43212
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
        </Box>
        
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
    </Box>
  );
}
