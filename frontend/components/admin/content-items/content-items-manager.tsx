'use client';

import { useEffect, useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2 } from 'lucide-react';

const iconOptions = [
  'BookOpen',
  'Globe',
  'BarChart',
  'Sprout',
  'Handshake',
  'Landmark',
  'Target',
  'Lightbulb',
  'FileText',
  'Users',
] as const;

export interface AdminContentItem {
  id: number;
  title: string;
  description?: string;
  icon?: string | null;
  points?: string[] | null;
  sortOrder: number;
}

export interface AdminContentPayload {
  title: string;
  description: string;
  icon: string | null;
  points: string[];
  sortOrder: number;
}

interface ContentItemsManagerProps {
  title: string;
  description: string;
  items: AdminContentItem[];
  isLoading?: boolean;
  isSaving?: boolean;
  isDeleting?: boolean;
  onCreate: (payload: AdminContentPayload) => Promise<unknown>;
  onUpdate: (id: number, payload: AdminContentPayload) => Promise<unknown>;
  onDelete: (id: number) => Promise<unknown>;
  titleLabel?: string;
  descriptionLabel?: string;
  pointsLabel?: string;
  showDescription?: boolean;
  showIcon?: boolean;
  showPoints?: boolean;
}

const emptyForm = {
  title: '',
  description: '',
  icon: 'BookOpen',
  points: '',
  sortOrder: 0,
};

function toPointsText(points?: string[] | null) {
  return points?.join('\n') || '';
}

export function ContentItemsManager({
  title,
  description,
  items,
  isLoading = false,
  isSaving = false,
  isDeleting = false,
  onCreate,
  onUpdate,
  onDelete,
  titleLabel = 'Title',
  descriptionLabel = 'Description',
  pointsLabel = 'Bullet points',
  showDescription = true,
  showIcon = true,
  showPoints = true,
}: ContentItemsManagerProps) {
  const [selected, setSelected] = useState<AdminContentItem | null>(null);
  const [editing, setEditing] = useState<AdminContentItem | null>(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    if (!editing) {
      setFormData(emptyForm);
      return;
    }

    setFormData({
      title: editing.title,
      description: editing.description || '',
      icon: editing.icon || 'BookOpen',
      points: toPointsText(editing.points),
      sortOrder: editing.sortOrder ?? 0,
    });
  }, [editing]);

  const resetForm = () => {
    setEditing(null);
    setFormData(emptyForm);
  };

  const onSave = async () => {
    const payload = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      icon: showIcon ? formData.icon : null,
      points: showPoints
        ? formData.points
            .split('\n')
            .map((point) => point.trim())
            .filter(Boolean)
        : [],
      sortOrder: Number(formData.sortOrder) || 0,
    };

    if (editing) {
      await onUpdate(editing.id, payload);
    } else {
      await onCreate(payload);
    }
    resetForm();
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
      <DataTable<AdminContentItem>
        title={title}
        description={description}
        data={items}
        searchKeys={['title', 'description']}
        columns={[
          { key: 'sortOrder', label: 'Order', className: 'w-20' },
          { key: 'title', label: titleLabel },
          ...(showDescription
            ? [
                {
                  key: 'description',
                  label: descriptionLabel,
                  render: (item: AdminContentItem) => (
                    <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  ),
                },
              ]
            : []),
          ...(showIcon
            ? [{ key: 'icon', label: 'Icon', className: 'w-32' }]
            : []),
        ]}
        actions={[
          { label: 'Edit', onClick: (item) => setEditing(item) },
          {
            label: 'Delete',
            onClick: (item) => setSelected(item),
            className: 'text-destructive focus:text-destructive',
          },
        ]}
        emptyTitle={isLoading ? 'Loading content...' : 'No content items yet'}
        emptyDescription="Use the form to add the first item for this section."
      />

      <Card className="h-fit rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardHeader>
          <CardTitle className="text-lg">{editing ? 'Edit item' : 'New item'}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="section-item-title">{titleLabel}</Label>
            <Input
              id="section-item-title"
              value={formData.title}
              onChange={(event) => setFormData((prev) => ({ ...prev, title: event.target.value }))}
              className="rounded-xl border-border/70"
            />
          </div>

          {showDescription ? (
            <div className="space-y-2">
              <Label htmlFor="section-item-description">{descriptionLabel}</Label>
              <Textarea
                id="section-item-description"
                value={formData.description}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, description: event.target.value }))
                }
                className="min-h-[120px] rounded-xl border-border/70"
              />
            </div>
          ) : null}

          {showPoints ? (
            <div className="space-y-2">
              <Label htmlFor="section-item-points">{pointsLabel}</Label>
              <Textarea
                id="section-item-points"
                value={formData.points}
                onChange={(event) =>
                  setFormData((prev) => ({ ...prev, points: event.target.value }))
                }
                placeholder="One bullet per line"
                className="min-h-[120px] rounded-xl border-border/70"
              />
            </div>
          ) : null}

          {showIcon ? (
            <div className="space-y-2">
              <Label>Icon</Label>
              <Select
                value={formData.icon}
                onValueChange={(icon) => setFormData((prev) => ({ ...prev, icon }))}
              >
                <SelectTrigger className="rounded-xl border-border/70">
                  <SelectValue placeholder="Select icon" />
                </SelectTrigger>
                <SelectContent>
                  {iconOptions.map((icon) => (
                    <SelectItem key={icon} value={icon}>
                      {icon}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ) : null}

          <div className="space-y-2">
            <Label htmlFor="section-item-order">Display order</Label>
            <Input
              id="section-item-order"
              type="number"
              min={0}
              value={formData.sortOrder}
              onChange={(event) =>
                setFormData((prev) => ({ ...prev, sortOrder: Number(event.target.value) }))
              }
              className="rounded-xl border-border/70"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {editing ? (
              <Button variant="outline" type="button" onClick={resetForm} className="rounded-xl">
                Cancel
              </Button>
            ) : null}
            <Button
              type="button"
              onClick={onSave}
              disabled={
                isSaving ||
                !formData.title.trim() ||
                (showDescription && !formData.description.trim()) ||
                (showPoints && !formData.points.trim())
              }
              className="rounded-xl"
            >
              {isSaving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              {editing ? 'Update item' : 'Create item'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete item"
        description={`Delete "${selected?.title}" from this section?`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={isDeleting}
        onConfirm={async () => {
          if (!selected) return;
          await onDelete(selected.id);
          setSelected(null);
        }}
      />
    </div>
  );
}
