export interface ICategoryItem {
  _id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  isTrending: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPackageItem {
  name: string;
  description: string;
  location: {
    city: string;
    state: string;
    country: string;
    googlePlaceId: string;
  };
  duration: {
    days: number;
    nights: number;
  };
  regularPrice: number;
  salePrice: number;
  discountedPrice: number;
  media: {
    url: string;
    type: string;
    mediaId: string;
  }[];
  itinerary: {
    description: string;
    items: {
      type: string;
      content: string;
    }[];
  }[];
  inclusions: string[];
  exclusions: string[];
  customInclusions: string[];
  customExclusions: string[];
  transferIncluded: boolean;
  stayIncluded: boolean;
  breakfastIncluded: boolean;
  sightseeingIncluded: boolean;
  rating: number;
  ticketPrice: number;
  amenities: string[];
  partner_id: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  _id: string;
  status: string;
  categories: string[];
}
