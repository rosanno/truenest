import { useQuery, UseQueryOptions } from "@tanstack/react-query";

import useAxios from "@/hooks/use-axios";
import { Properties } from "@/types/type";
import { getProperties } from "@/features/properties/api/properties-api";

export const useGetProperties = (options?: UseQueryOptions<Properties>) => {
  const axiosInstance = useAxios();

  return useQuery<Properties>({
    queryKey: ["properties"],
    queryFn: () => getProperties(axiosInstance),
    ...options,
    refetchOnWindowFocus: false,
  });
};
