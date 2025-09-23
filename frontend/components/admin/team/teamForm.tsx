'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { useCreateTeamMember, useUpdateTeamMember } from '@/lib/api/useTeam';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const teamSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  title: z.string().min(1, 'Title is required'),
  bio: z.string().min(1, 'Bio is required'),
  image: z.instanceof(File).optional(),
});

type TeamFormValues = z.infer<typeof teamSchema>;

interface TeamFormProps {
  item?: {
    id: string;
    name: string;
    title: string;
    bio: string;
    imageUrl?: string;
  };
  onSuccess?: () => void;
}

export const TeamForm: React.FC<TeamFormProps> = ({ item, onSuccess }) => {
  const isEdit = !!item;
  const [filePreview, setFilePreview] = React.useState(item?.imageUrl || '');
  const [progress, setProgress] = React.useState(0);

  const createMutation = useCreateTeamMember();
  const updateMutation = useUpdateTeamMember();

  const form = useForm<TeamFormValues>({
    resolver: zodResolver(teamSchema),
    defaultValues: {
      name: item?.name ?? '',
      title: item?.title ?? '',
      bio: item?.bio ?? '',
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<TeamFormValues> = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('title', values.title);
    formData.append('bio', values.bio);
    if (values.image) formData.append('image', values.image);

    try {
      if (isEdit && item?.id) {
        await updateMutation.mutateAsync({ id: item.id, data: formData });
      } else {
        await createMutation.mutateAsync(formData);
      }
      onSuccess?.();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-2xl mx-auto"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Enter bio" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <div className="border-2 border-dashed rounded-lg p-4 text-center">
                {!filePreview ? (
                  <label className="cursor-pointer flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <span>Drag & drop or click to upload</span>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          field.onChange(file);
                          setFilePreview(URL.createObjectURL(file));
                          setProgress(0);
                        }
                      }}
                    />
                  </label>
                ) : (
                  <div className="relative">
                    <img
                      src={filePreview}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-md"
                    />
                    <button
                      type="button"
                      className="absolute top-2 right-2 text-red-500 bg-white rounded-full p-1 shadow-md"
                      onClick={() => {
                        field.onChange(undefined);
                        setFilePreview('');
                      }}
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                )}
                {field.value && <Progress value={progress} className="mt-2" />}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {(createMutation.isPending || updateMutation.isPending) && (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          )}
          {isEdit ? 'Update Team Member' : 'Create Team Member'}
        </Button>
      </form>
    </Form>
  );
};
