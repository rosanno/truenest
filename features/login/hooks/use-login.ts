import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { login } from "@/features/login/api/login-api";

type LoginProps = {
  email: string;
  password: string;
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, password }: LoginProps) => {
      return await login(email, password);
    },
    onSuccess: () => {
      // Invalidate or refetch relevant queries (e.g., user session)
      queryClient.refetchQueries({
        queryKey: ["authUser"],
      });
    },
  });
};
