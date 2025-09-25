// contact.ts
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

export const useSubmitContact = () => {
  return useMutation({
    mutationFn: async ({
      name,
      email,
      message,
    }: {
      name: string;
      email: string;
      message: string;
    }) => {
      const res = await publicApi.post('/contact', { name, email, message });
      return res.data;
    },
  });
};

export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const res = await privateApi.get('/contact');
      console.log(res.data);
      return res.data;
    },
  });
};

export const useContactMessage = (id: string) => {
  return useQuery({
    queryKey: ['contact-message', id],
    queryFn: async () => {
      const res = await privateApi.get(`/contact/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useMarkMessageSeen = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await privateApi.put(`/contact/${id}/mark-seen`);
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['contact-messages'] });
      toast.success('Message marked as seen!');
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast.error(
        error.response?.data?.error?.message ||
          'Failed to mark message as seen.'
      );
    },
  });
};
