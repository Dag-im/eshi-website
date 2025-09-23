'use client';

import { TeamForm } from '@/components/admin/team/teamForm';
import { useTeamMember } from '@/lib/api/useTeam';
import { useParams, useRouter } from 'next/navigation';

export default function EditTeamPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: teamMember, isLoading } = useTeamMember(id);

  const handleSuccess = () => {
    router.push('/admin/team');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!teamMember) {
    return <div>Team Member not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Team Member</h1>
      <TeamForm item={teamMember} onSuccess={handleSuccess} />
    </div>
  );
}
