'use client';

import { TeamForm } from '@/components/admin/team/teamForm';
import { useRouter } from 'next/navigation';

export default function CreateTeamPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/team');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Team Member</h1>
      <TeamForm onSuccess={handleSuccess} />
    </div>
  );
}
