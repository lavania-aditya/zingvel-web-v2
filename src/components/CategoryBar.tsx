"use client";

import { Box, Button, useTheme, useMediaQuery, Typography } from "@mui/material";
import { ChevronRight as ChevronRightIcon, TrendingUp as TrendingIcon } from "@mui/icons-material";
import Link from "next/link";
import Image from "next/image";
import { ICategoryItem } from "@/interfaces/IPacakges";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

interface IProps {
  categoriesData: ICategoryItem[];
}

const CategoryBar = (props: IProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("id");

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          py: 1.5,
          px: { xs: 2, md: 3 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            maxWidth: "xl",
            mx: "auto",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              overflowX: "auto",
              flexGrow: 1,
              WebkitOverflowScrolling: "touch",
              "&::-webkit-scrollbar": { display: "none" },
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              pr: 2,
            }}
          >
            {props.categoriesData.map((category: ICategoryItem, idx: number) => {
              return (
                <Box
                  key={idx}
                  sx={{
                    border: "1px solid",
                    borderRadius: "10px",
                    px: 2.5,
                    py: 1,
                    position: "relative",
                    borderColor: selectedCategory ? theme.palette.primary.main : theme.palette.divider,
                    color: selectedCategory ? theme.palette.primary.main : theme.palette.text.primary,
                  }}
                  onClick={() => router.push(`/packages?category=${category._id}`)}
                >
                  {category.isTrending && (
                    <Box sx={{ position: "absolute", top: "-4px", right: "-1px", borderRadius: "4px", padding: "4px 4px" }}>
                      <TrendingIcon color="error" fontSize="small" sx={{ mr: 0.5, fontSize: "0.875rem" }} />
                    </Box>
                  )}

                  {category.icon && (
                    <Image src={category.icon} alt={category.name} width={24} height={24} style={{ marginRight: "8px", alignItems: "center" }} />
                  )}

                  <Typography variant="body2" sx={{ display: "block" }}>
                    {category.name}
                  </Typography>
                </Box>
              );
            })}

            <Button
              component={Link}
              href="/package-categories"
              variant="text"
              endIcon={<ChevronRightIcon />}
              sx={{
                ml: 1,
                whiteSpace: "nowrap",
                boxShadow: `-8px 0 8px ${theme.palette.background.paper}`,
                backgroundColor: theme.palette.background.paper,
                fontWeight: 500,
                minWidth: "auto",
                "&:hover": {
                  backgroundColor: theme.palette.background.paper,
                },
              }}
            >
              See All
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default CategoryBar;
