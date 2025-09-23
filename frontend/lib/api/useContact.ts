'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

// Public contact form submission
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

// Admin get all messages
export const useContactMessages = () => {
  return useQuery({
    queryKey: ['contact-messages'],
    queryFn: async () => {
      const res = await privateApi.get('/contact');
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
    onSuccess: () => qc.invalidateQueries({ queryKey: ['contact-messages'] }),
  });
};
