"use client";

import { Box, useTheme, Typography } from "@mui/material";
import { ChevronRight as ChevronRightIcon, Whatshot as TrendingIcon, TravelExplore as ExploreIcon } from "@mui/icons-material";
import Image from "next/image";
import { ICategoryItem } from "@/interfaces/IPacakges";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface IProps {
  categoriesData: ICategoryItem[];
}

const CategoryBar = (props: IProps) => {
  const theme = useTheme();

  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get("category");

  const categoryItem = (category: ICategoryItem | null, idx: number, exploreIcon?: boolean, showAllIcon?: boolean): React.ReactNode => {
    const isSelected = categoryParam === category?._id;
    return (
      <Box
        key={idx}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
          padding: 1,
          minWidth: 80,
          minHeight: 70,
          maxWidth: 80,
          maxHeight: 70,
          // backgroundColor: "red",
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: 2,
          // backgroun
        }}
        onClick={() => {
          if (category) {
            router.push(`/packages/category/${category?._id}`);
          } else if (showAllIcon) {
            router.push(`/package-categories`);
          } else {
            router.push(`/`);
          }
        }}
      >
        {/* Icon container with potential trending indicator */}

        {category && category.isTrending && (
          <Box
            sx={{
              position: "absolute",
              top: -10,
              right: -10,
              zIndex: 99,
              backgroundColor: theme.palette.primary.main,
              borderRadius: 2,
              width: 30,
              height: 30,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TrendingIcon sx={{ color: "white", fontSize: "0.875rem" }} />
          </Box>
        )}

        {exploreIcon ? (
          <ExploreIcon sx={{ color: theme.palette.text.secondary }} />
        ) : showAllIcon ? (
          <ChevronRightIcon sx={{ color: theme.palette.text.secondary }} />
        ) : category && category.icon ? (
          <Image src={category.icon} alt={category.name} width={24} height={24} />
        ) : (
          <Box sx={{ width: 24, height: 24, backgroundColor: "#f0f0f0" }} />
        )}
        {(exploreIcon || showAllIcon || category) && (
          <Typography
            variant="caption"
            sx={{
              textAlign: "center",
              fontWeight: isSelected ? 600 : 400,
              color: isSelected || (!isSelected && exploreIcon) ? theme.palette.primary.main : theme.palette.text.primary,
              maxWidth: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginTop: 1,
            }}
          >
            {exploreIcon ? "Explore" : showAllIcon ? "Show All" : category?.name || ""}
          </Typography>
        )}
      </Box>
    );
  };

  return (
    <Box
      sx={{
        // backgroundColor: theme.palette.background.paper,
        // pt: 5,
        // py: 5,
        // px: 2,
        // px: { xs: 2, md: 3 },
        // width: "100%",
        boxSizing: "border-box",
        // backgroundColor: "blue",
        position: "sticky",
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          maxWidth: "xl",
          // mx: "auto",
          // overflow: "hidden",
          pt: 4,
          pb: 2,
          // px: 2,
          // px: { xs: 2, md: 3 },
          // width: "100%",
          // boxSizing: "border-box",
          // backgroundColor: "red",
          // position: "sticky",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 2,
            overflowX: "auto",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            WebkitOverflowScrolling: "touch",
            "&::-webkit-scrollbar": { display: "none" },
            scrollbarWidth: "none",
            // msOverflowStyle: "none",
            // pr: 2,
            p: 0,
            pl: 15,
            pr: 2,
          }}
        >
          {categoryItem(null, -1, true)}
          {props.categoriesData.map((category: ICategoryItem, idx: number) => {
            return categoryItem(category, idx);
          })}

          {categoryItem(null, -2, false, true)}
        </Box>
      </Box>
    </Box>
  );
};

export default CategoryBar;
