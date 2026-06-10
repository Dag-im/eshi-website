'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeleteMissionStory, useMissionStories } from '@/lib/api/useMissionStory';
import { MissionStoryRecord } from '@/types/mission-story';

export default function AdminMissionStoriesPage() {
  const router = useRouter();
  const { data: items = [] } = useMissionStories();
  const deleteItem = useDeleteMissionStory();
  const [selected, setSelected] = useState<MissionStoryRecord | null>(null);

  return (
    <>
      <PageHeader
        title="Mission & Story"
        description="Manage the mission statements and stories displayed in the Who We Are section."
        action={<Button onClick={() => router.push('/admin/mission-story/create')} className="rounded-xl">Add item</Button>}
      />
      <DataTable<MissionStoryRecord>
        title="Mission & Story records"
        description="Items describing ESHI's mission and history."
        data={items}
        searchKeys={['title', 'description', 'type']}
        createHref="/admin/mission-story/create"
        createLabel="Add item"
        columns={[
          { key: 'type', label: 'Type', render: (item) => <span className="font-medium capitalize">{item.type}</span> },
          { key: 'title', label: 'Title' },
          {
            key: 'description',
            label: 'Description',
            render: (item) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{item.description}</p>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (item) => router.push(`/admin/mission-story/edit/${item.id}`) },
          { label: 'Delete', onClick: (item) => setSelected(item), className: 'text-destructive focus:text-destructive' },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete item"
        description={`Delete "${selected?.title}"?`}
        confirmLabel="Delete"
        variant="destructive"
        isLoading={deleteItem.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await deleteItem.mutateAsync(String(selected.id));
          setSelected(null);
        }}
      />
    </>
  );
}
