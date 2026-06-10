'use client';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from '../../hooks/use-toast';
import {
  CreateMissionStoryDto,
  MissionStoryRecord,
  UpdateMissionStoryDto,
} from '../../types/mission-story';
import { privateApi, publicApi } from '../axios';

interface ApiErrorResponse {
  error?: {
    message?: string;
  };
}

export const useMissionStories = () => {
  return useQuery<MissionStoryRecord[]>({
    queryKey: ['mission-stories'],
    queryFn: async () => {
      const res = await publicApi.get('/mission-story');
      return res.data;
    },
  });
};

export const useMissionStory = (id: string | number) => {
  return useQuery<MissionStoryRecord>({
    queryKey: ['mission-story', id],
    queryFn: async () => {
      const res = await publicApi.get(`/mission-story/${id}`);
      return res.data;
    },
    enabled: !!id,
  });
};

export const useCreateMissionStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: CreateMissionStoryDto) => {
      const res = await privateApi.post('/mission-story', data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mission-stories'] });
      toast({ title: 'Mission Story created successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to create Mission Story',
        description:
          error.response?.data?.error?.message ||
          'Failed to create Mission Story.',
      });
    },
  });
};

export const useUpdateMissionStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string | number;
      data: UpdateMissionStoryDto;
    }) => {
      const res = await privateApi.put(`/mission-story/${id}`, data, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mission-stories'] });
      qc.invalidateQueries({ queryKey: ['mission-story'] });
      toast({ title: 'Mission Story updated successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to update Mission Story',
        description:
          error.response?.data?.error?.message ||
          'Failed to update Mission Story.',
      });
    },
  });
};

export const useDeleteMissionStory = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string | number) => {
      await privateApi.delete(`/mission-story/${id}`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['mission-stories'] });
      toast({ title: 'Mission Story deleted successfully' });
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      toast({
        variant: 'destructive',
        title: 'Failed to delete Mission Story',
        description:
          error.response?.data?.error?.message ||
          'Failed to delete Mission Story.',
      });
    },
  });
};
