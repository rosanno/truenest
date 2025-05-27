import axiosInstance from "@/lib/axios-instance";

export const login = async (
  email: string,
  password: string
) => {
  try {
    const response = await axiosInstance.post(
      "auth/login",
      { email, password }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
