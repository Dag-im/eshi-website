'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeleteService, useServices } from '@/lib/api/useService';
import { Service } from '@/types/service';

export default function AdminServicesPage() {
  const router = useRouter();
  const { data: services = [] } = useServices();
  const deleteService = useDeleteService();
  const [selected, setSelected] = useState<Service | null>(null);

  return (
    <>
      <PageHeader
        title="Services"
        description="Maintain the service catalog shown across the public experience."
        action={
          <Button onClick={() => router.push('/admin/services/create')} className="rounded-xl">
            New service
          </Button>
        }
      />
      <DataTable<Service>
        title="Service library"
        description="Structured offers and their public-facing descriptions."
        data={services}
        searchKeys={['title', 'description']}
        createHref="/admin/services/create"
        createLabel="Add service"
        columns={[
          { key: 'title', label: 'Title' },
          {
            key: 'description',
            label: 'Description',
            render: (service: Service) => (
              <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{service.description}</p>
            ),
          },
          {
            key: 'icon',
            label: 'Icon',
            render: (service: Service) => <span className="text-sm text-muted-foreground">{service.icon}</span>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (service) => router.push(`/admin/services/edit/${service.id}`) },
          {
            label: 'Delete',
            onClick: (service) => setSelected(service),
            className: 'text-destructive focus:text-destructive',
          },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete service"
        description={`Delete "${selected?.title}" from the service catalog.`}
        confirmLabel="Delete service"
        variant="destructive"
        isLoading={deleteService.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await deleteService.mutateAsync(String(selected.id));
          setSelected(null);
        }}
      />
    </>
  );
}
