import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateAmenity } from "@/features/amenities/api/aminities-api";
import useAxios from "@/hooks/use-axios";
import { Aminity } from "@/types/type";

export const useUpdateAmenities = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async (amenity: Aminity) => {
      return await updateAmenity(axiosInstance, amenity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
