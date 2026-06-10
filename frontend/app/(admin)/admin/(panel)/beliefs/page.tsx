'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeleteBelief, useBeliefs } from '@/lib/api/useBeliefs';
import { BeliefRecord } from '@/types/belief';

export default function AdminBeliefsPage() {
  const router = useRouter();
  const { data: items = [] } = useBeliefs();
  const deleteItem = useDeleteBelief();
  const [selected, setSelected] = useState<BeliefRecord | null>(null);

  return (
    <>
      <PageHeader
        title="Beliefs"
        description="Manage the beliefs displayed in the Who We Are section."
        action={<Button onClick={() => router.push('/admin/beliefs/create')} className="rounded-xl">Add belief</Button>}
      />
      <DataTable<BeliefRecord>
        title="Belief records"
        description="Core principles and values of ESHI."
        data={items}
        searchKeys={['title', 'description']}
        createHref="/admin/beliefs/create"
        createLabel="Add belief"
        columns={[
          { key: 'title', label: 'Title' },
          {
            key: 'description',
            label: 'Description',
            render: (item) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{item.description}</p>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (item) => router.push(`/admin/beliefs/edit/${item.id}`) },
          { label: 'Delete', onClick: (item) => setSelected(item), className: 'text-destructive focus:text-destructive' },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete belief"
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
