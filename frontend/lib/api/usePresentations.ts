// presentations.ts
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { privateApi, publicApi } from '../axios';
import { toast } from '../../hooks/use-toast';

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
    mutationFn: async (data: FormData) => {
      const res = await privateApi.post('/presentation', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['presentations'] });
      toast({ title: 'Presentation created successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create presentation',
        description: error.response?.data?.error?.message || 'Failed to create presentation.',
      });
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
      data: FormData;
    }) => {
      const res = await privateApi.put(`/presentation/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['presentations'] });
      toast({ title: 'Presentation updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update presentation',
        description: error.response?.data?.error?.message || 'Failed to update presentation.',
      });
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
      toast({ title: 'Presentation deleted successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete presentation',
        description: error.response?.data?.error?.message || 'Failed to delete presentation.',
      });
    },
  });
};
