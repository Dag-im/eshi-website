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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBlog, useUpdateBlog } from '@/lib/api/useBlogs';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Upload, X } from 'lucide-react';
import * as React from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  excerpt: z.string().min(1, 'Excerpt is required'),
  category: z.string().min(1, 'Category is required'),
  content: z.string().min(1, 'Content is required'),
  featured: z.boolean(), // ✅ force it to always be boolean
  date: z.string().optional(),
  image: z.instanceof(File).optional(), // better type than `any`
});

type BlogFormValues = z.infer<typeof blogSchema>;

interface BlogFormProps {
  item?: {
    id: string;
    title: string;
    excerpt: string;
    category: string;
    content: string;
    featured?: boolean;
    date?: string;
    imageUrl?: string;
  };
  onSuccess?: () => void;
}

const categories = ['Tech', 'Business', 'Health', 'Education', 'Other'];

export const BlogForm: React.FC<BlogFormProps> = ({ item, onSuccess }) => {
  const isEdit = !!item;
  const [filePreview, setFilePreview] = React.useState(item?.imageUrl || '');
  const [progress, setProgress] = React.useState(0);

  const createMutation = useCreateBlog();
  const updateMutation = useUpdateBlog();

  const form = useForm<BlogFormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: item?.title ?? '',
      excerpt: item?.excerpt ?? '',
      category: item?.category ?? '',
      content: item?.content ?? '',
      featured: item?.featured ?? false,
      date: item?.date?.slice(0, 10) ?? '',
      image: undefined,
    },
  });

  const onSubmit: SubmitHandler<BlogFormValues> = async (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('excerpt', values.excerpt);
    formData.append('category', values.category);
    formData.append('content', values.content);
    formData.append('featured', String(values.featured));
    if (values.date) formData.append('date', values.date);
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
        {/* Title */}
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

        {/* Excerpt */}
        <FormField
          control={form.control}
          name="excerpt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Excerpt</FormLabel>
              <FormControl>
                <Textarea placeholder="Short description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Content */}
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  rows={6}
                  placeholder="Write blog content..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Featured */}
        <FormField
          control={form.control}
          name="featured"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Featured</FormLabel>
              <FormControl>
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Date */}
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Image Upload */}
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

        {/* Submit */}
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {(createMutation.isPending || updateMutation.isPending) && (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          )}
          {isEdit ? 'Update Blog' : 'Create Blog'}
        </Button>
      </form>
    </Form>
  );
};
