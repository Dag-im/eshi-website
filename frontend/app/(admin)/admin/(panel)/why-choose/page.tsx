'use client';

import { PageHeader } from '@/components/admin/page-header';
import { ContentItemsManager } from '@/components/admin/content-items/content-items-manager';
import {
  useCreateWhyChooseReason,
  useDeleteWhyChooseReason,
  useUpdateWhyChooseReason,
  useWhyChooseReasons,
} from '@/lib/api/useWhyChooseReasons';

export default function AdminWhyChoosePage() {
  const { data: reasons = [], isLoading } = useWhyChooseReasons();
  const createReason = useCreateWhyChooseReason();
  const updateReason = useUpdateWhyChooseReason();
  const deleteReason = useDeleteWhyChooseReason();

  return (
    <>
      <PageHeader
        title="Why Choose ESHI"
        description="Manage the reasons displayed in the Why Choose ESHI section."
      />
      <ContentItemsManager
        title="Why choose reasons"
        description="Public-facing reasons that explain ESHI's value."
        items={reasons}
        isLoading={isLoading}
        isSaving={createReason.isPending || updateReason.isPending}
        isDeleting={deleteReason.isPending}
        onCreate={(payload) => createReason.mutateAsync(payload)}
        onUpdate={(id, payload) => updateReason.mutateAsync({ id, data: payload })}
        onDelete={(id) => deleteReason.mutateAsync(id)}
        showPoints={false}
      />
    </>
  );
}
