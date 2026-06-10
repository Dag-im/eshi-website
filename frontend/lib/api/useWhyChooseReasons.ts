'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '../../hooks/use-toast';
import { CreateWhyChooseReasonDto, UpdateWhyChooseReasonDto, WhyChooseReason } from '../../types/why-choose-reason';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse { error?: { message?: string } }

export const useWhyChooseReasons = () => useQuery<WhyChooseReason[]>({
  queryKey: ['why-choose-reasons'],
  queryFn: async () => (await publicApi.get('/why-choose-reasons')).data,
});

export const useCreateWhyChooseReason = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateWhyChooseReasonDto) => (await privateApi.post('/why-choose-reasons', data, { withCredentials: true })).data as WhyChooseReason,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['why-choose-reasons'] }); toast({ title: 'Reason created successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to create reason', description: error.response?.data?.error?.message || 'Failed to create reason.' }),
  });
};

export const useUpdateWhyChooseReason = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateWhyChooseReasonDto }) => (await privateApi.put(`/why-choose-reasons/${id}`, data, { withCredentials: true })).data as WhyChooseReason,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['why-choose-reasons'] }); toast({ title: 'Reason updated successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to update reason', description: error.response?.data?.error?.message || 'Failed to update reason.' }),
  });
};

export const useDeleteWhyChooseReason = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => { await privateApi.delete(`/why-choose-reasons/${id}`, { withCredentials: true }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['why-choose-reasons'] }); toast({ title: 'Reason deleted successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to delete reason', description: error.response?.data?.error?.message || 'Failed to delete reason.' }),
  });
};
