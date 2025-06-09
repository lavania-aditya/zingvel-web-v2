import React from 'react';
import { Box, Typography, TextField, Button, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { IPackageItem } from '@/interfaces/IPacakges';

interface PackageInquiryFormProps {
  packageData: IPackageItem;
}

const PackageInquiryForm: React.FC<PackageInquiryFormProps> = ({ packageData }) => {
  return (
    <Box 
      sx={{ 
        p: 3, 
        borderRadius: 2, 
        bgcolor: 'white',
        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            INR {packageData.salePrice.toLocaleString()}
          </Typography>
          {packageData.regularPrice !== packageData.salePrice && (
            <Box display="flex" alignItems="center" gap={1}>
              <Typography 
                variant="body2" 
                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
              >
                INR {packageData.regularPrice.toLocaleString()}
              </Typography>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: 'success.main',
                  bgcolor: 'success.light',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                  fontWeight: 'bold',
                }}
              >
                SAVE INR {(packageData.regularPrice - packageData.salePrice).toLocaleString()}
              </Typography>
            </Box>
          )}
        </Box>
        
        {packageData.rating > 0 && (
          <Box display="flex" alignItems="center" gap={0.5}>
            <Box 
              component="span" 
              sx={{ 
                bgcolor: 'success.main', 
                color: 'white', 
                px: 0.8, 
                py: 0.3, 
                borderRadius: 1,
                display: 'flex',
                alignItems: 'center',
                fontSize: '0.875rem',
                fontWeight: 'bold'
              }}
            >
              ★ {packageData.rating.toFixed(1)}
            </Box>
            <Typography variant="caption" color="text.secondary">
              ({Math.floor(Math.random() * 1000)})
            </Typography>
          </Box>
        )}
      </Box>

      <Box component="form" sx={{ mt: 3 }}>
        <TextField
          fullWidth
          label="Full Name*"
          variant="outlined"
          margin="normal"
          required
          size="small"
        />
        
        <TextField
          fullWidth
          label="Email*"
          variant="outlined"
          margin="normal"
          required
          type="email"
          size="small"
        />
        
        <Box display="flex" gap={2} mt={2}>
          <FormControl sx={{ width: '30%' }} size="small">
            <InputLabel id="country-code-label">+91</InputLabel>
            <Select
              labelId="country-code-label"
              id="country-code"
              value="+91"
              label="+91"
            >
              <MenuItem value="+91">+91</MenuItem>
              <MenuItem value="+1">+1</MenuItem>
              <MenuItem value="+44">+44</MenuItem>
            </Select>
          </FormControl>
          
          <TextField
            sx={{ width: '70%' }}
            label="Your Phone*"
            variant="outlined"
            required
            size="small"
          />
        </Box>
        
        <Box display="flex" gap={2} mt={2}>
          <TextField
            sx={{ width: '50%' }}
            label="Travel Date*"
            variant="outlined"
            required
            size="small"
            type="date"
            InputLabelProps={{ shrink: true }}
          />
          
          <TextField
            sx={{ width: '50%' }}
            label="Traveller Count*"
            variant="outlined"
            required
            size="small"
            type="number"
            InputProps={{
              inputProps: { min: 1 }
            }}
          />
        </Box>
        
        <TextField
          fullWidth
          label="Message..."
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          size="small"
        />
        
        <Button 
          fullWidth 
          variant="contained" 
          color="warning" 
          sx={{ 
            mt: 2, 
            py: 1.5,
            color: 'white',
            fontWeight: 'bold',
            fontSize: '1rem'
          }}
        >
          Send Enquiry
        </Button>
      </Box>
    </Box>
  );
};

export default PackageInquiryForm;
