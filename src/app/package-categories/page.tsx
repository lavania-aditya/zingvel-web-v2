import React from "react";
import { Container, Box, Typography, Card, CardContent } from "@mui/material";
import { getAllCategories } from "@/services/SPackage";
import { ICategoryItem } from "@/interfaces/IPacakges";
import Image from "next/image";
import Link from "next/link";
import { TrendingUp as TrendingIcon } from "@mui/icons-material";

export default async function PackageCategoriesPage() {
  // Fetch categories data server-side
  const categoriesResponse = await getAllCategories(1, 20);
  const categoriesData: ICategoryItem[] = categoriesResponse.items || [];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        All Categories
      </Typography>

      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
        {categoriesData.map((category) => (
          <Box key={category._id}>
            <Link href={`/packages?category=${category._id}`} passHref style={{ textDecoration: "none" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0,0,0,0.12)",
                  },
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                {category.isTrending && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      backgroundColor: "#FF6B00",
                      borderRadius: "50%",
                      width: 24,
                      height: 24,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      zIndex: 1,
                    }}
                  >
                    <TrendingIcon sx={{ color: "white", fontSize: 16 }} />
                  </Box>
                )}
                <Box
                  sx={{
                    position: "relative",
                    height: 180,
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#f5f5f5",
                  }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "16px",
                      border: `1px solid #e0e0e0`,
                      backgroundColor: "white",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={category.icon}
                      alt={category.name}
                      width={40}
                      height={40}
                      style={{
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ flexGrow: 1, textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    component="h2"
                    gutterBottom
                    sx={{
                      fontWeight: 600,
                      color: "#333333",
                    }}
                  >
                    {category.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                    }}
                  >
                    {category.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
