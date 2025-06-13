"use client";

import { Container } from "@mui/material";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ProfileClient from "@/components/ProfileClient";

export default function ProfilePage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/");
    }
  }, [isAuthenticated, router]);

  return (
    <Container maxWidth="lg" sx={{ pb: 4, pt: 0, px: 0 }}>
      {/* <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" fontWeight="bold">
          Edit Profile
        </Typography>
      </Box> */}
      <ProfileClient />
    </Container>
  );
}
