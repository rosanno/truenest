import { logoutAuthUser } from "@/api/get-auth-user";
import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import useAxios from "./use-axios";

export const useLogout = () => {
  const queryClient = useQueryClient();
  const axiosInstance = useAxios();

  return useMutation({
    mutationFn: async () => {
      return await logoutAuthUser(axiosInstance);
    },
    onSuccess: () => {
      queryClient.setQueryData(['authUser'], null);

      // Invalidate or refetch relevant queries (e.g., user session)
      queryClient.invalidateQueries({
        queryKey: ["authUser"],
      });
    },
  });
};
