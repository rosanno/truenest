import useAxios from "@/hooks/use-axios";
import { Aminity } from "@/types/type";

export const getAmenities = async (axiosInstance: ReturnType<typeof useAxios>) => {
  try {
    const response = await axiosInstance.get("features");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch amenities", error);
    throw new Error("Could not retrieve amenities.");
  }
};

export const createAmenity = async (axiosInstance: ReturnType<typeof useAxios>, amenity: Aminity) => {
  try {
    const response = await axiosInstance.post("features", amenity);
    return response.data;
  } catch (error) {
    console.error("Failed to create amenity", error);
    throw new Error("Could not create amenity.");
  }
};

export const updateAmenity = async (axiosInstance: ReturnType<typeof useAxios>, amenity: Aminity) => {
  try {
    const response = await axiosInstance.put(`features/${amenity._id}`, amenity);
    return response.data;
  } catch (error) {
    console.error("Failed to update amenity", error);
    throw new Error("Could not update amenity.");
  }
};

export const deleteAmenity = async (axiosInstance: ReturnType<typeof useAxios>, amenityId: string | null) => {
  try {
    const response = await axiosInstance.delete(`features/${amenityId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to delete amenity", error);
    throw new Error("Could not delete amenity.");
  }
};