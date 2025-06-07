"use client";

import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Grid,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { ChevronRight as ChevronRightIcon } from '@mui/icons-material';
import Link from 'next/link';
import PackageCard from './PackageCard';

// Sample package data
const packages = [
  {
    id: 1,
    title: 'Bali Beach Retreat',
    location: 'Bali, Indonesia',
    duration: '7 days',
    price: 1299,
    rating: 4.8,
    reviewCount: 245,
    discount: 15,
  },
  {
    id: 2,
    title: 'Paris City Explorer',
    location: 'Paris, France',
    duration: '5 days',
    price: 1499,
    rating: 4.5,
    reviewCount: 187,
  },
  {
    id: 3,
    title: 'Tokyo Adventure',
    location: 'Tokyo, Japan',
    duration: '8 days',
    price: 2199,
    rating: 4.9,
    reviewCount: 312,
    discount: 10,
  },
  {
    id: 4,
    title: 'New York City Break',
    location: 'New York, USA',
    duration: '4 days',
    price: 1099,
    rating: 4.6,
    reviewCount: 156,
  },
  {
    id: 5,
    title: 'Swiss Alps Hiking',
    location: 'Interlaken, Switzerland',
    duration: '6 days',
    price: 1799,
    rating: 4.7,
    reviewCount: 203,
    discount: 5,
  },
];

interface PackageCategoriesProps {
  title: string;
  viewAllLink: string;
}

const PackageCategories = ({ title, viewAllLink }: PackageCategoriesProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  
  // Calculate items per row based on screen size
  // Mobile: 1, Tablet: 2, Desktop: 3.2 (we'll handle the 0.2 with styling)
  const getItemsPerRow = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3; // We'll handle the 3.2 with styling
  };
  
  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" component="h2" fontWeight="bold">
          {title}
        </Typography>
        <Button 
          component={Link}
          href={viewAllLink}
          endIcon={<ChevronRightIcon />}
          sx={{ fontWeight: 500 }}
        >
          View All
        </Button>
      </Box>
      
      <Box
        sx={{
          display: 'flex',
          gap: 2.5,
          overflowX: 'auto',
          pb: 2,
          mx: -2,
          px: 2,
          // Hide scrollbar but keep functionality
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {packages.map((pkg) => (
          <Box
            key={pkg.id}
            sx={{
              width: {
                xs: 'calc(100% - 16px)', // Mobile: 1 per row
                sm: 'calc(50% - 20px)',  // Tablet: 2 per row
                md: 'calc(31% - 20px)',  // Desktop: ~3.2 per row
              },
              minWidth: {
                xs: 'calc(100% - 16px)',
                sm: 'calc(50% - 20px)',
                md: 'calc(31% - 20px)',
              },
              flexShrink: 0,
            }}
          >
            <PackageCard {...pkg} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default PackageCategories;
