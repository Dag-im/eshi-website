'use client';

import { Loader2, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useCreateAbout } from '@/lib/api/useAbout';
import { AboutRecord } from '@/types/about';

interface AboutFormProps {
  initialData?: AboutRecord | null;
}

export function AboutForm({ initialData }: AboutFormProps) {
  const createAbout = useCreateAbout();
  const [title, setTitle] = useState('ABOUT ESHI');
  const [paragraphs, setParagraphs] = useState<string[]>(['']);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || 'ABOUT ESHI');
      setParagraphs(initialData.paragraphs?.length ? initialData.paragraphs : ['']);
    }
  }, [initialData]);

  const handleParagraphChange = (index: number, value: string) => {
    const newParagraphs = [...paragraphs];
    newParagraphs[index] = value;
    setParagraphs(newParagraphs);
  };

  const addParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const removeParagraph = (index: number) => {
    if (paragraphs.length <= 1) return;
    const newParagraphs = paragraphs.filter((_, i) => i !== index);
    setParagraphs(newParagraphs);
  };

  const onSave = async () => {
    // Filter out empty paragraphs before saving
    const filteredParagraphs = paragraphs.filter(p => p.trim() !== '');
    if (filteredParagraphs.length === 0) {
      filteredParagraphs.push(''); // Ensure at least one exists to avoid validation error
    }
    await createAbout.mutateAsync({ title, paragraphs: filteredParagraphs });
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="space-y-6 p-6">
          <div className="space-y-1">
            <h2 className="text-lg font-semibold">About Us Content</h2>
            <p className="text-sm text-muted-foreground">
              Update the text displayed in the &apos;About Eshi&apos; section of the homepage.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Section Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. ABOUT ESHI"
                className="rounded-xl border-border/70"
              />
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Paragraphs</Label>
                <Button type="button" variant="outline" size="sm" onClick={addParagraph} className="rounded-xl">
                  <Plus className="mr-2 size-4" />
                  Add Paragraph
                </Button>
              </div>
              
              {paragraphs.map((para, index) => (
                <div key={index} className="flex gap-2 items-start">
                  <Textarea
                    value={para}
                    onChange={(e) => handleParagraphChange(index, e.target.value)}
                    placeholder={`Paragraph ${index + 1}...`}
                    className="min-h-[100px] rounded-xl border-border/70"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeParagraph(index)}
                    disabled={paragraphs.length <= 1}
                    className="text-destructive hover:bg-destructive/10 shrink-0"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end">
        <Button
          type="button"
          className="rounded-xl"
          disabled={createAbout.isPending}
          onClick={onSave}
        >
          {createAbout.isPending ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
          {createAbout.isPending ? 'Saving...' : 'Save content'}
        </Button>
      </div>
    </div>
  );
}
