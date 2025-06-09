import { ApiHelper } from "@/helpers/apiHelper";

const BASE_TABLE_PATH: string = "users";

export const sendOtpService = (countryCode: number = 91, phNumber: string) => {
  return ApiHelper.wanderlist.get(`/${BASE_TABLE_PATH}/send-otp`, { params: { countryCode, phNumber } });
};

export const verifyOtpSerive = (
  countryCode: number,
  phoneNumber: string,
  otpVal: string,
  firstName: string = "",
  lastName: string = "",
  email: string = ""
) => {
  return ApiHelper.wanderlist.get(`/${BASE_TABLE_PATH}/verify-otp`, { params: { countryCode, phoneNumber, otpVal, firstName, lastName, email } });
};

export const getUserFromTokenApi = () => {
  return ApiHelper.wanderlist.get(`/${BASE_TABLE_PATH}/user-from-token`);
};

export type ITypeOfTravel = "Adventure" | "Beach" | "Cultural" | "Cruise" | "Film" | "Wildlife" | "Sports";

export type IPlacesTravelledYear = "1-2" | "3-4" | "5-7" | "8-10" | "12+";

// User profile update interface
interface UpdateUserProfileParams {
  userId: string;
  avatarImage?: string;
  userName?: string;
  firstName?: string;
  lastName?: string;
  bio: string;
  gender: "Male" | "Female" | "Other";
  typeOfTravel: Array<ITypeOfTravel>;
  placesTravelledYear: Array<IPlacesTravelledYear>;
  dateOfBirth: string | null;
}

export const updateUserProfileService = (params: UpdateUserProfileParams) => {
  const { userId, ...updateData } = params;
  return ApiHelper.wanderlist.patch(`/${BASE_TABLE_PATH}/${userId}`, { body: updateData });
};
