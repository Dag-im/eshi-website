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
import { useCreateUser, useUpdateUser } from '@/lib/api/useUsers';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  isActive: z.boolean(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  item?: {
    id: string;
    name: string;
    email: string;
    isActive: boolean;
  };
  onSuccess?: () => void;
}

export const UserForm: React.FC<UserFormProps> = ({ item, onSuccess }) => {
  const isEdit = !!item;

  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: item?.name ?? '',
      email: item?.email ?? '',
      isActive: item?.isActive ?? true, // Default to true for creation
    },
  });

  const onSubmit: SubmitHandler<UserFormValues> = async (values) => {
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
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Active</FormLabel>
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
        <Button
          type="submit"
          className="w-full"
          disabled={createMutation.isPending || updateMutation.isPending}
        >
          {(createMutation.isPending || updateMutation.isPending) && (
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
          )}
          {isEdit ? 'Update User' : 'Create User'}
        </Button>
      </form>
    </Form>
  );
};
