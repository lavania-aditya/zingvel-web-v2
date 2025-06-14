"use client";

import React, { useState, useRef, useCallback } from "react";
import { Box, Container, Typography } from "@mui/material";
import WanderlistCard from "./WanderlistCard";
import ShimmerCard from "./ShimmerCard";
import { getAllWanderlistsService } from "@/services/SWanderlist";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import { useToast } from "@/context/ToastContext";
import theme from "@/utils/theme";

interface WanderlistsClientProps {
  initialData: {
    items: IWanderlistItem[];
    meta: {
      totalItems: number;
      itemCount: number;
      itemsPerPage: number;
      totalPages: number;
      currentPage: number;
    };
  };
}

export default function WanderlistsClient({ initialData }: WanderlistsClientProps) {
  const [wanderlists, setWanderlists] = useState<IWanderlistItem[]>(initialData.items || []);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(initialData.meta.currentPage < initialData.meta.totalPages);
  const [, setMeta] = useState(initialData.meta);
  const observer = useRef<IntersectionObserver | null>(null);
  const { showToast } = useToast();

  // Wrap loadMoreWanderlists in useCallback to avoid dependency issues
  const loadMoreWanderlists = useCallback(async () => {
    if (!hasMore || loading) return;

    try {
      setLoading(true);
      const nextPage = page + 1;
      const response = await getAllWanderlistsService(nextPage, 12);

      if (response && response.items) {
        setWanderlists((prev) => [...prev, ...response.items]);
        setPage(nextPage);
        setMeta(response.meta);
        setHasMore(response.meta.currentPage < response.meta.totalPages);
      }
    } catch (error) {
      console.error("Error loading more wanderlists:", error);
      showToast("Failed to load more wanderlists", "error");
    } finally {
      setLoading(false);
    }
  }, [hasMore, loading, page, showToast]);

  // Last element ref for infinite scrolling
  const lastWanderlistElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreWanderlists();
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, loadMoreWanderlists]
  );

  // Function moved above to fix dependency order

  const handleAddToWanderlist = () => {
    // This would typically add the wanderlist to the user's collection
    // For now, just show a toast notification
    showToast("Added to your wanderlists", "success");
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: "bold" }}>
        Explore Wanderlists
      </Typography>

      {wanderlists.length === 0 && !loading ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No wanderlists found
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", margin: 0 }}>
          {wanderlists.map((wanderlist, index) => {
            const isLastElement = index === wanderlists.length - 1;

            return (
              <Box
                key={wanderlist.id}
                sx={{
                  padding: 1.5,
                  width: { xs: "100%", sm: "50%", md: "33.333%" },
                  flexGrow: 0,
                }}
              >
                <Box ref={isLastElement ? lastWanderlistElementRef : null} sx={{ height: "100%" }}>
                  <Box
                    component="a"
                    href={`/wanderlist/${wanderlist.id}`}
                    sx={{
                      textDecoration: "none",
                      display: "block",
                      height: "100%",
                    }}
                  >
                    <WanderlistCard wanderlistData={wanderlist} onAddToWanderlist={handleAddToWanderlist} />
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      )}

      {loading && (
        <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", mt: 2 }}>
          {[...Array(3)].map((_, index) => (
            <Box
              key={`shimmer-${index}`}
              sx={{
                padding: 1.5,
                width: { xs: "100%", sm: "50%", md: "33.333%" },
                flexGrow: 0,
              }}
            >
              <ShimmerCard />
            </Box>
          ))}
        </Box>
      )}

      {!hasMore && wanderlists.length > 0 && (
        <Box sx={{ textAlign: "center", mt: 4, backgroundColor: theme.palette.background.default, py: 2 }}>
          <Typography variant="body1" color="text.secondary">
            You&apos;ve reached the end of the list
          </Typography>
        </Box>
      )}
    </Container>
  );
}
