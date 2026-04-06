'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useEffect } from 'react';
import { User } from '../../types/auth';
import { privateApi } from '../axios';
import { useAuthStore } from '../../stores/auth.store';
import { toast } from '../../hooks/use-toast';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

interface AuthAwareRequestConfig extends AxiosRequestConfig {
  _skipAuthRedirect?: boolean;
}

interface UseAuthQueryOptions {
  enabled?: boolean;
  redirectOnUnauthorized?: boolean;
}

export const useAuthQuery = ({
  enabled = true,
  redirectOnUnauthorized = true,
}: UseAuthQueryOptions = {}) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const query = useQuery<User>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const requestConfig: AuthAwareRequestConfig = {
          _skipAuthRedirect: !redirectOnUnauthorized,
        };
        const response = await privateApi.get('/auth/profile', requestConfig);
        return response.data;
      } catch {
        throw new Error('Not authenticated');
      }
    },
    enabled,
    retry: false,
  });

  useEffect(() => {
    if (query.data) {
      setUser(query.data);
      return;
    }

    if (query.isError) {
      clearUser();
    }
  }, [clearUser, query.data, query.isError, setUser]);

  return query;
};

export const useLoginMutation = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

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
      setUser(data.user);
      queryClient.setQueryData(['auth'], data.user);
      toast({ title: 'Logged in successfully' });
      if (data.user.mustChangePassword) {
        window.location.href = '/change-password';
      } else {
        window.location.href = data.user.role === 'admin' ? '/admin' : '/';
      }
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.response?.data?.error?.message || 'Login failed.',
      });
    },
  });
};

export const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: async () => {
      await privateApi.post('/auth/logout');
    },
    onSuccess: () => {
      clearUser();
      queryClient.removeQueries({ queryKey: ['auth'] });
      toast({ title: 'Logged out successfully' });
      window.location.href = '/admin/login';
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error.response?.data?.error?.message || 'Logout failed.',
      });
    },
  });
};

export const useResetPasswordMutation = () => {
  const queryClient = useQueryClient();
  const clearUser = useAuthStore((state) => state.clearUser);

  return useMutation({
    mutationFn: async ({
      userId,
      newPassword,
    }: {
      userId: number;
      newPassword: string;
    }) => {
      await privateApi.post('/auth/reset-password', {
        userId,
        newPassword,
      });
    },
    onSuccess: () => {
      clearUser();
      queryClient.removeQueries({ queryKey: ['auth'] });
      toast({
        title: 'Password changed',
        description: 'Please sign in again with your new password.',
      });
      window.location.href = '/admin/login';
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Password update failed',
        description:
          error.response?.data?.error?.message || 'Failed to change password.',
      });
    },
  });
};
