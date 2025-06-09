import { Dimensions } from "react-native";

export const ONLY_STRING_WITH_SPACE_REGEX: RegExp = /^[a-zA-Z ]*$/;

export const ONLY_NUMBER_WITH_SPACE_REGEX: RegExp = /^[0-9 ]*$/;

export const PhoneNumberRegex: RegExp = /^(\+91[\\-\s]?)?[6-9]\d{9}$/;

export const EmailRegex: RegExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

export const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export const PLAY_STORE_LINK: string = "https://play.google.com/store/apps/details?id=com.zingvel_app&pcampaignid=web_share";

import { IPlacesTravelledYear, ITypeOfTravel, ITripGoals } from "@/interfaces/IWanderlist";

export const ZINGVEL_AUTH_DATA = "ZINGVEL_AUTH_DATA";

export const TRAVEL_LIKES: Array<ITypeOfTravel> = ["Adventure", "Beach", "Cultural", "Cruise", "Film", "Wildlife", "Sports"];

export const PLACES_TRAVELLED_IN_YEAR: Array<IPlacesTravelledYear> = ["1-2", "3-4", "5-7", "8-10", "12+"];

export const TRIP_GOALS_DATA: Array<ITripGoals> = [
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

export const TRIP_BUGET_DATA: Array<string> = ["Upto 1000", "1000 to 2000", "500 to 2000", "500 to 2000", "500 to 2000", "500 to 2000"];
