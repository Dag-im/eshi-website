'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useDeleteService, useServices } from '@/lib/api/useService';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

const serviceColumns = [
  { key: 'title', label: 'Title' },
  {
    key: 'description',
    label: 'Description',
    render: (item: Service) => item.description.slice(0, 50) + '...',
  },
  { key: 'icon', label: 'Icon' },
];

export default function ServicesPage() {
  const router = useRouter();
  const { data: services, isLoading } = useServices();
  const deleteMutation = useDeleteService();

  const handleCreate = () => {
    router.push('/admin/services/create');
  };

  const handleEdit = (item: Service) => {
    router.push(`/admin/services/edit/${item.id}`);
  };

  const handleDelete = (item: Service) => {
    if (confirm('Are you sure you want to delete this service?')) {
      deleteMutation.mutate(item.id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Services</h1>
      <AdminTable
        data={services || []}
        columns={serviceColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search services..."
      />
    </div>
  );
}
