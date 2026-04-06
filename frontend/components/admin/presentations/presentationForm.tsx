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
import { resolveAssetUrl } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';
import { Progress } from '@/components/ui/progress';

const presentationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  image: z.instanceof(File).optional(),
});

type PresentationFormValues = z.infer<typeof presentationSchema>;

interface PresentationFormProps {
  item?: {
    id: number;
    title: string;
    description: string;
    imageUrl?: string | null;
  };
  onSuccess?: () => void;
}

export const PresentationForm: React.FC<PresentationFormProps> = ({
  item,
  onSuccess,
}) => {
  const isEdit = !!item;
  const [filePreview, setFilePreview] = React.useState(resolveAssetUrl(item?.imageUrl || ''));
  const [progress, setProgress] = React.useState(0);

  const createMutation = useCreatePresentation();
  const updateMutation = useUpdatePresentation();

  const form = useForm<PresentationFormValues>({
    resolver: zodResolver(presentationSchema),
    defaultValues: {
      title: item?.title ?? '',
      description: item?.description ?? '',
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<PresentationFormValues> = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    if (values.image) formData.append('image', values.image);

    try {
      if (isEdit && item?.id) {
        await updateMutation.mutateAsync({ id: String(item.id), data: formData });
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
                    <Image
                      src={resolveAssetUrl(filePreview)}
                      alt="Preview"
                      width={640}
                      height={192}
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
          className="w-full bg-[var(--color-avocado)] hover:bg-[var(--color-rangitoto)] text-white"
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
