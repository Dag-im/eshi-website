'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await publicApi.get('/service');
      return res.data;
    },
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await publicApi.get(`/service/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      icon: string;
    }) => {
      const res = await privateApi.post('/service', data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });
};

export const useUpdateService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ title: string; description: string; icon: string }>;
    }) => {
      const res = await privateApi.put(`/service/${id}`, data);
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/service/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['services'] }),
  });
};
