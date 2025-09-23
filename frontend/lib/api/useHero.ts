'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

// Public fetch
export const useHero = () => {
  return useQuery({
    queryKey: ['hero'],
    queryFn: async () => {
      const res = await publicApi.get('/hero');
      return res.data;
    },
  });
};

// Admin update
export const useUpdateHero = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.put('/hero', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['hero'] }),
  });
};
