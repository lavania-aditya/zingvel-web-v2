"use client";

import { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs, 
  Link as MuiLink,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tabs,
  Tab
} from '@mui/material';
import Link from 'next/link';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`faq-tabpanel-${index}`}
      aria-labelledby={`faq-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ py: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function FAQ() {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const generalFaqs = [
    {
      question: "What is Zingvel?",
      answer: "Zingvel is a travel platform that helps you discover, plan, and book amazing travel experiences around the world. We offer curated travel packages, activities, and personalized recommendations to make your journey unforgettable."
    },
    {
      question: "How do I create an account?",
      answer: "Creating an account is easy! Click on the 'Login/Sign Up' button in the top right corner of our website, then select 'Create Account'. Fill in your details, verify your email address, and you're all set to start exploring."
    },
    {
      question: "Is my personal information secure?",
      answer: "Yes, we take data security very seriously. We use industry-standard encryption and security measures to protect your personal information. For more details, please refer to our Privacy Policy."
    },
    {
      question: "Can I use Zingvel on my mobile device?",
      answer: "Absolutely! Our website is fully responsive and works on all devices. We also have a mobile app available for download on iOS and Android for an even better experience on the go."
    },
    {
      question: "How can I contact customer support?",
      answer: "You can reach our customer support team 24/7 via email at support@zingvel.com, by phone at +91 98765 43210, or through the live chat feature on our website and app."
    }
  ];

  const bookingFaqs = [
    {
      question: "How do I book a travel package?",
      answer: "Browse our packages, select the one you're interested in, choose your preferred dates and options, and proceed to checkout. You can pay securely online and receive instant confirmation of your booking."
    },
    {
      question: "Can I customize a travel package?",
      answer: "Yes! Many of our packages offer customization options. Look for the 'Customize' button on the package details page. If you need further customization, please contact our customer service team."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit and debit cards, net banking, UPI, and select digital wallets. All payments are processed securely through our payment gateway."
    },
    {
      question: "Is there a booking fee?",
      answer: "We don't charge any additional booking fees. The price you see is the final price you pay, including all applicable taxes and fees."
    },
    {
      question: "Can I book for someone else?",
      answer: "Yes, you can book on behalf of others. During the booking process, you'll have the option to enter the traveler details, which can be different from the account holder's information."
    }
  ];

  const cancellationFaqs = [
    {
      question: "What is your cancellation policy?",
      answer: "Our cancellation policy varies depending on the package or activity. The specific policy will be clearly displayed before you complete your booking. Generally, cancellations made 30+ days before departure receive a full refund, while those made closer to the departure date may be subject to cancellation fees."
    },
    {
      question: "How do I cancel my booking?",
      answer: "To cancel a booking, log into your account, go to 'My Bookings', select the booking you wish to cancel, and click on the 'Cancel Booking' button. Follow the prompts to complete the cancellation process."
    },
    {
      question: "How long does it take to process a refund?",
      answer: "Refunds are typically processed within 5-7 business days. However, it may take an additional 3-5 business days for the funds to reflect in your account, depending on your bank or payment provider."
    },
    {
      question: "Can I get a refund if I need to cancel due to COVID-19?",
      answer: "We have special COVID-19 policies in place. If your travel plans are affected by COVID-19 related restrictions, please contact our customer support team as soon as possible for assistance."
    },
    {
      question: "Is travel insurance included in my booking?",
      answer: "Travel insurance is not automatically included but is highly recommended. We offer travel insurance options during the booking process, which can provide coverage for cancellations, medical emergencies, and other unforeseen circumstances."
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">Frequently Asked Questions</Typography>
        </Breadcrumbs>

        {/* Page Title */}
        <Typography variant="h3" component="h1" gutterBottom sx={{ fontWeight: 700 }}>
          Frequently Asked Questions
        </Typography>
        
        <Typography variant="subtitle1" color="text.secondary" paragraph>
          Find answers to common questions about Zingvel and our services. If you can't find what you're looking for, please contact our customer support team.
        </Typography>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
          <Tabs value={value} onChange={handleChange} aria-label="FAQ categories">
            <Tab label="General" />
            <Tab label="Booking" />
            <Tab label="Cancellation & Refunds" />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          {generalFaqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`general-faq-content-${index}`}
                id={`general-faq-header-${index}`}
              >
                <Typography fontWeight="600">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel value={value} index={1}>
          {bookingFaqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`booking-faq-content-${index}`}
                id={`booking-faq-header-${index}`}
              >
                <Typography fontWeight="600">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <TabPanel value={value} index={2}>
          {cancellationFaqs.map((faq, index) => (
            <Accordion key={index} sx={{ mb: 2 }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`cancellation-faq-content-${index}`}
                id={`cancellation-faq-header-${index}`}
              >
                <Typography fontWeight="600">{faq.question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </TabPanel>

        <Box sx={{ mt: 6, p: 3, bgcolor: 'background.paper', borderRadius: 2, boxShadow: 1 }}>
          <Typography variant="h6" gutterBottom>
            Still have questions?
          </Typography>
          <Typography paragraph>
            Our customer support team is available 24/7 to assist you with any questions or concerns.
          </Typography>
          <Typography>
            Email: <MuiLink href="mailto:support@zingvel.com">support@zingvel.com</MuiLink><br />
            Phone: +91 98765 43210
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
