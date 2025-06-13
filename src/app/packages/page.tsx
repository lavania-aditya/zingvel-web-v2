import React from "react";
import { Container, Box, Typography, Grid } from "@mui/material";
import { IPackageItem, ICategoryItem } from "../../interfaces/IPacakges";
import PackageCard from "../../components/PackageCard";
import CategoryBar from "../../components/CategoryBar";
import Link from "next/link";
import { getAllCategories, getAllPackages } from "@/services/SPackage";

// Helper function to group packages by category
const groupPackagesByCategory = (packages: IPackageItem[], categories: ICategoryItem[]) => {
  // Create a map of category IDs to category objects
  const categoryMap = new Map<string, ICategoryItem>();
  categories.forEach((category) => {
    categoryMap.set(category._id, category);
  });

  // Create a map to store packages by category
  const packagesByCategory = new Map<string, IPackageItem[]>();

  // Initialize with empty arrays for each category
  categories.forEach((category) => {
    packagesByCategory.set(category._id, []);
  });

  // Special category for packages without a category
  const otherPackages: IPackageItem[] = [];

  // Group packages by their categories
  packages.forEach((pkg) => {
    if (pkg.categories && pkg.categories.length > 0) {
      pkg.categories.forEach((categoryId) => {
        if (packagesByCategory.has(categoryId)) {
          const categoryPackages = packagesByCategory.get(categoryId) || [];
          packagesByCategory.set(categoryId, [...categoryPackages, pkg]);
        }
      });
    } else {
      otherPackages.push(pkg);
    }
  });

  // Convert to array format for easier rendering
  const result = Array.from(packagesByCategory.entries())
    .map(([categoryId, packages]) => ({
      category: categoryMap.get(categoryId),
      packages,
    }))
    .filter((group) => group.packages.length > 0 && group.category); // Only include non-empty categories

  return { categorizedPackages: result, otherPackages };
};

export default async function PackagesPage({ searchParams }: { searchParams: { category?: string } }) {
  const categoryParam = searchParams.category;

  // Fetch categories and packages data server-side
  const categoriesResponse = await getAllCategories(1, 10);
  const packagesResponse = await getAllPackages(1, 10);

  const categoriesData: ICategoryItem[] = categoriesResponse.items || [];
  const packagesData: IPackageItem[] = packagesResponse.items || [];

  // Filter packages by category if a category parameter is provided
  let filteredPackages = packagesData;
  if (categoryParam) {
    filteredPackages = packagesData.filter((pkg) => pkg.categories && pkg.categories.includes(categoryParam));
  }

  const groupedPackages = groupPackagesByCategory(filteredPackages, categoriesData);

  return (
    <>
      {/* Sticky Category Bar - positioned outside normal flow */}
      <Box
        sx={{
          width: "100%",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          left: 0,
          right: 0,
        }}
      >
        <CategoryBar categoriesData={categoriesData} />
      </Box>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
          Travel Packages
        </Typography>

        {/* Render packages by category */}
        {groupedPackages.categorizedPackages.map((group, index) => (
          <Box key={group.category?._id || index} sx={{ mb: 6 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Typography variant="h5" component="h2" fontWeight={600}>
                {group.category?.name}
              </Typography>
              {group.packages.length > 3 && (
                <Link href={`/category/${group.category?.slug}`} passHref style={{ textDecoration: "none" }}>
                  <Typography color="primary" sx={{ cursor: "pointer" }}>
                    See all &gt;
                  </Typography>
                </Link>
              )}
            </Box>

            <Grid container spacing={3}>
              {group.packages.slice(0, 3).map((pkg) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg._id}>
                  <PackageCard packageData={pkg} />
                </Grid>
              ))}
            </Grid>
          </Box>
        ))}

        {/* Render other packages */}
        {groupedPackages.otherPackages.length > 0 && (
          <Box sx={{ mt: 6 }}>
            <Typography variant="h5" component="h2" fontWeight={600} sx={{ mb: 2 }}>
              Other Packages
            </Typography>

            <Grid container spacing={3}>
              {groupedPackages.otherPackages.map((pkg) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={pkg._id}>
                  <PackageCard packageData={pkg} />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Show message if no packages */}
        {groupedPackages.categorizedPackages.length === 0 && groupedPackages.otherPackages.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6">No packages available at the moment.</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}
