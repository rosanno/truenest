import { useMutation, useQueryClient } from "@tanstack/react-query";

import useAxios from "@/hooks/use-axios";
import { createProperty } from "@/features/properties/api/properties-api";
import { PropertyForm } from "@/types/type";

export const useCreateProperty = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async (property: PropertyForm) => {
      return await createProperty(axiosInstance, property);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["properties"] });
    },
  });
};
