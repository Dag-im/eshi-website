'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useDeleteImpact, useImpacts } from '@/lib/api/useImpact';
import { useRouter } from 'next/navigation';

interface Impact {
  id: string;
  name: string;
  desc: string;
  stat: string;
  logoUrl?: string;
}

const impactColumns = [
  { key: 'name', label: 'Name' },
  {
    key: 'desc',
    label: 'Description',
    render: (item: Impact) => item.desc.slice(0, 50) + '...',
  },
  { key: 'stat', label: 'Stat' },
  {
    key: 'logoUrl',
    label: 'Logo',
    render: (item: Impact) =>
      item.logoUrl ? (
        <img src={item.logoUrl} alt="Logo" className="h-10 w-10 object-cover" />
      ) : (
        'No Logo'
      ),
  },
];

export default function ImpactsPage() {
  const router = useRouter();
  const { data: impacts, isLoading } = useImpacts();
  const deleteMutation = useDeleteImpact();

  const handleCreate = () => {
    router.push('/admin/impacts/create');
  };

  const handleEdit = (item: Impact) => {
    router.push(`/admin/impacts/edit/${item.id}`);
  };

  const handleDelete = (item: Impact) => {
    if (confirm('Are you sure you want to delete this impact?')) {
      deleteMutation.mutate(item.id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Impacts</h1>
      <AdminTable
        data={impacts || []}
        columns={impactColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search impacts..."
      />
    </div>
  );
}
