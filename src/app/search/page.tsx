"use client";

import { useState, useEffect } from "react";
import {
  Box,
  InputAdornment,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Slider,
  Paper,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { TextUi } from "@/components/customUi/TextUi";
import { TextInputUi } from "@/components/customUi/TextInputUi";
import AdaptiveDialog from "@/components/AdaptiveDialog";
import {
  Search as SearchIcon,
  LocationOn as LocationIcon,
  Person as PersonIcon,
  Flight as FlightIcon,
  Hotel as HotelIcon,
  Restaurant as FoodIcon,
  FilterList as FilterIcon,
} from "@mui/icons-material";
import { useAppContext } from "@/context/AppContext";

// Mock data for search results
const mockSearchResults = [
  {
    id: "1",
    name: "Grand Hyatt Hotel",
    location: "Paris, France",
    type: "hotel",
    price: 299,
    rating: 4.8,
    image: "#2196f3", // Placeholder color
    description: "Luxury hotel in the heart of Paris with stunning views of the Eiffel Tower.",
  },
  {
    id: "2",
    name: "Paris City Tour",
    location: "Paris, France",
    type: "activity",
    price: 49,
    rating: 4.6,
    image: "#fca21a", // Placeholder color
    description: "Explore the beautiful city of Paris with our guided tour.",
  },
  {
    id: "3",
    name: "Flight to Paris",
    location: "New York to Paris",
    type: "flight",
    price: 599,
    rating: 4.2,
    image: "#4caf50", // Placeholder color
    description: "Direct flight from JFK to Charles de Gaulle Airport.",
  },
  {
    id: "4",
    name: "Paris Complete Package",
    location: "Paris, France",
    type: "package",
    price: 1299,
    rating: 4.9,
    image: "#9c27b0", // Placeholder color
    description: "Complete 7-day Paris experience including hotel, tours, and transportation.",
  },
  {
    id: "5",
    name: "Bali Beach Resort",
    location: "Bali, Indonesia",
    type: "hotel",
    price: 199,
    rating: 4.7,
    image: "#ff5722", // Placeholder color
    description: "Beautiful beachfront resort with private villas and infinity pools.",
  },
  {
    id: "6",
    name: "Tokyo City Explorer",
    location: "Tokyo, Japan",
    type: "package",
    price: 1499,
    rating: 4.8,
    image: "#673ab7", // Placeholder color
    description: "10-day complete Tokyo experience with accommodation and guided tours.",
  },
];

// Type for search filters
interface SearchFilters {
  type: string;
  priceRange: [number, number];
  rating: number;
  location: string;
}

export default function SearchPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { addToSearchHistory, searchHistory } = useAppContext();

  // State for search query and results
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState(mockSearchResults);
  const [filtersDialogOpen, setFiltersDialogOpen] = useState(false);

  // State for filters
  const [filters, setFilters] = useState<SearchFilters>({
    type: "all",
    priceRange: [0, 2000],
    rating: 0,
    location: "",
  });

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  // Handle search submission
  const handleSearch = () => {
    if (searchQuery.trim()) {
      // Add to search history
      addToSearchHistory(searchQuery);

      // Filter results based on search query
      // In a real app, this would be an API call
      const filtered = mockSearchResults.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );

      setSearchResults(filtered);
    } else {
      setSearchResults(mockSearchResults);
    }
  };

  // Handle filter changes
  const handleFilterChange = (filterName: keyof SearchFilters, value: unknown) => {
    setFilters((prev) => ({
      ...prev,
      [filterName]: value,
    }));
  };

  // Apply filters to search results
  useEffect(() => {
    let filtered = mockSearchResults;

    // Filter by type
    if (filters.type !== "all") {
      filtered = filtered.filter((item) => item.type === filters.type);
    }

    // Filter by price range
    filtered = filtered.filter((item) => item.price >= filters.priceRange[0] && item.price <= filters.priceRange[1]);

    // Filter by rating
    if (filters.rating > 0) {
      filtered = filtered.filter((item) => item.rating >= filters.rating);
    }

    // Filter by location
    if (filters.location) {
      filtered = filtered.filter((item) => item.location.toLowerCase().includes(filters.location.toLowerCase()));
    }

    setSearchResults(filtered);
  }, [filters]);

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      type: "all",
      priceRange: [0, 2000],
      rating: 0,
      location: "",
    });
    setFiltersDialogOpen(false);
  };

  // Get icon based on item type
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "hotel":
        return <HotelIcon fontSize="small" />;
      case "flight":
        return <FlightIcon fontSize="small" />;
      case "activity":
        return <PersonIcon fontSize="small" />;
      case "food":
        return <FoodIcon fontSize="small" />;
      default:
        return <LocationIcon fontSize="small" />;
    }
  };

  return (
    <Box sx={{ py: 4, px: { xs: 2, sm: 4, md: 6 } }}>
      <TextUi variant="h4" fontWeight="bold" sx={{ mb: 2 }}>
        Search
      </TextUi>

      {/* Search Bar */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          mb: 3,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          borderRadius: "0.625rem",
        }}
      >
        <Box
          component="form"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            handleSearch();
          }}
          sx={{ width: '100%' }}
        >
          <TextInputUi
            fullWidth
            placeholder="Search destinations, hotels, flights..."
            value={searchQuery}
            onChange={handleSearchChange}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            variant="outlined"
            sx={{ 
              '& .MuiOutlinedInput-root': {
                borderRadius: '0.625rem'
              }
            }}
          />
        </Box>

        <Box sx={{ display: "flex", gap: 1 }}>
          <Button variant="contained" onClick={handleSearch} sx={{ whiteSpace: "nowrap", borderRadius: "0.625rem" }}>
            Search
          </Button>

          <Button variant="outlined" onClick={() => setFiltersDialogOpen(true)} startIcon={<FilterIcon />} sx={{ whiteSpace: "nowrap", borderRadius: "0.625rem" }}>
            Filters
          </Button>
        </Box>
      </Paper>

      {/* Filters Dialog */}
      <AdaptiveDialog
        open={filtersDialogOpen}
        onClose={() => setFiltersDialogOpen(false)}
        title="Search Filters"
        actions={
          <>
            <Button onClick={clearFilters}>Clear All</Button>
            <Button variant="contained" onClick={() => setFiltersDialogOpen(false)}>
              Apply
            </Button>
          </>
        }
      >
        <FormControl fullWidth margin="normal">
          <InputLabel>Type</InputLabel>
          <Select value={filters.type} label="Type" onChange={(e) => handleFilterChange("type", e.target.value)}>
            <MenuItem value="all">All Types</MenuItem>
            <MenuItem value="hotel">Hotels</MenuItem>
            <MenuItem value="flight">Flights</MenuItem>
            <MenuItem value="activity">Activities</MenuItem>
            <MenuItem value="package">Packages</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ mt: 3, mb: 2 }}>
          <TextUi sx={{ mb: 1 }}>Price Range</TextUi>
          <Slider
            value={filters.priceRange}
            onChange={(_, value) => handleFilterChange("priceRange", value)}
            valueLabelDisplay="auto"
            min={0}
            max={2000}
            step={50}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <TextUi variant="body2">${filters.priceRange[0]}</TextUi>
            <TextUi variant="body2">${filters.priceRange[1]}</TextUi>
          </Box>
        </Box>

        <Box sx={{ mt: 3, mb: 2 }}>
          <TextUi sx={{ mb: 1 }}>Minimum Rating</TextUi>
          <Slider
            value={filters.rating}
            onChange={(_, value) => handleFilterChange("rating", value)}
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={0.5}
          />
        </Box>

        <TextInputUi
          fullWidth
          label="Location"
          variant="outlined"
          value={filters.location}
          onChange={(e) => handleFilterChange("location", e.target.value)}
          startAdornment={
            <InputAdornment position="start">
              <LocationIcon fontSize="small" />
            </InputAdornment>
          }
          sx={{ 
            mt: 2,
            '& .MuiOutlinedInput-root': {
              borderRadius: '0.625rem'
            }
          }}
        />
      </AdaptiveDialog>

      {/* Recent Searches */}
      {searchHistory.length > 0 && (
        <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: "0.625rem" }}>
          <TextUi variant="h6" sx={{ mb: 2 }}>
            Recent Searches
          </TextUi>
          <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
            {searchHistory.slice(0, 5).map((term, index) => (
              <Chip
                key={index}
                label={term}
                onClick={() => {
                  setSearchQuery(term);
                  handleSearch();
                }}
              />
            ))}
          </Stack>
        </Paper>
      )}

      <Grid container spacing={3}>
        {/* Search Results */}
        <Grid xs={12}>
          {searchResults.length === 0 ? (
            <Paper elevation={2} sx={{ p: 4, textAlign: "center", borderRadius: "0.625rem" }}>
              <TextUi variant="h6">No results found</TextUi>
              <TextUi variant="body1" color="text.secondary">
                Try adjusting your search or filters
              </TextUi>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {searchResults.map((result) => (
                <Grid xs={12} sm={6} md={4} key={result.id}>
                  <Card elevation={2} sx={{ height: "100%", display: "flex", flexDirection: "column", borderRadius: "0.625rem" }}>
                    <CardMedia
                      sx={{
                        height: 140,
                        bgcolor: result.image,
                      }}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <TextUi variant="h6" sx={{ mb: 1 }}>
                          {result.name}
                        </TextUi>
                        <Chip
                          icon={getTypeIcon(result.type)}
                          label={result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                          size="small"
                          color="primary"
                          variant="outlined"
                        />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                        <LocationIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                        <TextUi variant="body2" color="text.secondary">
                          {result.location}
                        </TextUi>
                      </Box>

                      <TextUi variant="body2" sx={{ mb: 2 }}>
                        {result.description}
                      </TextUi>

                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                        <TextUi variant="h6" color="primary">
                          ${result.price}
                        </TextUi>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <TextUi variant="body2" sx={{ mr: 0.5 }}>
                            {result.rating}
                          </TextUi>
                          <Chip size="small" label="★" sx={{ bgcolor: "#ffc107", color: "white", height: 20, fontSize: "0.75rem" }} />
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
