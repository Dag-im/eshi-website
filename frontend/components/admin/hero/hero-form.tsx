'use client';

import { ImagePlus, Loader2, Upload, X } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useUpdateHero } from '@/lib/api/useHero';
import { resolveAssetUrl } from '@/lib/utils';
import { HeroImage } from '@/types/hero';

type EditableHeroImage = {
  id: string;
  alt: string;
  src?: string;
  file?: File;
  existing: boolean;
};

interface HeroFormProps {
  images: HeroImage[];
}

function createImageId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function HeroForm({ images }: HeroFormProps) {
  const updateHero = useUpdateHero();
  const [items, setItems] = useState<EditableHeroImage[]>([]);

  useEffect(() => {
    setItems(
      images.map((image) => ({
        id: createImageId(),
        alt: image.alt || '',
        src: image.src || '',
        existing: true,
      }))
    );
  }, [images]);

  const hasImages = items.length > 0;
  const newUploadsCount = useMemo(
    () => items.filter((item) => !item.existing && item.file).length,
    [items]
  );

  const onSave = async () => {
    const formData = new FormData();

    const existingImages = items
      .filter((item) => item.existing && item.src)
      .map((item) => ({ src: item.src, alt: item.alt }));

    const newImages = items.filter((item) => !item.existing && item.file);

    formData.append('existing', JSON.stringify(existingImages));
    formData.append('alts', JSON.stringify(newImages.map((item) => item.alt)));

    newImages.forEach((item) => {
      if (item.file) formData.append('images', item.file);
    });

    await updateHero.mutateAsync(formData);
  };

  return (
    <div className="space-y-6">
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="space-y-5 p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold">Background slides</h2>
              <p className="text-sm text-muted-foreground">
                Manage hero slides with the same upload behavior used across the admin panel.
              </p>
            </div>
            <Label
              htmlFor="hero-images"
              className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-xl border border-border/70 bg-muted/35 px-4 text-sm font-medium transition-colors hover:bg-muted"
            >
              <Upload className="size-4" />
              Add images
            </Label>
          </div>

          <input
            id="hero-images"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(event) => {
              const files = Array.from(event.target.files || []);
              if (!files.length) return;

              setItems((current) => [
                ...current,
                ...files.map((file) => ({
                  id: createImageId(),
                  alt: '',
                  file,
                  src: URL.createObjectURL(file),
                  existing: false,
                })),
              ]);

              event.target.value = '';
            }}
          />

          {hasImages ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item, index) => {
                const src = resolveAssetUrl(item.src || '');
                const isBlob = src.startsWith('blob:') || src.startsWith('data:');

                return (
                  <Card
                    key={item.id}
                    className="overflow-hidden rounded-2xl border-border/70 bg-background/80 shadow-none"
                  >
                    <div className="relative border-b border-border/70">
                      {src ? (
                        isBlob ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={src}
                            alt={item.alt || `Hero image ${index + 1}`}
                            className="h-48 w-full object-cover"
                          />
                        ) : (
                          <Image
                            src={src}
                            alt={item.alt || `Hero image ${index + 1}`}
                            width={640}
                            height={192}
                            className="h-48 w-full object-cover"
                          />
                        )
                      ) : (
                        <div className="flex h-48 items-center justify-center bg-muted text-sm text-muted-foreground">
                          No image selected
                        </div>
                      )}

                      <div className="absolute left-3 top-3 rounded-full bg-black/60 px-2.5 py-1 text-xs font-medium text-white">
                        Slide {index + 1}
                      </div>

                      <button
                        type="button"
                        className="absolute right-3 top-3 rounded-full bg-white p-1 text-red-500 shadow"
                        onClick={() =>
                          setItems((current) => current.filter((currentItem) => currentItem.id !== item.id))
                        }
                        aria-label={`Remove slide ${index + 1}`}
                      >
                        <X className="size-4" />
                      </button>
                    </div>

                    <CardContent className="space-y-3 p-4">
                      <div className="space-y-2">
                        <Label htmlFor={`hero-alt-${item.id}`}>Alt text</Label>
                        <Input
                          id={`hero-alt-${item.id}`}
                          value={item.alt}
                          onChange={(event) =>
                            setItems((current) =>
                              current.map((currentItem) =>
                                currentItem.id === item.id
                                  ? { ...currentItem, alt: event.target.value }
                                  : currentItem
                              )
                            )
                          }
                          placeholder="Describe this image for accessibility"
                          className="rounded-xl border-border/70"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {item.existing ? 'Existing image' : 'New upload'}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="flex min-h-[220px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border/80 bg-muted/20 px-6 py-10 text-center">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ImagePlus className="size-6" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">No hero images yet</p>
                <p className="text-sm text-muted-foreground">
                  Upload the image set that rotates on the public homepage.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-background/80 px-5 py-4 shadow-sm shadow-black/5 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-muted-foreground">
          {items.length} total slide{items.length === 1 ? '' : 's'}
          {newUploadsCount > 0 ? `, ${newUploadsCount} new upload${newUploadsCount === 1 ? '' : 's'}` : ''}
        </div>

        <Button
          type="button"
          className="rounded-xl"
          disabled={updateHero.isPending}
          onClick={onSave}
        >
          {updateHero.isPending ? <Loader2 className="size-4 animate-spin" /> : null}
          {updateHero.isPending ? 'Saving hero' : 'Save hero images'}
        </Button>
      </div>
    </div>
  );
}
