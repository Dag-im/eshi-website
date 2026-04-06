'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { TeamForm } from '@/components/admin/team/teamForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminCreateTeamPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Create team profile" description="Add a new person, role, biography, and portrait." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <TeamForm onSuccess={() => router.push('/admin/team')} />
        </CardContent>
      </Card>
    </>
  );
}
