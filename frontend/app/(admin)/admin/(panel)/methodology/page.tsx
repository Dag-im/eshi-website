'use client';

import { PageHeader } from '@/components/admin/page-header';
import { ContentItemsManager } from '@/components/admin/content-items/content-items-manager';
import {
  useCreateMethodologyPhase,
  useDeleteMethodologyPhase,
  useMethodologyPhases,
  useUpdateMethodologyPhase,
} from '@/lib/api/useMethodologyPhases';

export default function AdminMethodologyPage() {
  const { data: phases = [], isLoading } = useMethodologyPhases();
  const createPhase = useCreateMethodologyPhase();
  const updatePhase = useUpdateMethodologyPhase();
  const deletePhase = useDeleteMethodologyPhase();
  const items = phases.map((phase) => ({
    id: phase.id,
    title: phase.phase,
    description: phase.description,
    points: phase.items,
    sortOrder: phase.sortOrder,
  }));

  return (
    <>
      <PageHeader
        title="Methodology"
        description="Manage the methodology phases displayed on the Services page."
      />
      <ContentItemsManager
        title="Methodology phases"
        description="Two-phase workshop and follow-up content."
        items={items}
        isLoading={isLoading}
        isSaving={createPhase.isPending || updatePhase.isPending}
        isDeleting={deletePhase.isPending}
        onCreate={(payload) =>
          createPhase.mutateAsync({
            phase: payload.title,
            description: payload.description,
            items: payload.points,
            sortOrder: payload.sortOrder,
          })
        }
        onUpdate={(id, payload) =>
          updatePhase.mutateAsync({
            id,
            data: {
              phase: payload.title,
              description: payload.description,
              items: payload.points,
              sortOrder: payload.sortOrder,
            },
          })
        }
        onDelete={(id) => deletePhase.mutateAsync(id)}
        titleLabel="Phase"
        pointsLabel="Phase bullets"
        showIcon={false}
      />
    </>
  );
}
