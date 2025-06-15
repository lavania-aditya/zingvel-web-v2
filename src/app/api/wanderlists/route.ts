import { NextRequest, NextResponse } from "next/server";
import { ICreateWanderList } from "@/interfaces/IWanderlist";

// Sample wanderlists data for demonstration
const sampleWanderlists = [];

export async function POST(request: NextRequest) {
  try {
    const data: ICreateWanderList = await request.json();
    
    // Validate required fields
    if (!data.name || !data.cityId || !data.travelDate || !data.numberOfDays) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Create a new wanderlist with a unique ID
    const newWanderlist = {
      id: `wl-${Date.now()}`,
      ...data,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      userId: "sample-user-id", // In a real app, this would come from authentication
      likeCount: 0,
      likes: []
    };
    
    // In a real app, this would be saved to a database
    sampleWanderlists.push(newWanderlist);
    
    return NextResponse.json(newWanderlist, { status: 201 });
  } catch (error) {
    console.error("Error creating wanderlist:", error);
    return NextResponse.json(
      { error: "Failed to create wanderlist" },
      { status: 500 }
    );
  }
}
