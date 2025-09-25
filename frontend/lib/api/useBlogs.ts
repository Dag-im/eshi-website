// blogs.ts
'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { privateApi, publicApi } from '../axios';

export const useBlogs = (params?: {
  page?: number;
  limit?: number;
  featured?: boolean;
  category?: string;
}) => {
  return useQuery({
    queryKey: ['blogs', params],
    queryFn: async () => {
      const res = await publicApi.get('/blogs', { params });
      return res.data;
    },
  });
};

export const useBlog = (slug: string) => {
  return useQuery({
    queryKey: ['blog', slug],
    queryFn: async () => {
      const res = await publicApi.get(`/blogs/${slug}`);
      return res.data;
    },
    enabled: !!slug,
  });
};

export const useCreateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.post('/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog created successfully!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to create blog.'
      );
    },
  });
};

export const useUpdateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await privateApi.put(`/blogs/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog updated successfully!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to update blog.'
      );
    },
  });
};

export const useDeleteBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/blogs/${id}`);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['blogs'] });
      toast.success('Blog deleted successfully!');
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.error?.message || 'Failed to delete blog.'
      );
    },
  });
};
