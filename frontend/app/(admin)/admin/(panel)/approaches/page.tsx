'use client';

import { PageHeader } from '@/components/admin/page-header';
import { ContentItemsManager } from '@/components/admin/content-items/content-items-manager';
import { useApproaches, useCreateApproach, useDeleteApproach, useUpdateApproach } from '@/lib/api/useApproaches';

export default function AdminApproachesPage() {
  const { data: approaches = [], isLoading } = useApproaches();
  const createApproach = useCreateApproach();
  const updateApproach = useUpdateApproach();
  const deleteApproach = useDeleteApproach();

  return (
    <>
      <PageHeader
        title="Approaches"
        description="Manage the approach cards displayed on the About page."
      />
      <ContentItemsManager
        title="Approach cards"
        description="Workshop, data training, and follow-up cards."
        items={approaches}
        isLoading={isLoading}
        isSaving={createApproach.isPending || updateApproach.isPending}
        isDeleting={deleteApproach.isPending}
        onCreate={(payload) => createApproach.mutateAsync(payload)}
        onUpdate={(id, payload) => updateApproach.mutateAsync({ id, data: payload })}
        onDelete={(id) => deleteApproach.mutateAsync(id)}
        showPoints={false}
      />
    </>
  );
}
