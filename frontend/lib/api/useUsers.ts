'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { privateApi } from '../axios';
import { toast } from '../../hooks/use-toast';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

// ✅ Get all users
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await privateApi.get('/users');
      return res.data;
    },
  });
};

// ✅ Get a single user
export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await privateApi.get(`/users/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

// ✅ Create user
export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string; isActive: boolean }) => {
      const res = await privateApi.post('/users', data);
      return res.data;
    },
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast({
        title: 'User created',
        description: `Temporary password: ${data.temporaryPassword} (case-sensitive)`,
      });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create user',
        description: err.response?.data?.error?.message || 'Failed to create user.',
      });
    },
  });
};

// ✅ Update user
export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ name: string; email: string; isActive: boolean }>;
    }) => {
      const res = await privateApi.put(`/users/${id}`, data);
      return res.data;
    },
    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['user', variables.id] });
      toast({ title: 'User updated successfully' });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update user',
        description: err.response?.data?.error?.message || 'Failed to update user.',
      });
    },
  });
};

// ✅ Delete user
export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/users/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast({ title: 'User deleted successfully' });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete user',
        description: err.response?.data?.error?.message || 'Failed to delete user.',
      });
    },
  });
};

// ✅ Reset user password (new)
export const useResetUserPassword = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await privateApi.post(`/users/${id}/reset-password`);
      return res.data;
    },
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['user', id] });
      toast({
        title: 'Password reset',
        description: 'The user must change the password at next login.',
      });
    },
    onError: (err: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to reset password',
        description: err.response?.data?.error?.message || 'Failed to reset password.',
      });
    },
  });
};
