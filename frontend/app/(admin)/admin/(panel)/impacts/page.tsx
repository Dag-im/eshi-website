'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeleteImpact, useImpacts } from '@/lib/api/useImpact';
import { Impact } from '@/types/impact';

export default function AdminImpactsPage() {
  const router = useRouter();
  const { data: impacts = [] } = useImpacts();
  const deleteImpact = useDeleteImpact();
  const [selected, setSelected] = useState<Impact | null>(null);

  return (
    <>
      <PageHeader
        title="Impacts"
        description="Curate evidence of impact, logos, and proof points for the public services experience."
        action={<Button onClick={() => router.push('/admin/impacts/create')} className="rounded-xl">Add impact</Button>}
      />
      <DataTable<Impact>
        title="Impact records"
        description="Outcome snapshots and logos used as social proof."
        data={impacts}
        searchKeys={['name', 'desc', 'stat']}
        createHref="/admin/impacts/create"
        createLabel="Add impact"
        columns={[
          { key: 'name', label: 'Name' },
          {
            key: 'stat',
            label: 'Stat',
            render: (impact: Impact) => <span className="font-medium">{impact.stat}</span>,
          },
          {
            key: 'desc',
            label: 'Description',
            render: (impact: Impact) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{impact.desc}</p>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (impact) => router.push(`/admin/impacts/edit/${impact.id}`) },
          { label: 'Delete', onClick: (impact) => setSelected(impact), className: 'text-destructive focus:text-destructive' },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete impact record"
        description={`Delete "${selected?.name}" from the impact section.`}
        confirmLabel="Delete impact"
        variant="destructive"
        isLoading={deleteImpact.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await deleteImpact.mutateAsync(String(selected.id));
          setSelected(null);
        }}
      />
    </>
  );
}
