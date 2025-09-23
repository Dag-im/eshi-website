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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useCreateService, useUpdateService } from '@/lib/api/useService';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Activity,
  Bell,
  Book,
  Camera,
  Check,
  Code,
  Globe,
  Heart,
  Home,
  Loader2,
  Lock,
  Mail,
  Map,
  Phone,
  Star,
  User,
} from 'lucide-react';
import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  icon: z.string().min(1, 'Icon is required'),
});

type ServiceFormValues = z.infer<typeof serviceSchema>;

// Sample Lucide icons (subset for simplicity, can be expanded)
const availableIcons = [
  'Activity',
  'Bell',
  'Book',
  'Camera',
  'Check',
  'Code',
  'Globe',
  'Heart',
  'Home',
  'Lock',
  'Mail',
  'Map',
  'Phone',
  'Star',
  'User',
] as const;

const iconMap = {
  Activity,
  Bell,
  Book,
  Camera,
  Check,
  Code,
  Globe,
  Heart,
  Home,
  Lock,
  Mail,
  Map,
  Phone,
  Star,
  User,
};

interface ServiceFormProps {
  item?: {
    id: string;
    title: string;
    description: string;
    icon?: string;
  };
  onSuccess?: () => void;
}

export const ServiceForm: React.FC<ServiceFormProps> = ({
  item,
  onSuccess,
}) => {
  const isEdit = !!item;

  const createMutation = useCreateService();
  const updateMutation = useUpdateService();

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: item?.title ?? '',
      description: item?.description ?? '',
      icon: item?.icon ?? '',
    },
  });

  const onSubmit: SubmitHandler<ServiceFormValues> = async (values) => {
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
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon</FormLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {availableIcons.map((icon) => {
                    const IconComponent = iconMap[icon];
                    return (
                      <SelectItem key={icon} value={icon}>
                        <div className="flex items-center gap-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{icon}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
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
          {isEdit ? 'Update Service' : 'Create Service'}
        </Button>
      </form>
    </Form>
  );
};
