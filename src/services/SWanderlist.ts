import { ApiHelper } from "@/helpers/apiHelper";
import { ICreateWanderList } from "@/interfaces/IWanderlist";

const BASE_TABLE_PATH = "/wanderlist";

export const getSuggestedCitiesService = (page: number, limit: number) => {
  return ApiHelper.wanderlist.get("/cities", { params: { page, limit } });
};

export const getWanderlistByIdService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/${wanderlistId}`);
};

// export const generateWanderlistService = (wanderlistId: string) => {
//   return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/generate/${wanderlistId}`);
// };

export const getUserWanderlistService = (userId: string, page: number, limit: number) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/user/${userId}`, { params: { page, limit } });
};

export const createWanderListService = (req: ICreateWanderList) => {
  return ApiHelper.wanderlist.post(`${BASE_TABLE_PATH}`, { body: req });
};

export const likeWanderListService = (id: string) => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/like/${id}`);
};

export const checkedWanderlistLiked = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/isLiked/user`, { params: { wanderlistId } });
};

export const getAllWanderlistsService = (page: number, limit: number = 10) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}`, { params: { page, limit } });
};

export const getTrendingWanderlistsService = (count: number) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/trending/${count}`);
};

export const deleteWanderListService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.delete(`${BASE_TABLE_PATH}/${wanderlistId}`);
};

export const getWanderlistPlacesService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/places/wanderlist/${wanderlistId}`);
};

export const getWanderlistRestaurantsService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/restaurants/wanderlist/${wanderlistId}`);
};

export const getWanderlistActivitiesService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/activities/wanderlist/${wanderlistId}`);
};

export const getWanderlistAccomodationsService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/accomodations/wanderlist/${wanderlistId}`);
};

export const getWanderlistTravelAgenciesService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/travelAgencies/wanderlist/${wanderlistId}`);
};

export const getWanderlistRentalsService = (wanderlistId: string) => {
  return ApiHelper.wanderlist.get(`${BASE_TABLE_PATH}/rentals/wanderlist/${wanderlistId}`);
};

export const updatePlaceWanderlistService = (wanderlistId: string, placeId: string, type: "add" | "remove") => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/place/${placeId}/${type}`);
};

export const updateRestaurantsWanderlistService = (wanderlistId: string, restaurantId: string, type: "add" | "remove") => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/restaurant/${restaurantId}/${type}`);
};

// export const updateEventsWanderlistService = (
//   wanderlistId: string,
//   type: "add" | "remove",
//   eventId?: string,
//   eventData?: ISerpEvent,
// ) => {
//   return patchAxios(`${BASE_TABLE_PATH}/update/${wanderlistId}/event/${type}`, {eventId, eventData});
// };

export const updateActivitiesWanderlistService = (wanderlistId: string, activityId: string, type: "add" | "remove") => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/activity/${activityId}/${type}`);
};

export const updateTravelAgenciesWanderlistService = (wanderlistId: string, travelAgencyId: string, type: "add" | "remove") => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/travelAgency/${travelAgencyId}/${type}`);
};

// export const updateAccomodationsWanderlistService = (
//   wanderlistId: string,
//   type: "add" | "remove",
//   accomodationId?: string,
//   accomodationData?: ISerpAccomodation
// ) => {
//   return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/accomodation/${type}`, {
//     accomodationId,
//     accomodationData,
//   });
// };

export const updateRentalsWanderlistService = (wanderlistId: string, rentalId: string, type: "add" | "remove") => {
  return ApiHelper.wanderlist.patch(`${BASE_TABLE_PATH}/update/${wanderlistId}/rental/${rentalId}/${type}`);
};
