'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '../../hooks/use-toast';
import { CreateMethodologyPhaseDto, MethodologyPhase, UpdateMethodologyPhaseDto } from '../../types/methodology-phase';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse { error?: { message?: string } }

export const useMethodologyPhases = () => useQuery<MethodologyPhase[]>({
  queryKey: ['methodology-phases'],
  queryFn: async () => (await publicApi.get('/methodology-phases')).data,
});

export const useCreateMethodologyPhase = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMethodologyPhaseDto) => (await privateApi.post('/methodology-phases', data, { withCredentials: true })).data as MethodologyPhase,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['methodology-phases'] }); toast({ title: 'Methodology phase created successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to create methodology phase', description: error.response?.data?.error?.message || 'Failed to create methodology phase.' }),
  });
};

export const useUpdateMethodologyPhase = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateMethodologyPhaseDto }) => (await privateApi.put(`/methodology-phases/${id}`, data, { withCredentials: true })).data as MethodologyPhase,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['methodology-phases'] }); toast({ title: 'Methodology phase updated successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to update methodology phase', description: error.response?.data?.error?.message || 'Failed to update methodology phase.' }),
  });
};

export const useDeleteMethodologyPhase = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => { await privateApi.delete(`/methodology-phases/${id}`, { withCredentials: true }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['methodology-phases'] }); toast({ title: 'Methodology phase deleted successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to delete methodology phase', description: error.response?.data?.error?.message || 'Failed to delete methodology phase.' }),
  });
};
