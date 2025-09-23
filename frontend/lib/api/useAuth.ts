import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '../../stores/auth.store';
import { User } from '../../types/auth';
import { privateApi } from '../axios';

export const useAuthQuery = () => {
  const { setUser, clearUser } = useAuthStore();

  return useQuery<User>({
    queryKey: ['auth'],
    queryFn: async () => {
      try {
        const response = await privateApi.get('/auth/profile');
        setUser(response.data);
        return response.data;
      } catch {
        clearUser();
        throw new Error('Not authenticated');
      }
    },
  });
};

export const useLoginMutation = () => {
  const { setUser } = useAuthStore();

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
      toast.success('Logged in successfully!');
      window.location.href = data.user.role === 'admin' ? '/admin' : '/';
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Login failed.');
    },
  });
};

export const useLogoutMutation = () => {
  const { clearUser } = useAuthStore();
  return useMutation({
    mutationFn: async () => {
      await privateApi.post('/auth/logout');
    },
    onSuccess: () => {
      clearUser();
      toast.success('Logged out successfully!');
      window.location.href = '/login';
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error?.message || 'Logout failed.');
    },
  });
};

export const useForgotPasswordMutation = () => {
  return useMutation({
    mutationFn: async (email: string) => {
      await privateApi.post('/auth/forgot-password', { email });
    },
    onSuccess: () => {
      toast.success('Password reset link sent to your email.');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to send reset link.'
      );
    },
  });
};

export const useResetPasswordMutation = () => {
  return useMutation({
    mutationFn: async ({
      email,
      token,
      newPassword,
    }: {
      email: string;
      token: string;
      newPassword: string;
    }) => {
      await privateApi.post('/auth/reset-password', {
        email,
        token,
        newPassword,
      });
    },
    onSuccess: () => {
      toast.success('Password reset successfully!');
      window.location.href = '/login';
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to reset password.'
      );
    },
  });
};
