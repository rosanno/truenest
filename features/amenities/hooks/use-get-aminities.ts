import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import { getAmenities } from "@/features/amenities/api/aminities-api";
import useAxios from "@/hooks/use-axios";
import { Aminities } from "@/types/type";

export const useGetAminities = (options?: UseQueryOptions<Aminities>) => {
  const axiosInstance = useAxios();

  return useQuery<Aminities>({
    queryKey: ["amenities"],
    queryFn: () => getAmenities(axiosInstance),
    ...options,
    refetchOnWindowFocus: false,
  });
};
