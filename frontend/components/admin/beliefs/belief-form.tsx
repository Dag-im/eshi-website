'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBelief, useUpdateBelief } from '@/lib/api/useBeliefs';
import { BeliefRecord } from '@/types/belief';

interface BeliefFormProps {
  initialData?: BeliefRecord;
}

export function BeliefForm({ initialData }: BeliefFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);
  const createItem = useCreateBelief();
  const updateItem = useUpdateBelief();

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
  });

  const onSave = async () => {
    if (isEditing && initialData) {
      await updateItem.mutateAsync({ id: initialData.id, data: formData });
    } else {
      await createItem.mutateAsync(formData);
    }
    router.push('/admin/beliefs');
  };

  const isPending = createItem.isPending || updateItem.isPending;

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit Belief' : 'New Belief'}</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Our values"
                className="rounded-xl border-border/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="min-h-[120px] rounded-xl border-border/70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end gap-3">
        <Button variant="outline" type="button" onClick={() => router.back()} className="rounded-xl">
          Cancel
        </Button>
        <Button disabled={isPending || !formData.title || !formData.description} onClick={onSave} className="rounded-xl">
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isEditing ? 'Update belief' : 'Create belief'}
        </Button>
      </div>
    </div>
  );
}
