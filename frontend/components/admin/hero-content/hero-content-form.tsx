'use client';

import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateHeroContent } from '@/lib/api/useHeroContent';
import { HeroContentRecord } from '@/types/hero-content';

interface HeroContentFormProps {
  initialData?: HeroContentRecord | null;
}

export function HeroContentForm({ initialData }: HeroContentFormProps) {
  const createHeroContent = useCreateHeroContent();
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        title: initialData.title || '',
        subtitle: initialData.subtitle || '',
        description: initialData.description || '',
      });
    }
  }, [initialData]);

  const onSave = async () => {
    await createHeroContent.mutateAsync(formData);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">Hero Text Content</h2>
            <p className="text-sm text-muted-foreground">
              Update the title, subtitle, and description displayed on the homepage hero section.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                placeholder="e.g. ESHI Consultancy"
                className="rounded-xl border-border/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="subtitle">Subtitle</Label>
              <Input
                id="subtitle"
                value={formData.subtitle}
                onChange={(e) => setFormData((prev) => ({ ...prev, subtitle: e.target.value }))}
                placeholder="e.g. Building Capacity for Local Grassroots Organizations"
                className="rounded-xl border-border/70"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Write a brief description..."
                className="min-h-[120px] rounded-xl border-border/70"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="rounded-xl"
          disabled={createHeroContent.isPending}
          onClick={onSave}
        >
          {createHeroContent.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          {createHeroContent.isPending ? 'Saving...' : 'Save content'}
        </Button>
      </div>
    </div>
  );
}
