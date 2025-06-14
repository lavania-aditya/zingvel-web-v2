"use client";

import { Box } from "@mui/material";
import { IPackageItem } from "@/interfaces/IPacakges";
import dynamic from "next/dynamic";

// Dynamically import the common inquiry form component
const PackageInquiryForm = dynamic(() => import("@/components/PackageInquiryForm"), { ssr: false });

interface PackageDetailClientProps {
  packageData: IPackageItem;
}

export default function PackageDetailClient({ packageData }: PackageDetailClientProps) {
  return (
    <Box
      sx={{
        width: { xs: "100%", md: "33.333%" },
        position: { xs: "static", md: "sticky" },
        top: { md: "24px" },
        alignSelf: "flex-start",
        height: "fit-content",
      }}
      id="package-inquiry-form"
    >
      <PackageInquiryForm data={packageData} />
    </Box>
  );
}
