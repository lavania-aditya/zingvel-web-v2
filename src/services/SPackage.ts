import { ApiHelper } from "@/helpers/apiHelper";

export const getAllCategories = async (page: number = 1, limit: number = 10) => {
  return ApiHelper.packages.get(`/categories?page=${page}&limit=${limit}`);
};

export const getAllPackages = async (page: number = 1, limit: number = 10) => {
  return ApiHelper.packages.get(`/travel-packages?page=${page}&limit=${limit}`);
};

export const getPackageById = async (id: string) => {
  return ApiHelper.packages.get(`/travel-packages/${id}`);
};
