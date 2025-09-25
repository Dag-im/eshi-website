import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'react-hot-toast';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

export const privateApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
  withCredentials: true,
});

export const publicApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || '/api',
});

// Track if we're already refreshing
let isRefreshing = false;

privateApi.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest: CustomAxiosRequestConfig | undefined = error.config;

    // Prevent retrying refresh on itself
    if (!originalRequest || originalRequest?.url?.includes('/auth/refresh')) {
      toast.error('Session expired. Please log in again.');
      window.location.href = '/login';
      return Promise.reject(error);
    }

    // Handle 401 for normal requests
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (!isRefreshing) {
          isRefreshing = true;
          await privateApi.post('/auth/refresh');
          isRefreshing = false;
        }
        return privateApi(originalRequest);
      } catch {
        isRefreshing = false;
        toast.error('Session expired. Please log in again.');
        window.location.href = '/login';
      }
    }

    const errorMessage =
      (error.response?.data as { error?: { message?: string } })?.error
        ?.message || 'An error occurred.';

    toast.error(errorMessage);
    return Promise.reject(error);
  }
);
