import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from '../hooks/use-toast';

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuthRedirect?: boolean;
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
    const requestUrl = originalRequest?.url || '';
    const isRefreshRequest = requestUrl.includes('/auth/refresh');
    const isLoginRequest = requestUrl.includes('/auth/login');
    const shouldSkipAuthRedirect = Boolean(originalRequest?._skipAuthRedirect);

    if (!originalRequest) {
      toast({
        variant: 'destructive',
        title: 'Session expired',
        description: 'Please log in again.',
      });
      window.location.href = '/admin/login';
      return Promise.reject(error);
    }

    if (isRefreshRequest) {
      if (!shouldSkipAuthRedirect) {
        toast({
          variant: 'destructive',
          title: 'Session expired',
          description: 'Please log in again.',
        });
        window.location.href = '/admin/login';
      }
      return Promise.reject(error);
    }

    if (isLoginRequest || shouldSkipAuthRedirect) {
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
        toast({
          variant: 'destructive',
          title: 'Session expired',
          description: 'Please log in again.',
        });
        window.location.href = '/admin/login';
      }
    }

    const errorMessage =
      (error.response?.data as { error?: { message?: string } })?.error
        ?.message || 'An error occurred.';

    toast({
      variant: 'destructive',
      title: 'Request failed',
      description: errorMessage,
    });
    return Promise.reject(error);
  }
);
