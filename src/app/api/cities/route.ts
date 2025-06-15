import { NextRequest, NextResponse } from "next/server";

// Sample city data for demonstration
const sampleCities = [
  {
    id: "1",
    city: "London",
    state: "England",
    country: "United Kingdom",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=1470&auto=format&fit=crop",
    description: "London, the capital of England and the United Kingdom, is a 21st-century city with history stretching back to Roman times.",
    rating: 4.8,
    googlePlaceId: "ChIJdd4hrwug2EcRmSrV3Vo6llI",
    latitude: 51.5074,
    longitude: -0.1278,
    seasonOfTravel: ["Spring", "Summer", "Fall"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    media: []
  },
  {
    id: "2",
    city: "Paris",
    state: "Île-de-France",
    country: "France",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1473&auto=format&fit=crop",
    description: "Paris, France's capital, is a major European city and a global center for art, fashion, gastronomy and culture.",
    rating: 4.7,
    googlePlaceId: "ChIJD7fiBh9u5kcRYJSMaMOCCwQ",
    latitude: 48.8566,
    longitude: 2.3522,
    seasonOfTravel: ["Spring", "Fall"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    media: []
  },
  {
    id: "3",
    city: "New York",
    state: "New York",
    country: "United States",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=1470&auto=format&fit=crop",
    description: "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that's among the world's major commercial, financial and cultural centers.",
    rating: 4.6,
    googlePlaceId: "ChIJOwg_06VPwokRYv534QaPC8g",
    latitude: 40.7128,
    longitude: -74.0060,
    seasonOfTravel: ["Spring", "Fall"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    media: []
  },
  {
    id: "4",
    city: "Tokyo",
    state: "Tokyo",
    country: "Japan",
    heroImage: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?q=80&w=1374&auto=format&fit=crop",
    description: "Tokyo, Japan's busy capital, mixes the ultramodern and the traditional, from neon-lit skyscrapers to historic temples.",
    rating: 4.9,
    googlePlaceId: "ChIJ51cu8IcbXWARiRtXIothAS4",
    latitude: 35.6762,
    longitude: 139.6503,
    seasonOfTravel: ["Spring", "Fall"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    media: []
  },
  {
    id: "5",
    city: "Sydney",
    state: "New South Wales",
    country: "Australia",
    heroImage: "https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1470&auto=format&fit=crop",
    description: "Sydney, capital of New South Wales and one of Australia's largest cities, is best known for its harbourfront Sydney Opera House, with a distinctive sail-like design.",
    rating: 4.7,
    googlePlaceId: "ChIJP3Sa8ziYEmsRUKgyFmh9AQM",
    latitude: -33.8688,
    longitude: 151.2093,
    seasonOfTravel: ["Spring", "Summer"],
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    media: []
  }
];

export async function GET(request: NextRequest) {
  // Return all cities
  return NextResponse.json({
    items: sampleCities,
    total: sampleCities.length,
    page: 1,
    limit: 10
  });
}
