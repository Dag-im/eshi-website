'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { privateApi, publicApi } from '../axios';
import { toast } from '../../hooks/use-toast';
import { AboutRecord, CreateAboutDto } from '../../types/about';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const useAboutData = () => {
  return useQuery<AboutRecord[]>({
    queryKey: ['about'],
    queryFn: async () => {
      const res = await publicApi.get('/about');
      return res.data;
    },
  });
};

export const useCreateAbout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateAboutDto) => {
      const res = await privateApi.post('/about', data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['about'] });
      toast({ title: 'About section updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update about section',
        description: error.response?.data?.error?.message || 'Failed to update about section.',
      });
    },
  });
};
