// services.ts
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

export const useServices = () => {
  return useQuery({
    queryKey: ['services'],
    queryFn: async () => {
      const res = await publicApi.get('/services');
      return res.data;
    },
  });
};

export const useService = (id: string) => {
  return useQuery({
    queryKey: ['service', id],
    queryFn: async () => {
      const res = await publicApi.get(`/services/${id}`);
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
      const res = await privateApi.post('/services', data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service created successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create service',
        description: error.response?.data?.error?.message || 'Failed to create service.',
      });
    },
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
      const res = await privateApi.put(`/services/${id}`, data);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update service',
        description: error.response?.data?.error?.message || 'Failed to update service.',
      });
    },
  });
};

export const useDeleteService = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/services/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['services'] });
      toast({ title: 'Service deleted successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete service',
        description: error.response?.data?.error?.message || 'Failed to delete service.',
      });
    },
  });
};
