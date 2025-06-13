"use client";

import { 
  Box, 
  Container, 
  Typography, 
  Link as MuiLink, 
  Card, 
  Avatar,
  Stack
} from '@mui/material';
import Link from 'next/link';

export default function AboutClient() {
  const teamMembers = [
    {
      name: "Rahul Sharma",
      position: "Founder & CEO",
      image: "/team/ceo.jpg",
      bio: "Rahul has over 15 years of experience in the travel industry and founded Zingvel with a vision to transform how people experience travel."
    },
    {
      name: "Priya Patel",
      position: "Chief Operating Officer",
      image: "/team/coo.jpg",
      bio: "Priya oversees all operations at Zingvel, ensuring that we deliver exceptional experiences to our customers."
    },
    {
      name: "Amit Kumar",
      position: "Chief Technology Officer",
      image: "/team/cto.jpg",
      bio: "Amit leads our technology team, building innovative solutions that make travel planning seamless and enjoyable."
    },
    {
      name: "Neha Singh",
      position: "Head of Customer Experience",
      image: "/team/customer.jpg",
      bio: "Neha is dedicated to ensuring that every customer has a memorable and hassle-free experience with Zingvel."
    }
  ];

  return (
    <Box sx={{ py: 6 }}>
      <Container maxWidth="lg">
        {/* Breadcrumbs */}
        <Typography variant="body1" align="center" sx={{ mt: 4 }}>
          Don&apos;t hesitate to <MuiLink component={Link} href="/contact-us">contact us</MuiLink> if you have any questions or would like to learn more about Zingvel&apos;s mission and services.
        </Typography>

        {/* Hero Section */}
        <Box 
          sx={{ 
            position: 'relative', 
            height: { xs: 300, md: 400 }, 
            borderRadius: 2, 
            overflow: 'hidden',
            mb: 6
          }}
        >
          <Box 
            component="img"
            src="/about/hero.jpg" 
            alt="Zingvel Team"
            sx={{ 
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <Box 
            sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              bgcolor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              p: 4
            }}
          >
            <Typography variant="h2" component="h1" color="white" align="center" gutterBottom sx={{ fontWeight: 700 }}>
              About Zingvel
            </Typography>
            <Typography variant="h6" color="white" align="center" sx={{ maxWidth: 800 }}>
              Transforming the way people discover and experience travel
            </Typography>
          </Box>
        </Box>

        {/* Our Story Section */}
        <Box sx={{ mb: 8 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
            <Box sx={{ flex: 1 }}>
              <Box sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom>
                  Our Story
                </Typography>
                <Typography variant="body1" paragraph>
                  Zingvel was born out of a passion for authentic travel experiences. Our founders, avid travelers themselves, noticed a gap in the market for connecting travelers with genuine local experiences and reliable guides.
                </Typography>
                <Typography variant="body1" paragraph>
                  Founded in 2020, we&apos;ve grown from a small startup to a trusted platform connecting thousands of travelers with authentic experiences across India and Southeast Asia. Our mission is to make travel more meaningful, sustainable, and accessible for everyone.
                </Typography>
              </Box>
            </Box>
            <Box sx={{ flex: 1 }}>
              <Box 
                component="img"
                src="/about/story.jpg" 
                alt="Zingvel Story"
                sx={{ 
                  width: '100%',
                  height: 'auto',
                  borderRadius: 2
                }}
              />
            </Box>
          </Stack>
        </Box>

        {/* Our Mission Section */}
        <Box sx={{ mb: 8, bgcolor: 'background.paper', p: 4, borderRadius: 2 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700, textAlign: 'center' }}>
            Our Mission
          </Typography>
          <Typography variant="h6" paragraph align="center" sx={{ maxWidth: 800, mx: 'auto' }}>
            To empower travelers to discover authentic experiences that create lasting memories and meaningful connections with people and places around the world.
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} sx={{ maxWidth: "md" }}>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Authenticity
                  </Typography>
                  <Typography variant="body1">
                    We prioritize authentic experiences that showcase the true essence of a destination, going beyond tourist traps to reveal hidden gems and local perspectives.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Sustainability
                  </Typography>
                  <Typography variant="body1">
                    We are committed to promoting sustainable tourism practices that respect local communities, preserve cultural heritage, and minimize environmental impact.
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Box sx={{ mb: 4 }}>
                  <Typography variant="h5" component="h3" gutterBottom>
                    Innovation
                  </Typography>
                  <Typography variant="body1">
                    We continuously evolve our platform to enhance the travel experience, incorporating cutting-edge technology and innovative solutions to make travel planning seamless and enjoyable.
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* Our Team Section */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Team
          </Typography>
          <Typography paragraph color="text.secondary">
            Meet the passionate individuals behind Zingvel who work tirelessly to make your travel dreams a reality.
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, mt: 2 }}>
            {teamMembers.map((member, index) => (
              <Box key={index} sx={{ width: { xs: '100%', sm: '45%', md: '30%' } }}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar
                      src={member.image}
                      alt={member.name}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h6" component="h3" align="center">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary" align="center" gutterBottom>
                      {member.position}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" align="center">
                      {member.bio}
                    </Typography>
                  </Box>
                </Card>
              </Box>
            ))}
          </Box>
        </Box>

        {/* Join Us Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Join Our Journey
          </Typography>
          <Typography paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
            We&apos;re always looking for passionate individuals to join our team. If you&apos;re excited about transforming the travel industry and creating meaningful experiences, we&apos;d love to hear from you.
          </Typography>
          <MuiLink component={Link} href="/careers" underline="hover" sx={{ fontWeight: 600 }}>
            View Open Positions
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
