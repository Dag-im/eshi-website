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
import { Textarea } from '@/components/ui/textarea';
import {
  useCreatePresentation,
  useUpdatePresentation,
} from '@/lib/api/usePresentations';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const presentationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
});

type PresentationFormValues = z.infer<typeof presentationSchema>;

interface PresentationFormProps {
  item?: {
    id: string;
    title: string;
    description: string;
  };
  onSuccess?: () => void;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({
  item,
  onSuccess,
}) => {
  const isEdit = !!item;

  const createMutation = useCreatePresentation();
  const updateMutation = useUpdatePresentation();

  const form = useForm<PresentationFormValues>({
    resolver: zodResolver(presentationSchema),
    defaultValues: {
      title: item?.title ?? '',
      description: item?.description ?? '',
    },
  });

  const onSubmit: SubmitHandler<PresentationFormValues> = async (values) => {
    try {
      if (isEdit && item?.id) {
        await updateMutation.mutateAsync({ id: item.id, data: values });
      } else {
        await createMutation.mutateAsync(values);
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
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea rows={6} placeholder="Enter description" {...field} />
              </FormControl>
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
          {isEdit ? 'Update Presentation' : 'Create Presentation'}
        </Button>
      </form>
    </Form>
  );
};
