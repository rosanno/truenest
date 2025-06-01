import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (amenityId: string | null) => {
      const response = await axios.delete(`/api/amenities/${amenityId}`);

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
