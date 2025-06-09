'use client';

import { Box } from '@mui/material';
import { IPackageItem } from '@/interfaces/IPacakges';
import dynamic from 'next/dynamic';

// Dynamically import the sticky inquiry form component
const StickyInquiryForm = dynamic(() => import('@/components/StickyInquiryForm'), { ssr: false });

interface PackageDetailClientProps {
  packageData: IPackageItem;
}

export default function PackageDetailClient({ packageData }: PackageDetailClientProps) {
  return (
    <Box sx={{ width: { xs: '100%', md: '33.333%' } }} id="package-inquiry-form">
      <StickyInquiryForm packageData={packageData} />
    </Box>
  );
}
