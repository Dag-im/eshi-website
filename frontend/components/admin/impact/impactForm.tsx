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
import { useCreateImpact, useUpdateImpact } from '@/lib/api/useImpact';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const impactSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  desc: z.string().min(1, 'Description is required'),
  stat: z.string().min(1, 'Stat is required'),
  logo: z.instanceof(File).optional(),
});

type ImpactFormValues = z.infer<typeof impactSchema>;

interface ImpactFormProps {
  item?: {
    id: string;
    name: string;
    logoUrl?: string;
    desc: string;
    stat: string;
  };
  onSuccess?: () => void;
}

export const ImpactForm: React.FC<ImpactFormProps> = ({ item, onSuccess }) => {
  const isEdit = !!item;
  const [filePreview, setFilePreview] = React.useState(item?.logoUrl || '');
  const [progress, setProgress] = React.useState(0);

  const createMutation = useCreateImpact();
  const updateMutation = useUpdateImpact();

  const form = useForm<ImpactFormValues>({
    resolver: zodResolver(impactSchema),
    defaultValues: {
      name: item?.name ?? '',
      desc: item?.desc ?? '',
      stat: item?.stat ?? '',
      logo: undefined,
    },
  });

  const onSubmit: SubmitHandler<ImpactFormValues> = async (values) => {
    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('desc', values.desc);
    formData.append('stat', values.stat);
    if (values.logo) formData.append('image', values.logo); // Changed from 'logo' to 'file' to match Multer config

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
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stat"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stat</FormLabel>
              <FormControl>
                <Input placeholder="Enter stat (e.g., 100+ Users)" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Controller
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
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
                      src={filePreview}
                      alt="Preview"
                      fill
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
          {isEdit ? 'Update Impact' : 'Create Impact'}
        </Button>
      </form>
    </Form>
  );
};
