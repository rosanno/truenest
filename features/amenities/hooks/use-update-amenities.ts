import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Aminity } from "@/types/type";

export const useUpdateAmenities = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amenity: Aminity) => {
      const response = await axios.patch(`/api/amenities/${amenity.id}`, amenity);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
