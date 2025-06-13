import { IUser } from "./IUser";

export type ITypeOfTravel = "Adventure" | "Beach" | "Cultural" | "Cruise" | "Film" | "Wildlife" | "Sports";
export type IPlacesTravelledYear = "1-2" | "3-4" | "5-7" | "8-10" | "12+";

export type ITripGoals =
  | "Must-see Attractions"
  | "Great Food"
  | "Hidden Gems"
  | "Scenic Thames cruises"
  | "London by private black cab"
  | "Pub crawls and tours"
  | "Iconic Landmarks"
  | "British Cuisine"
  | "Art Galleries"
  | "Theatre and Performing Arts"
  | "Royal Heritage"
  | "Historic Pubs and Bars";

export interface ICity {
  id: string;
  city: string;
  state: string;
  country: string;
  heroImage: string;
  description: string;
  rating: number;
  googlePlaceId: string;
  latitude: number;
  longitude: number;
  seasonOfTravel: Array<string>;
  created_at: string;
  updated_at: string;
  media: Array<ICityMedia>;
}

export interface ICityMedia {
  id: string;
  mediaUrl: string;
  cityId: string;
  city: ICity;
  created_at: string;
  updated_at: string;
}

export interface IWanderlistItem {
  _id: string;
  id?: string; // Keep for backward compatibility
  name: string;
  travelDate: string;
  numberOfDays: number;
  cityId: string;
  created_at: string;
  updated_at: string;
  city: ICity;
  accommodations: Array<IRestaurantItem>;
  activities: Array<IActivityItem>;
  events: Array<IRestaurantItem>;
  places: Array<IRestaurantItem>;
  restaurants: Array<IRestaurantItem>;
  likes: Array<IWanderlistLikeItem>;
  likeCount: number;
  userId: string;
  user: IUser;
}

export interface IWanderlistLikeItem {
  id: string;
  wanderlistId: string;
  wanderlist: IWanderlistItem;
  userId: string;
  user: IUser;
}

export interface ITravelAgenciesItem {
  id: string;
  address: string;
  googlePlaceId: string;
  coordinates: {
    x: number;
    y: number;
  };
  name: string;
  rating: number;
  reviewsNumber: number;
  hours: string;
  yearsInBusiness: string;
  mapsLocation: string;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  city: ICity;
  media: ITravelAgenciesMedia;
}

interface ITravelAgenciesMedia {
  id: string;
  mediaUrl: string;
  travelAgenciesId: string;
  created_at: string;
  updated_at: string;
}

export interface IRestaurantItem {
  id: string;
  price: string;
  name: string;
  address: string;
  googlePlaceId: string;
  googlePhotoRefrence: Array<string>;
  businessStatus: string;
  rating: string;
  userRatingsTotal: number;
  priceLevel: number;
  coordinates: {
    x: number;
    y: number;
  };
  types: Array<string>;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  city: ICity;
  media: Array<IRestaurantMedia>;
}

interface IRestaurantMedia {
  id: string;
  mediaUrl: string;
  restaurantId: string;
  created_at: string;
  updated_at: string;
}

export interface IActivityItem {
  id: string;
  name: string;
  rating: string;
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  media: Array<IActivityMedia>;
  city: ICity;
}

interface IActivityMedia {
  id: string;
  mediaUrl: string;
  restaurantId: string;
  created_at: string;
  updated_at: string;
}

export interface IRentalItem {
  id: string;
  googlePlaceId: string;
  name: string;
  rating: number;
  reviews: number;
  latitude: string;
  longitude: string;
  mapsLocation: string;
  address: string;
  hours: string;
  type: "4wheeler" | "2wheeler";
  contact: Array<string>;
  heroImage: string;
  description: string;
  whatsAppNo: string;
  websiteLink: string;
  created_at: string;
  updated_at: string;
  cityId: string;
  city: ICity;
  reviewsNumber: number;
  coordinates: {
    x: number;
    y: number;
  };
}

export interface ICreateWanderList {
  name: string;
  travelDate: string;
  cityId: string;
  numberOfDays: number;
  numberOfAdults: number;
  numberOfChildren: number;
  budget: number;
  goals: Array<string>;
}
