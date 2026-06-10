'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '../../hooks/use-toast';
import { Approach, CreateApproachDto, UpdateApproachDto } from '../../types/approach';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse { error?: { message?: string } }

export const useApproaches = () => useQuery<Approach[]>({
  queryKey: ['approaches'],
  queryFn: async () => (await publicApi.get('/approaches')).data,
});

export const useCreateApproach = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateApproachDto) => (await privateApi.post('/approaches', data, { withCredentials: true })).data as Approach,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['approaches'] }); toast({ title: 'Approach created successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to create approach', description: error.response?.data?.error?.message || 'Failed to create approach.' }),
  });
};

export const useUpdateApproach = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateApproachDto }) => (await privateApi.put(`/approaches/${id}`, data, { withCredentials: true })).data as Approach,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['approaches'] }); toast({ title: 'Approach updated successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to update approach', description: error.response?.data?.error?.message || 'Failed to update approach.' }),
  });
};

export const useDeleteApproach = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => { await privateApi.delete(`/approaches/${id}`, { withCredentials: true }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['approaches'] }); toast({ title: 'Approach deleted successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to delete approach', description: error.response?.data?.error?.message || 'Failed to delete approach.' }),
  });
};
