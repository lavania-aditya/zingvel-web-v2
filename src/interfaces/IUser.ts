export interface IUser {
  id: string;
  userName: string | null;
  firstName: string;
  lastName: string;
  countryCode: number;
  phNumber: number;
  phVerified: boolean;
  whatsappNumber?: number;
  avatarImage: string;
  email: string | null;
  emailVerified: boolean;
  bio: string;
  gender: string;
  typeOfTravel: string | null;
  placesTravelledYear: number | null;
  dateOfBirth: string | null;
  totalWanderlist: number;
  totalPost: number;
  totalTravel: number;
}
