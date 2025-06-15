"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  Chip,
  Autocomplete,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  InputAdornment,
  CircularProgress,
  Card,
  CardMedia,
  CardContent,
  Divider,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Add as AddIcon, TravelExplore as TravelExploreIcon } from "@mui/icons-material";
import { ICity, ICreateWanderList, ITripGoals } from "@/interfaces/IWanderlist";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/context/ToastContext";
import PartnerBannerWrapper from "@/components/PartnerBannerWrapper";

// Sample trip goals based on the ITripGoals type
const tripGoalsOptions: string[] = [
  "Must-see Attractions",
  "Great Food",
  "Hidden Gems",
  "Scenic Thames cruises",
  "London by private black cab",
  "Pub crawls and tours",
  "Iconic Landmarks",
  "British Cuisine",
  "Art Galleries",
  "Theatre and Performing Arts",
  "Royal Heritage",
  "Historic Pubs and Bars",
];

export default function CreateWanderlistPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const cityId = searchParams.get("cityId");
  const { isAuthenticated, user } = useAuth();
  const { showToast } = useToast();

  // Form state
  const [formData, setFormData] = useState<ICreateWanderList>({
    name: "",
    travelDate: "",
    cityId: cityId || "",
    numberOfDays: 1,
    numberOfAdults: 1,
    numberOfChildren: 0,
    budget: 1000,
    goals: [],
  });

  // City data state
  const [cityData, setCityData] = useState<ICity | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [citiesOptions, setCitiesOptions] = useState<ICity[]>([]);
  const [searchCity, setSearchCity] = useState<string>("");

  // Fetch city data if cityId is provided
  useEffect(() => {
    if (cityId) {
      fetchCityById(cityId);
    }
    fetchCities();
  }, [cityId]);

  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      showToast("Please login to create a wanderlist", "warning");
      router.push("/login?redirect=/create-wanderlist" + (cityId ? `?cityId=${cityId}` : ""));
    }
  }, [isAuthenticated, router, cityId]);

  const fetchCityById = async (id: string) => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(`/api/cities/${id}`);
      const data = await response.json();
      setCityData(data);
      setFormData(prev => ({ ...prev, cityId: id }));
    } catch (error) {
      console.error("Error fetching city:", error);
      showToast("Failed to load city information", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch("/api/cities");
      const data = await response.json();
      setCitiesOptions(data.items || []);
    } catch (error) {
      console.error("Error fetching cities:", error);
    }
  };

  const handleCityChange = (_event: any, value: ICity | null) => {
    if (value) {
      setCityData(value);
      setFormData(prev => ({ ...prev, cityId: value.id }));
    } else {
      setCityData(null);
      setFormData(prev => ({ ...prev, cityId: "" }));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setFormData(prev => ({ ...prev, travelDate: date.toISOString().split("T")[0] }));
    }
  };

  const handleGoalsChange = (_event: any, values: string[]) => {
    setFormData(prev => ({ ...prev, goals: values }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.cityId) {
      showToast("Please select a city", "error");
      return;
    }

    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch("/api/wanderlists", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        throw new Error("Failed to create wanderlist");
      }
      
      const data = await response.json();
      showToast("Wanderlist created successfully!", "success");
      router.push(`/wanderlists/${data.id}`);
    } catch (error) {
      console.error("Error creating wanderlist:", error);
      showToast("Failed to create wanderlist", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 4 }}>
      {/* Partner Banner at the top */}
      <PartnerBannerWrapper />
      
      <Container maxWidth="lg">
        <Box sx={{ mb: 6, mt: 4, textAlign: "center" }}>
          <Typography variant="h3" component="h1" fontWeight="bold" gutterBottom>
            Create Your Wanderlist
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Curate your dream trip with AI assistance and make your travel ideas a reality
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              <form onSubmit={handleSubmit}>
                <Typography variant="h5" component="h2" fontWeight="bold" gutterBottom>
                  Wanderlist Details
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                  {/* Wanderlist Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Wanderlist Name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="E.g., My Dream London Trip"
                    />
                  </Grid>

                  {/* City Selection */}
                  <Grid item xs={12}>
                    <Autocomplete
                      id="city-select"
                      options={citiesOptions}
                      getOptionLabel={(option) => `${option.city}, ${option.country}`}
                      value={cityData}
                      onChange={handleCityChange}
                      inputValue={searchCity}
                      onInputChange={(_event, newInputValue) => {
                        setSearchCity(newInputValue);
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Select City"
                          required
                          placeholder="Search for a city"
                        />
                      )}
                    />
                  </Grid>

                  {/* Travel Date */}
                  <Grid item xs={12} sm={6}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DatePicker
                        label="Travel Date"
                        value={formData.travelDate ? new Date(formData.travelDate) : null}
                        onChange={handleDateChange}
                        slotProps={{
                          textField: {
                            fullWidth: true,
                            required: true,
                          },
                        }}
                      />
                    </LocalizationProvider>
                  </Grid>

                  {/* Number of Days */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Days"
                      name="numberOfDays"
                      type="number"
                      value={formData.numberOfDays}
                      onChange={handleNumberChange}
                      required
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                    />
                  </Grid>

                  {/* Number of Adults */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Adults"
                      name="numberOfAdults"
                      type="number"
                      value={formData.numberOfAdults}
                      onChange={handleNumberChange}
                      required
                      InputProps={{
                        inputProps: { min: 1 },
                      }}
                    />
                  </Grid>

                  {/* Number of Children */}
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Number of Children"
                      name="numberOfChildren"
                      type="number"
                      value={formData.numberOfChildren}
                      onChange={handleNumberChange}
                      InputProps={{
                        inputProps: { min: 0 },
                      }}
                    />
                  </Grid>

                  {/* Budget */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Budget"
                      name="budget"
                      type="number"
                      value={formData.budget}
                      onChange={handleNumberChange}
                      required
                      InputProps={{
                        startAdornment: <InputAdornment position="start">$</InputAdornment>,
                        inputProps: { min: 0 },
                      }}
                    />
                  </Grid>

                  {/* Trip Goals */}
                  <Grid item xs={12}>
                    <Autocomplete
                      multiple
                      id="trip-goals"
                      options={tripGoalsOptions}
                      value={formData.goals}
                      onChange={handleGoalsChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Trip Goals"
                          placeholder="Select your trip goals"
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option}
                            {...getTagProps({ index })}
                            color="primary"
                            variant="outlined"
                          />
                        ))
                      }
                    />
                  </Grid>

                  {/* Description */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name="description"
                      multiline
                      rows={4}
                      placeholder="Describe your dream trip and any specific preferences..."
                      onChange={handleInputChange}
                    />
                  </Grid>

                  {/* Submit Button */}
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                      disabled={loading || !formData.cityId}
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                      sx={{ py: 1.5, mt: 2 }}
                    >
                      {loading ? "Creating..." : "Create Wanderlist"}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            {/* City Preview Card */}
            {cityData ? (
              <Card sx={{ borderRadius: 2, mb: 4 }}>
                <CardMedia
                  component="img"
                  height="240"
                  image={cityData.heroImage || "/placeholder-city.jpg"}
                  alt={cityData.city}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography variant="h5" component="h3" fontWeight="bold">
                    {cityData.city}, {cityData.country}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1, mb: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {cityData.rating}/5
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {cityData.description}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" fontWeight="bold">
                      Best Season to Travel:
                    </Typography>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mt: 1 }}>
                      {cityData.seasonOfTravel.map((season) => (
                        <Chip key={season} label={season} size="small" />
                      ))}
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  mb: 4,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  height: 300,
                  backgroundColor: "rgba(0, 0, 0, 0.02)",
                }}
              >
                <TravelExploreIcon sx={{ fontSize: 60, color: "text.secondary", opacity: 0.5, mb: 2 }} />
                <Typography variant="h6" color="text.secondary" align="center">
                  Select a city to see preview
                </Typography>
              </Paper>
            )}

            {/* AI Assistant Info */}
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2, bgcolor: "primary.light", color: "primary.contrastText" }}>
              <Typography variant="h5" component="h3" fontWeight="bold" gutterBottom>
                AI Travel Assistant
              </Typography>
              <Typography variant="body1" paragraph>
                Our AI will help you create the perfect itinerary based on your preferences, budget, and travel dates.
              </Typography>
              <Typography variant="body1" paragraph>
                After creating your wanderlist, you'll receive personalized recommendations for:
              </Typography>
              <Box component="ul" sx={{ pl: 2 }}>
                <Typography component="li" variant="body1">
                  Accommodations that match your style
                </Typography>
                <Typography component="li" variant="body1">
                  Local restaurants and cuisine
                </Typography>
                <Typography component="li" variant="body1">
                  Must-see attractions and hidden gems
                </Typography>
                <Typography component="li" variant="body1">
                  Day-by-day itinerary planning
                </Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
