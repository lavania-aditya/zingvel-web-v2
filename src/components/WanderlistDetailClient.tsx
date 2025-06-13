"use client";

import { Box } from "@mui/material";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import dynamic from "next/dynamic";

// Dynamically import the common inquiry form component
const CommonInquiryForm = dynamic(() => import("@/components/CommonInquiryForm"), { ssr: false });

interface WanderlistDetailClientProps {
  wanderlistData: IWanderlistItem;
}

export default function WanderlistDetailClient({ wanderlistData }: WanderlistDetailClientProps) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "33.333%" },
        position: { xs: "static", md: "sticky" },
        top: { md: "24px" },
        alignSelf: "flex-start",
        height: "fit-content",
      }}
      id="wanderlist-user-form"
    >
      <CommonInquiryForm data={wanderlistData} type="wanderlist" formId="wanderlist-user-form" />
    </Box>
  );
}
