import { ApiHelper } from "@/helpers/apiHelper";

/**
 * Get all inquiries for a specific user
 * @param userId - The user ID to fetch inquiries for
 * @param page - Page number for pagination
 * @param count - Number of items per page
 * @returns Array of inquiry objects with pagination metadata
 */
export const getAllUserInquires = async (userId: string, page: number = 1, count: number = 10) => {
  return ApiHelper.packages.get(`/v1/leads/user/${userId}?page=${page}&count=${count}`);
};

/**
 * Get detailed information about a specific inquiry
 * @param id - The inquiry/lead ID
 * @returns Detailed inquiry object
 */
export const getInquireById = async (id: string) => {
  return ApiHelper.packages.get(`/leads/${id}`);
};
