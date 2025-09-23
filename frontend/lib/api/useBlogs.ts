'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

// Public fetch blogs
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

// Public fetch single blog
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

// Admin create
export const useCreateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.post('/blogs', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

// Admin update
export const useUpdateBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await privateApi.put(`/blogs/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};

// Admin delete
export const useDeleteBlog = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/blogs/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['blogs'] }),
  });
};
