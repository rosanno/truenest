import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Aminity } from "@/types/type";

export const useCreateAmenities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amenity: Aminity) => {
      const response = await axios.post("/api/amenities", amenity);

      return response.data; // Assuming the response contains the created amenity detail
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
