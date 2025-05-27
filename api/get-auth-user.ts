import useAxios from "@/hooks/use-axios";

export const getAuthUser = async (
  axiosInstance: ReturnType<typeof useAxios>
) => {
  try {
    const response = await axiosInstance.get("auth/user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const logoutAuthUser = async (
  axiosInstance: ReturnType<typeof useAxios>
) => {
  try {
    const response = await axiosInstance.post(
      "auth/logout"
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
