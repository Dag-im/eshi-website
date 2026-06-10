'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { privateApi, publicApi } from '../axios';
import { toast } from '../../hooks/use-toast';
import { CreateHeroContentDto, HeroContentRecord, UpdateHeroContentDto } from '../../types/hero-content';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const useHeroContents = () => {
  return useQuery<HeroContentRecord[]>({
    queryKey: ['hero-contents'],
    queryFn: async () => {
      const res = await publicApi.get('/hero-content');
      return res.data;
    },
  });
};

export const useHeroContent = (id: string | number) => {
  return useQuery<HeroContentRecord>({
    queryKey: ['hero-content', id],
    queryFn: async () => {
      const res = await publicApi.get(`/hero-content/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateHeroContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateHeroContentDto) => {
      const res = await privateApi.post('/hero-content', data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero-contents'] });
      toast({ title: 'Hero content created successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create hero content',
        description: error.response?.data?.error?.message || 'Failed to create hero content.',
      });
    },
  });
};

export const useUpdateHeroContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateHeroContentDto }) => {
      const res = await privateApi.put(`/hero-content/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero-contents'] });
      qc.invalidateQueries({ queryKey: ['hero-content'] });
      toast({ title: 'Hero content updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update hero content',
        description: error.response?.data?.error?.message || 'Failed to update hero content.',
      });
    },
  });
};

export const useDeleteHeroContent = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      await privateApi.delete(`/hero-content/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero-contents'] });
      toast({ title: 'Hero content deleted successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete hero content',
        description: error.response?.data?.error?.message || 'Failed to delete hero content.',
      });
    },
  });
};
