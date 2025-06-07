"use client";

import { useState } from "react";
import { Button, Paper, TextField } from "@mui/material";
import { TravelExplore as ExploreIcon } from "@mui/icons-material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ErrorPage from "@/components/ErrorPage";
import { ErrorCategory } from "@/utils/errorHandling";

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search page with query
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Create custom search component for the 404 page
  const searchComponent = (
    <Paper
      component="form"
      onSubmit={handleSearch}
      elevation={1}
      sx={{
        p: "2px 4px",
        display: "flex",
        width: "100%",
        maxWidth: 500,
        mb: 4,
        mt: 2,
        borderRadius: 2,
      }}
    >
      <TextField
        placeholder="Search for destinations or experiences"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        variant="outlined"
        fullWidth
        sx={{ "& fieldset": { border: "none" } }}
        // startAdornment={
        //   <InputAdornment position="start">
        //     <SearchIcon color="action" />
        //   </InputAdornment>
        // }
        // endAdornment={
        //   searchQuery && (
        //     <InputAdornment position="end">
        //       <Button type="submit" variant="contained" size="small" sx={{ borderRadius: 1 }}>
        //         Search
        //       </Button>
        //     </InputAdornment>
        //   )
        // }
      />
    </Paper>
  );

  // Create custom explore button for destinations
  const exploreButton = (
    <Link href="/destinations" style={{ textDecoration: "none" }}>
      <Button variant="outlined" size="large" startIcon={<ExploreIcon />}>
        Explore Destinations
      </Button>
    </Link>
  );

  return (
    <ErrorPage
      statusCode={404}
      title="Page Not Found"
      message="We couldn't find the page you're looking for. The page might have been removed, had its name changed, or is temporarily unavailable."
      errorCategory={ErrorCategory.UNKNOWN}
      showHomeButton={true}
      showBackButton={true}
      showRetryButton={false}
      fullHeight={true}
      customButtons={exploreButton}
    >
      {searchComponent}
    </ErrorPage>
  );
}
