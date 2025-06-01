/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import axios from "axios";

import { Aminities } from "@/types/type";

export const useGetAminities = (options?: UseQueryOptions<Aminities>) => {
  return useQuery<Aminities>({
    queryKey: ["amenities"],
    queryFn: async () => {
      try {
        const response = await axios.get("/api/amenities");
        return response.data;
      } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          return { msg: "No amenities found", data: [] };
        }
        throw error;
      }
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};
