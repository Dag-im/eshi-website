'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '../../hooks/use-toast';
import { CreateServiceCardDto, ServiceCard, UpdateServiceCardDto } from '../../types/service-card';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse { error?: { message?: string } }

export const useServiceCards = () => useQuery<ServiceCard[]>({
  queryKey: ['service-cards'],
  queryFn: async () => (await publicApi.get('/service-cards')).data,
});

export const useCreateServiceCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateServiceCardDto) => (await privateApi.post('/service-cards', data, { withCredentials: true })).data as ServiceCard,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['service-cards'] }); toast({ title: 'Service card created successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to create service card', description: error.response?.data?.error?.message || 'Failed to create service card.' }),
  });
};

export const useUpdateServiceCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string | number; data: UpdateServiceCardDto }) => (await privateApi.put(`/service-cards/${id}`, data, { withCredentials: true })).data as ServiceCard,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['service-cards'] }); toast({ title: 'Service card updated successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to update service card', description: error.response?.data?.error?.message || 'Failed to update service card.' }),
  });
};

export const useDeleteServiceCard = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => { await privateApi.delete(`/service-cards/${id}`, { withCredentials: true }); },
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['service-cards'] }); toast({ title: 'Service card deleted successfully' }); },
    onError: (error: AxiosError<ApiErrorResponse>) => toast({ variant: 'destructive', title: 'Failed to delete service card', description: error.response?.data?.error?.message || 'Failed to delete service card.' }),
  });
};
