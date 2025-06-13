import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "zingvel-partner.s3.us-east-1.amazonaws.com",
      "images.unsplash.com"
    ],
  },
};

export default nextConfig;
