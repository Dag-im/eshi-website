'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { privateApi, publicApi } from '../axios';
import { toast } from '../../hooks/use-toast';
import { BeliefRecord, CreateBeliefDto, UpdateBeliefDto } from '../../types/belief';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const useBeliefs = () => {
  return useQuery<BeliefRecord[]>({
    queryKey: ['beliefs'],
    queryFn: async () => {
      const res = await publicApi.get('/beliefs');
      return res.data;
    },
  });
};

export const useBelief = (id: string | number) => {
  return useQuery<BeliefRecord>({
    queryKey: ['belief', id],
    queryFn: async () => {
      const res = await publicApi.get(`/beliefs/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateBelief = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateBeliefDto) => {
      const res = await privateApi.post('/beliefs', data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['beliefs'] });
      toast({ title: 'Belief created successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create Belief',
        description: error.response?.data?.error?.message || 'Failed to create Belief.',
      });
    },
  });
};

export const useUpdateBelief = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateBeliefDto }) => {
      const res = await privateApi.put(`/beliefs/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['beliefs'] });
      qc.invalidateQueries({ queryKey: ['belief'] });
      toast({ title: 'Belief updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update Belief',
        description: error.response?.data?.error?.message || 'Failed to update Belief.',
      });
    },
  });
};

export const useDeleteBelief = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      await privateApi.delete(`/beliefs/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['beliefs'] });
      toast({ title: 'Belief deleted successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete Belief',
        description: error.response?.data?.error?.message || 'Failed to delete Belief.',
      });
    },
  });
};
