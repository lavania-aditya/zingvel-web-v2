import { Metadata } from "next";
import { Box, Button, Container, Typography, Card, Grid } from "@mui/material";
import GetInTouchForm from "@/components/GetInTouchForm";
import { ChevronRight as ChevronRightIcon } from "@mui/icons-material";
import CategoryBar from "@/components/CategoryBar";
import PackageCard from "@/components/PackageCard";
import { getAllCategories, getAllPackages } from "@/services/SPackage";
import { ICategoryItem, IPackageItem } from "@/interfaces/IPacakges";
import WanderlistCard from "@/components/WanderlistCard";
import { getTrendingWanderlistsService } from "@/services/SWanderlist";
import { IWanderlistItem } from "@/interfaces/IWanderlist";
import PartnerBannerWrapper from "@/components/PartnerBannerWrapper";
import DownloadAppBanner from "@/components/DownloadAppBanner";
import CreateWanderlistBanner from "@/components/CreateWanderlistBanner";
import ExploreAllCta from "@/components/ExploreAllCta";
import TravelPackageIcon from "@/components/icons/TravelPackageIcon";
import WanderlistIcon from "@/components/icons/WanderlistIcon";

export const metadata: Metadata = {
  title: "Zingvel | Discover Authentic Travel Experiences",
  description:
    "Find and book unique travel experiences, packages, and adventures with Zingvel. Connect with local guides and create unforgettable memories.",
  openGraph: {
    title: "Zingvel | Discover Authentic Travel Experiences",
    description: "Find and book unique travel experiences, packages, and adventures with Zingvel.",
    images: ["/og-image.jpg"],
  },
};

export default async function Home() {
  // Fetch categories and packages data server-side
  const categoriesResponse = await getAllCategories(1, 10);
  const packagesResponse = await getAllPackages(1, 12);
  const wanderlistResponse = await getTrendingWanderlistsService(9);

  const categoriesData: ICategoryItem[] = categoriesResponse?.items || [];
  const packagesData: IPackageItem[] = packagesResponse?.items || [];
  const wanderlistData: IWanderlistItem[] = wanderlistResponse || [];

  return (
    <>
      <Box sx={{ pb: { xs: 2, sm: 4 } }}>
        {/* Sticky Category Bar */}
        <CategoryBar categoriesData={categoriesData} />
        {/* Package Categories */}
        <Container sx={{ my: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Explore Packages
            </Typography>
            <Button size="small" variant="outlined">
              View All <ChevronRightIcon sx={{ fontSize: 20 }} />
            </Button>
          </Box>
          <Grid container spacing={2}>
            {packagesData.map((pkg) => (
              <Grid key={pkg._id} size={{ xs: 12, sm: 6, md: 4 }} sx={{}}>
                <PackageCard packageData={pkg} />
              </Grid>
            ))}
          </Grid>
          
          {/* Explore All Packages CTA */}
          <ExploreAllCta 
            title="Explore All Travel Packages" 
            icon={<TravelPackageIcon fontSize="large" />} 
            href="/packages" 
          />
        </Container>

        {/* Create Wanderlist Banner */}
        <CreateWanderlistBanner />

        {/* Featured Destinations - App Style */}
        <Container sx={{ my: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h2" component="h2" fontWeight="bold">
              Popular Wanderlists
            </Typography>
            <Button size="small" variant="outlined">
              View All <ChevronRightIcon sx={{ fontSize: 20 }} />
            </Button>
          </Box>
          <Grid container spacing={2}>
            {wanderlistData.map((wanderlist) => (
              <Grid
                key={wanderlist.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={{}}
              >
                <WanderlistCard wanderlistData={wanderlist} />
              </Grid>
            ))}
          </Grid>
          
          {/* Explore All Wanderlists CTA */}
          <ExploreAllCta 
            title="Discover All Wanderlists" 
            icon={<WanderlistIcon fontSize="large" />} 
            href="/wanderlists" 
          />
        </Container>

        {/* Download App Banner */}
        <DownloadAppBanner />

        {/* Get in Touch Section */}
        <Container sx={{ my: 4 }}>
          <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <GetInTouchForm showTitle={true} showInquiryOptions={true} variant="full" />
            </Box>
          </Card>
        </Container>

        {/* Partner Banner */}
        <PartnerBannerWrapper />
      </Box>
    </>
  );
}
