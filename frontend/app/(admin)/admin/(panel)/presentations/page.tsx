'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeletePresentation, usePresentations } from '@/lib/api/usePresentations';
import { Presentation } from '@/types/presentaion';

export default function AdminPresentationsPage() {
  const router = useRouter();
  const { data: presentations = [] } = usePresentations();
  const deletePresentation = useDeletePresentation();
  const [selected, setSelected] = useState<Presentation | null>(null);

  return (
    <>
      <PageHeader
        title="Presentations"
        description="Manage the workshop, training, and presentation content showcased in the public experience."
        action={<Button onClick={() => router.push('/admin/presentations/create')} className="rounded-xl">Add presentation</Button>}
      />
      <DataTable<Presentation>
        title="Presentation library"
        description="Narrative cards used in the About page experience."
        data={presentations}
        searchKeys={['title', 'description']}
        createHref="/admin/presentations/create"
        createLabel="Add presentation"
        columns={[
          { key: 'title', label: 'Title' },
          {
            key: 'description',
            label: 'Description',
            render: (presentation: Presentation) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{presentation.description}</p>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (presentation) => router.push(`/admin/presentations/edit/${presentation.id}`) },
          { label: 'Delete', onClick: (presentation) => setSelected(presentation), className: 'text-destructive focus:text-destructive' },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete presentation"
        description={`Delete "${selected?.title}" from the presentation library.`}
        confirmLabel="Delete presentation"
        variant="destructive"
        isLoading={deletePresentation.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await deletePresentation.mutateAsync(String(selected.id));
          setSelected(null);
        }}
      />
    </>
  );
}
