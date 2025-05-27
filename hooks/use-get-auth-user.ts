import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";

import useAxios from "./use-axios";
import { getAuthUser } from "@/api/get-auth-user";
import { AuthUser } from "@/types/type";

export const useGetAuthUser = (
  options?: UseQueryOptions<AuthUser>
): UseQueryResult<AuthUser> => {
  const axiosInstance = useAxios();

  return useQuery<AuthUser>({
    queryKey: ["authUser"],
    queryFn: () => getAuthUser(axiosInstance),
    ...options,
    refetchOnWindowFocus: false,
  });
};
