'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { User } from '../../types/auth';
import { privateApi } from '../axios';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const useAuthQuery = () => {
  const query = useQuery<User>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await privateApi.get('/auth/profile');
        return response.data;
      } catch {
        throw new Error('Not authenticated');
      }
    },
  });

  return query;
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const response = await privateApi.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    },
    onSuccess: (data) => {
      toast.success('Logged in successfully!');
      if (data.user.mustChangePassword) {
        window.location.href = '/change-password';
      } else {
        window.location.href = data.user.role === 'admin' ? '/admin' : '/';
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error?.message || 'Login failed.');
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: async () => {
      await privateApi.post('/auth/logout');
    },
    onSuccess: () => {
      toast.success('Logged out successfully!');
      window.location.href = '/login';
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(error.response?.data?.error?.message || 'Logout failed.');
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({
      userId,
      newPassword,
    }: {
      userId: string;
      newPassword: string;
    }) => {
      await privateApi.post('/auth/reset-password', {
        userId,
        newPassword,
      });
    },
    onSuccess: () => {
      toast.success('Password changed successfully! Please log in again.');
      window.location.href = '/login';
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to change password.'
      );
    },
  });
};
