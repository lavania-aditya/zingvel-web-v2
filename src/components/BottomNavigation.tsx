"use client";

import { useState, useEffect, useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { 
  BottomNavigation as MuiBottomNavigation, 
  BottomNavigationAction, 
  Paper, 
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  Home as HomeIcon,
  Luggage as LuggageIcon,
  Collections as WanderlistsIcon,
  ContactSupport as InquiriesIcon
} from '@mui/icons-material';
import Link from 'next/link';

const BottomNavigation = () => {
  const pathname = usePathname();
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));
  const [value, setValue] = useState(0);

  // Navigation items with their paths and icons - wrapped in useMemo to prevent unnecessary re-renders
  const navItems = useMemo(() => [
    { label: 'Home', path: '/', icon: <HomeIcon /> },
    { label: 'Packages', path: '/packages', icon: <LuggageIcon /> },
    { label: 'Wanderlists', path: '/wanderlists', icon: <WanderlistsIcon /> },
    { label: 'Inquiries', path: '/inquiries', icon: <InquiriesIcon /> },
  ], []);

  // Check if we should hide the bottom bar on certain pages
  const shouldHideBottomBar = useMemo(() => {
    // Hide on package detail pages
    if (pathname.startsWith('/package/')) {
      return true;
    }
    // Hide on wanderlist detail pages
    if (pathname.startsWith('/wanderlist/')) {
      return true;
    }
    return false;
  }, [pathname]);

  // Update the selected value based on the current pathname
  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.path === pathname);
    if (currentIndex !== -1) {
      setValue(currentIndex);
    }
  }, [pathname, navItems]);

  // Don't render on larger screens or on pages where bottom bar should be hidden
  if (!isMobileOrTablet || shouldHideBottomBar) {
    return null;
  }

  return (
    <Paper 
      sx={{ 
        position: 'fixed', 
        bottom: 0, 
        left: 0, 
        right: 0, 
        zIndex: 1000,
        // Ensure it's above other content but below modals
      }} 
      elevation={3}
    >
      <MuiBottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
      >
        {navItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.path}
          />
        ))}
      </MuiBottomNavigation>
    </Paper>
  );
};

export default BottomNavigation;
