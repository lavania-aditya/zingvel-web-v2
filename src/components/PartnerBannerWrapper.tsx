"use client";

import dynamic from "next/dynamic";

// Dynamically import the PartnerBanner component with no SSR
// This ensures it only renders on the client side to avoid hydration errors
const PartnerBanner = dynamic(() => import("@/components/PartnerBanner"), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: "200px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // margin: '2rem 0'
      }}
    >
      {/* Empty placeholder during loading to prevent layout shift */}
    </div>
  ),
});

export default function PartnerBannerWrapper() {
  return <PartnerBanner />;
}
