import { Metadata } from "next";
import WanderlistsClient from "@/components/WanderlistsClient";
import { getAllWanderlistsService } from "@/services/SWanderlist";

export const metadata: Metadata = {
  title: "Wanderlists | Zingvel",
  description: "Explore curated wanderlists from travelers around the world. Find your next adventure with Zingvel.",
  openGraph: {
    title: "Wanderlists | Zingvel",
    description: "Explore curated wanderlists from travelers around the world. Find your next adventure with Zingvel.",
    images: ["/wanderlists/hero.jpg"],
  },
};

export default async function WanderlistsPage() {
  // Fetch initial wanderlists from server side
  const initialData = await getAllWanderlistsService(1, 12);
  
  return <WanderlistsClient initialData={initialData} />;
}
