import { ApiHelper } from "@/helpers/apiHelper";

/**
 * Get all inquiries for a specific user
 * @param userId - The user ID to fetch inquiries for
 * @returns Array of inquiry objects
 */
export const getAllUserInquires = async (userId: string) => {
  return ApiHelper.packages.get(`/leads?user/${userId}`);
};

/**
 * Get detailed information about a specific inquiry
 * @param id - The inquiry/lead ID
 * @returns Detailed inquiry object
 */
export const getInquireById = async (id: string) => {
  return ApiHelper.packages.get(`/leads/${id}`);
};
