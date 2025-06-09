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

// Import the PartnerBanner component wrapper

export default async function Home() {
  // Fetch categories and packages data server-side
  const categoriesResponse = await getAllCategories(1, 10);
  const packagesResponse = await getAllPackages(1, 12);
  const wanderlistResponse = await getTrendingWanderlistsService(9);

  const categoriesData: ICategoryItem[] = categoriesResponse?.content || [];
  const packagesData: IPackageItem[] = packagesResponse?.content || [];
  const wanderlistData: IWanderlistItem[] = wanderlistResponse || [];

  return (
    <>
      <Box sx={{ pb: { xs: 2, sm: 4 } }}>
        {/* Sticky Category Bar */}
        <CategoryBar categoriesData={categoriesData} />
        {/* Package Categories */}
        <Container sx={{ mt: 2, mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Exlore Packages
            </Typography>
            <Button size="small" variant="outlined">
              View All <ChevronRightIcon sx={{ fontSize: 20 }} />
            </Button>
          </Box>
          <Grid container spacing={2}>
            {packagesData.map((pkg) => (
              <Grid key={pkg.id} size={{ xs: 12, sm: 6, md: 4 }} sx={{}}>
                <PackageCard packageData={pkg} />
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Partner Banner */}
        <PartnerBannerWrapper />

        {/* Featured Destinations - App Style */}
        <Container sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" component="h2" fontWeight="bold">
              Popular Wanderlists
            </Typography>
            <Button size="small" variant="outlined">
              View All <ChevronRightIcon sx={{ fontSize: 20 }} />
            </Button>
          </Box>
          <Grid
            container
            spacing={2}
            // sx={{
            //   display: "flex",
            //   // gap: 2.5,
            //   flexWrap: "wrap",
            //   pb: 2,
            //   mx: -2,
            //   px: 2,
            //   // backgroundColor: "red",
            // }}
          >
            {wanderlistData.map((wanderlist) => (
              <Grid
                key={wanderlist.id}
                size={{ xs: 12, sm: 6, md: 4 }}
                sx={
                  {
                    // width: "100%",
                  }
                }
              >
                {/* <Item> */}
                <WanderlistCard wanderlistData={wanderlist} />
                {/* </Item> */}
              </Grid>
            ))}
          </Grid>
        </Container>

        {/* Download App Banner */}
        <DownloadAppBanner />
        
        {/* Get in Touch Section */}
        <Container sx={{ my: 6, py: 4 }}>
          <Card sx={{ borderRadius: 3, overflow: "hidden", boxShadow: 3 }}>
            <Box sx={{ p: { xs: 3, md: 5 } }}>
              <GetInTouchForm showTitle={true} showInquiryOptions={true} variant="full" />
            </Box>
          </Card>
        </Container>
      </Box>
    </>
  );
}
