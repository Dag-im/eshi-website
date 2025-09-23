'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi } from '../axios';

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await privateApi.get('/user');
      return res.data;
    },
  });
};

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const res = await privateApi.get(`/user/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { name: string; email: string }) => {
      const res = await privateApi.post('/user', data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

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
      const res = await privateApi.put(`/user/${id}`, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/user/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};
