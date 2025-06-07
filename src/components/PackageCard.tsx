"use client";

import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Box, 
  Chip, 
  Rating, 
  useTheme 
} from '@mui/material';
import { 
  LocationOn as LocationIcon,
  AccessTime as TimeIcon
} from '@mui/icons-material';
import Link from 'next/link';

interface PackageCardProps {
  id: number;
  title: string;
  location: string;
  duration: string;
  price: number;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
  discount?: number;
}

const PackageCard = ({
  id,
  title,
  location,
  duration,
  price,
  rating,
  reviewCount,
  imageUrl,
  discount
}: PackageCardProps) => {
  const theme = useTheme();
  
  return (
    <Card 
      component={Link}
      href={`/packages/${id}`}
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: theme.shadows[2],
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="div"
          sx={{
            height: 200,
            backgroundColor: imageUrl ? 'transparent' : theme.palette.primary.main,
            backgroundImage: imageUrl ? `url(${imageUrl})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {discount && discount > 0 && (
          <Chip
            label={`${discount}% OFF`}
            color="error"
            size="small"
            sx={{
              position: 'absolute',
              top: 12,
              left: 12,
              fontWeight: 'bold',
            }}
          />
        )}
        
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
            p: 2,
            pt: 3,
          }}
        >
          <Typography variant="h6" component="h3" sx={{ color: 'white', fontWeight: 'bold' }}>
            {title}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
            <LocationIcon sx={{ color: 'white', fontSize: '0.875rem', mr: 0.5, opacity: 0.9 }} />
            <Typography variant="body2" sx={{ color: 'white', opacity: 0.9 }}>
              {location}
            </Typography>
          </Box>
        </Box>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <TimeIcon sx={{ color: 'text.secondary', fontSize: '0.875rem', mr: 0.5 }} />
          <Typography variant="body2" color="text.secondary">
            {duration}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Rating 
            value={rating} 
            precision={0.5} 
            size="small" 
            readOnly 
            sx={{ mr: 1, color: theme.palette.primary.main }} 
          />
          <Typography variant="body2" color="text.secondary">
            ({reviewCount})
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'baseline', mt: 1 }}>
          <Typography variant="h6" component="span" color="primary" fontWeight="bold">
            ${price.toLocaleString()}
          </Typography>
          {discount && discount > 0 && (
            <Typography 
              variant="body2" 
              component="span" 
              color="text.secondary" 
              sx={{ ml: 1, textDecoration: 'line-through' }}
            >
              ${Math.round(price / (1 - discount / 100)).toLocaleString()}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
            per person
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
