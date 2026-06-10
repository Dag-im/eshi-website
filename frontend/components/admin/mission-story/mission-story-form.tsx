'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateMissionStory, useUpdateMissionStory } from '@/lib/api/useMissionStory';
import { MissionStoryRecord } from '@/types/mission-story';

interface MissionStoryFormProps {
  initialData?: MissionStoryRecord;
}

export function MissionStoryForm({ initialData }: MissionStoryFormProps) {
  const router = useRouter();
  const isEditing = Boolean(initialData);
  const createItem = useCreateMissionStory();
  const updateItem = useUpdateMissionStory();

  const [formData, setFormData] = useState({
    type: initialData?.type || '',
    title: initialData?.title || '',
    description: initialData?.description || '',
  });

  const onSave = async () => {
    if (isEditing && initialData) {
      await updateItem.mutateAsync({ id: initialData.id, data: formData });
    } else {
      await createItem.mutateAsync(formData);
    }
    router.push('/admin/mission-story');
  };

  const isPending = createItem.isPending || updateItem.isPending;

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">{isEditing ? 'Edit Item' : 'New Item'}</h2>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="type">Type (e.g., mission, story)</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="mission"
                className="rounded-xl border-border/70"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Our Mission"
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
        <Button disabled={isPending || !formData.type || !formData.title || !formData.description} onClick={onSave} className="rounded-xl">
          {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
          {isEditing ? 'Update item' : 'Create item'}
        </Button>
      </div>
    </div>
  );
}
