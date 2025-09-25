'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import {
  useDeletePresentation,
  usePresentations,
} from '@/lib/api/usePresentations';
import { useRouter } from 'next/navigation';

interface Presentation {
  _id: string;
  title: string;
  description: string;
}

const presentationColumns = [
  { key: 'title', label: 'Title' },
  {
    key: 'description',
    label: 'Description',
    render: (item: Presentation) => item.description.slice(0, 50) + '...',
  },
];

export default function PresentationsPage() {
  const router = useRouter();
  const { data: presentations, isLoading } = usePresentations();
  const deleteMutation = useDeletePresentation();

  const handleCreate = () => {
    router.push('/admin/presentations/create');
  };

  const handleEdit = (item: Presentation) => {
    router.push(`/admin/presentations/edit/${item._id}`);
  };

  const handleDelete = (item: Presentation) => {
    if (confirm('Are you sure you want to delete this presentation?')) {
      deleteMutation.mutate(item._id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Presentations</h1>
      <AdminTable
        data={presentations || []}
        columns={presentationColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search presentations..."
      />
    </div>
  );
}
