'use client';

import { AdminTable } from '@/components/admin/AdminTable';
import { useDeleteTeamMember, useTeamMembers } from '@/lib/api/useTeam';
import { useRouter } from 'next/navigation';

interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
}

const teamColumns = [
  { key: 'name', label: 'Name' },
  { key: 'title', label: 'Title' },
  {
    key: 'bio',
    label: 'Bio',
    render: (item: TeamMember) => item.bio.slice(0, 50) + '...',
  },
];

export default function TeamPage() {
  const router = useRouter();
  const { data: teamMembers, isLoading } = useTeamMembers();
  const deleteMutation = useDeleteTeamMember();

  const handleCreate = () => {
    router.push('/admin/team/create');
  };

  const handleEdit = (item: TeamMember) => {
    router.push(`/admin/team/edit/${item.id}`);
  };

  const handleDelete = (item: TeamMember) => {
    if (confirm('Are you sure you want to delete this team member?')) {
      deleteMutation.mutate(item.id);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Team Members</h1>
      <AdminTable
        data={teamMembers || []}
        columns={teamColumns}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
        searchPlaceholder="Search team members..."
      />
    </div>
  );
}
