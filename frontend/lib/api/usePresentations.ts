// presentations.ts
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-hot-toast';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const usePresentations = () => {
  return useQuery({
    queryKey: ['presentations'],
    queryFn: async () => {
      const res = await publicApi.get('/presentation');
      return res.data;
    },
  });
};

export const usePresentation = (id: string) => {
  return useQuery({
    queryKey: ['presentation', id],
    queryFn: async () => {
      const res = await publicApi.get(`/presentation/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreatePresentation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: { title: string; description: string }) => {
      const res = await privateApi.post('/presentation', data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['presentations'] });
      toast.success('Presentation created successfully!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to create presentation.'
      );
    },
  });
};

export const useUpdatePresentation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<{ title: string; description: string }>;
    }) => {
      const res = await privateApi.put(`/presentation/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['presentations'] });
      toast.success('Presentation updated successfully!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to update presentation.'
      );
    },
  });
};

export const useDeletePresentation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/presentation/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['presentations'] });
      toast.success('Presentation deleted successfully!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to delete presentation.'
      );
    },
  });
};
