import { ApiHelper } from "@/helpers/apiHelper";

export const getAllCategories = async (page: number = 1, count: number = 10, name: string = "") => {
  return ApiHelper.packages.get(`/v1/categories?name=${name}&page=${page}&count=${count}`);
};

export const getAllPackages = async (page: number = 1, limit: number = 10, name: string = "", categoryId: string = "") => {
  return ApiHelper.packages.get(`/v1/travel-packages?page=${page}&limit=${limit}&name=${name}&categoryId=${categoryId}`);
};

export const getPackageById = async (id: string) => {
  return ApiHelper.packages.get(`/v1/travel-packages/${id}`);
};

export const getAllUserLeads = async (userId: string, page: number = 1, count: number = 10) => {
  return ApiHelper.packages.get(`/v1/leads/user/${userId}?page=${page}&count=${count}`);
};
