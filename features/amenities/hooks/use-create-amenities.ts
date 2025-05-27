import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createAmenity } from "@/features/amenities/api/aminities-api";
import useAxios from "@/hooks/use-axios";
import { Aminity } from "@/types/type";

export const useCreateAmenities = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async (amenity: Aminity) => {
      return await createAmenity(axiosInstance, amenity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
