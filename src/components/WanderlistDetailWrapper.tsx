"use client";

import { IWanderlistItem } from "@/interfaces/IWanderlist";
import dynamic from "next/dynamic";

// Dynamically import the client component with ssr: false
const WanderlistDetailClient = dynamic(() => import("@/components/WanderlistDetailClient"), { ssr: false });

interface WanderlistDetailWrapperProps {
  wanderlistData: IWanderlistItem;
}

export default function WanderlistDetailWrapper({ wanderlistData }: WanderlistDetailWrapperProps) {
  return (
    // <Box sx={{ width: { xs: '100%', md: '33.333%' } }}>
    <WanderlistDetailClient wanderlistData={wanderlistData} />
    // </Box>
  );
}
