// axiosInstance.ts
import axios from "axios";
import { toast } from "sonner";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  withCredentials: true,
});

// Request interceptor (optional)
// You can add authorization tokens or any other configurations here
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add tokens or other headers here if needed
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response, // Return the response if no error
  (error) => {
    if (error.response) {
      // Handle different error scenarios based on the status code
      if (error.response.status === 401) {
        toast.error("Unauthorized access. Please login.");
      } else if (error.response.status === 400) {
        // Check for specific error message like "Invalid email or password"
        if (
          error.response.data.message ===
          "Invalid email or password"
        ) {
          toast.error(
            "Invalid email or password. Please try again."
          );
        } else {
          toast.error(
            "Invalid request. Please check your input."
          );
        }
      } else {
        toast.error(
          "Something went wrong. Please try again later."
        );
      }
    } else if (error.request) {
      // No response received
      toast.error(
        "No response from server. Please try again later."
      );
    } else {
      // Error setting up the request
      toast.error(
        "Error setting up request. Please try again."
      );
    }
    return Promise.reject(error); // Reject the promise so that it can be handled further
  }
);

export default axiosInstance;
