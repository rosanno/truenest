import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteAmenity } from "@/features/amenities/api/aminities-api";
import useAxios from "@/hooks/use-axios";

export const useDeleteAmenity = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async (amenityId: string | null) => {
      return await deleteAmenity(axiosInstance, amenityId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["amenities"] });
    },
  });
};
