'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { privateApi, publicApi } from '../axios';

export const useTeam = () => {
  return useQuery({
    queryKey: ['team'],
    queryFn: async () => {
      const res = await publicApi.get('/team');
      return res.data;
    },
  });
};

export const useTeamMember = (id: string) => {
  return useQuery({
    queryKey: ['team-member', id],
    queryFn: async () => {
      const res = await publicApi.get(`/team/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useTeamMembers = () => {
  return useQuery({
    queryKey: ['team-members'],
    queryFn: async () => {
      const res = await publicApi.get('/team');
      return res.data;
    },
  });
};

export const useCreateTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: FormData) => {
      const res = await privateApi.post('/team', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
};

export const useUpdateTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: FormData }) => {
      const res = await privateApi.put(`/team/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
};

export const useDeleteTeamMember = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      await privateApi.delete(`/team/${id}`);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['team'] }),
  });
};
