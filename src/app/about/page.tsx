"use client";

import { 
  Box, 
  Container, 
  Typography, 
  Breadcrumbs, 
  Link as MuiLink, 
  Grid, 
  Card, 
  CardContent,
  CardMedia,
  Avatar,
  Divider
} from '@mui/material';
import Link from 'next/link';

export default function About() {
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
        <Breadcrumbs sx={{ mb: 4 }}>
          <MuiLink component={Link} href="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <Typography color="text.primary">About Us</Typography>
        </Breadcrumbs>

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
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Our Story
          </Typography>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography paragraph>
                Founded in 2020, Zingvel was born from a simple idea: travel should be more than just visiting places—it should be about creating meaningful experiences and connections.
              </Typography>
              <Typography paragraph>
                Our founder, Rahul Sharma, had spent years traveling the world and noticed a gap in the market. While there were plenty of travel booking platforms, none truly focused on curating unique, authentic experiences that would create lasting memories.
              </Typography>
              <Typography paragraph>
                Starting with just a small team of passionate travelers, Zingvel has grown into a platform that connects travelers with carefully selected experiences across the globe. We work directly with local partners to ensure that our customers get the most authentic and enriching travel experiences possible.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
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
            </Grid>
          </Grid>
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
            <Grid container spacing={4} maxWidth="md">
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Authenticity
                  </Typography>
                  <Typography>
                    We believe in real experiences that showcase the true essence of a destination.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Sustainability
                  </Typography>
                  <Typography>
                    We promote responsible travel that respects local communities and environments.
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
                    Innovation
                  </Typography>
                  <Typography>
                    We continuously evolve our platform to enhance the travel experience.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
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
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {teamMembers.map((member, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Card sx={{ height: '100%' }}>
                  <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar 
                      src={member.image} 
                      alt={member.name}
                      sx={{ width: 120, height: 120, mb: 2 }}
                    />
                    <Typography variant="h6" component="h3" align="center">
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" align="center" gutterBottom>
                      {member.position}
                    </Typography>
                    <Divider sx={{ width: '50%', my: 2 }} />
                    <Typography variant="body2" align="center">
                      {member.bio}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Join Us Section */}
        <Box sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" component="h2" gutterBottom sx={{ fontWeight: 700 }}>
            Join Our Journey
          </Typography>
          <Typography paragraph sx={{ maxWidth: 800, mx: 'auto' }}>
            We're always looking for passionate individuals to join our team. If you're excited about transforming the travel industry and creating meaningful experiences, we'd love to hear from you.
          </Typography>
          <MuiLink component={Link} href="/careers" underline="hover" sx={{ fontWeight: 600 }}>
            View Open Positions
          </MuiLink>
        </Box>
      </Container>
    </Box>
  );
}
