'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { privateApi } from '../axios';

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
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await privateApi.post('/users', data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User created successfully.');
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.error?.message || 'Failed to create user.'
      );
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
      data: Partial<{ name: string; isActive: boolean }>;
    }) => {
      const res = await privateApi.put(`/users/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success('User updated successfully.');
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.error?.message || 'Failed to update user.'
      );
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
      toast.success('User deleted successfully.');
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.error?.message || 'Failed to delete user.'
      );
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
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['users'] });
      toast.success(
        'Password reset successfully. User must change it at next login.'
      );
    },
    onError: (err: any) => {
      toast.error(
        err.response?.data?.error?.message || 'Failed to reset password.'
      );
    },
  });
};
