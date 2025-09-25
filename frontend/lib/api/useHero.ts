// hero.ts
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

export const useHero = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      const res = await publicApi.get('/hero');
      return res.data;
    },
  });
};

export const useUpdateHero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.put('/hero', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['hero'] });
      toast.success('Hero updated successfully!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to update hero.'
      );
    },
  });
};
