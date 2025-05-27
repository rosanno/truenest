import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const useAxios = () => {
  // 1) Normalize baseURL (no trailing slash)
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL!;

  const axiosInstance = axios.create({
    baseURL,
    withCredentials: true, // ← send cookies on every request
  });

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const status = error.response?.status;
      const originalConfig = error.config as AxiosRequestConfig & { _retry?: boolean };

      // Only try once
      if (status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          await axiosInstance.post('auth/refresh', {}, {
            withCredentials: true,
          });

          return axiosInstance(originalConfig);
        } catch (refreshError) {
          // failed refresh: bubble up so you can redirect to login
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
