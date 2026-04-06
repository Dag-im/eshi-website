'use client';

import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { TeamForm } from '@/components/admin/team/teamForm';
import { Card, CardContent } from '@/components/ui/card';
import { useTeamMember } from '@/lib/api/useTeam';

export default function AdminEditTeamPage() {
  const router = useRouter();
  const params = useParams();
  const { data: member } = useTeamMember(params.id as string);

  if (!member) return null;

  return (
    <>
      <PageHeader title="Edit team profile" description="Update the role, biography, and image for this team member." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <TeamForm item={member} onSuccess={() => router.push('/admin/team')} />
        </CardContent>
      </Card>
    </>
  );
}
