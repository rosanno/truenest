/* eslint-disable @typescript-eslint/no-explicit-any */
import useAxios from "@/hooks/use-axios";
import { PropertyForm } from "@/types/type";

export const getProperties = async (axiosInstance: ReturnType<typeof useAxios>) => {
  try {
    const response = await axiosInstance.get("properties");
    return response.data;
  } catch (error: any) {
    const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Could not fetch properties."; // Fallback message

    console.error("Failed to fetch properties", error);
    throw new Error(typeof message === "string" ? message : message.join?.(" ") ?? "Unknown error");
  }
};

export const createProperty = async (axiosInstance: ReturnType<typeof useAxios>, property: PropertyForm) => {
  try {
    const response = await axiosInstance.post("properties", property);
    return response.data;
  } catch (error: any) {
    console.error("Failed to create property", error);

    const message = error?.response?.data?.message || error?.response?.data?.error || error?.message || "Could not create property.";

    throw new Error(typeof message === "string" ? message : message.join?.(" ") ?? "Unknown error");
  }
};
