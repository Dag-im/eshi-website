'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

export const useImpacts = () => {
  return useQuery({
    queryKey: ['impacts'],
    queryFn: async () => {
      const res = await publicApi.get('/impact');
      return res.data;
    },
  });
};

export const useImpact = (id: string) => {
  return useQuery({
    queryKey: ['impact', id],
    queryFn: async () => {
      const res = await publicApi.get(`/impact/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateImpact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.post('/impact', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['impacts'] }),
  });
};

export const useUpdateImpact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await privateApi.put(`/impact/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['impacts'] }),
  });
};

export const useDeleteImpact = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/impact/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['impacts'] }),
  });
};
