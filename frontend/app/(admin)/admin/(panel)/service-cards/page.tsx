'use client';

import { PageHeader } from '@/components/admin/page-header';
import { ContentItemsManager } from '@/components/admin/content-items/content-items-manager';
import {
  useCreateServiceCard,
  useDeleteServiceCard,
  useServiceCards,
  useUpdateServiceCard,
} from '@/lib/api/useServiceCards';

export default function AdminServiceCardsPage() {
  const { data: serviceCards = [], isLoading } = useServiceCards();
  const createServiceCard = useCreateServiceCard();
  const updateServiceCard = useUpdateServiceCard();
  const deleteServiceCard = useDeleteServiceCard();
  const items = serviceCards.map((serviceCard) => ({
    id: serviceCard.id,
    title: serviceCard.title,
    points: serviceCard.points,
    sortOrder: serviceCard.sortOrder,
  }));

  return (
    <>
      <PageHeader
        title="Service Cards"
        description="Manage the service summary cards displayed on the Services page."
      />
      <ContentItemsManager
        title="Service cards"
        description="High-level service categories and bullet points."
        items={items}
        isLoading={isLoading}
        isSaving={createServiceCard.isPending || updateServiceCard.isPending}
        isDeleting={deleteServiceCard.isPending}
        onCreate={(payload) =>
          createServiceCard.mutateAsync({
            title: payload.title,
            points: payload.points,
            sortOrder: payload.sortOrder,
          })
        }
        onUpdate={(id, payload) =>
          updateServiceCard.mutateAsync({
            id,
            data: {
              title: payload.title,
              points: payload.points,
              sortOrder: payload.sortOrder,
            },
          })
        }
        onDelete={(id) => deleteServiceCard.mutateAsync(id)}
        pointsLabel="Service points"
        showDescription={false}
        showIcon={false}
      />
    </>
  );
}
