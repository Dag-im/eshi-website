'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ConfirmDialog } from '@/components/admin/confirm-dialog';
import { DataTable } from '@/components/admin/data-table';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { useDeleteTeamMember, useTeamMembers } from '@/lib/api/useTeam';
import { TeamMember } from '@/types/team';

export default function AdminTeamPage() {
  const router = useRouter();
  const { data: teamMembers = [] } = useTeamMembers();
  const deleteTeamMember = useDeleteTeamMember();
  const [selected, setSelected] = useState<TeamMember | null>(null);

  return (
    <>
      <PageHeader
        title="Team"
        description="Manage the leadership and consultant profiles displayed on the public site."
        action={<Button onClick={() => router.push('/admin/team/create')} className="rounded-xl">Add team member</Button>}
      />
      <DataTable<TeamMember>
        title="Team directory"
        description="Curated bios and titles for the public-facing team section."
        data={teamMembers}
        searchKeys={['name', 'title', 'bio']}
        createHref="/admin/team/create"
        createLabel="Add team member"
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'title', label: 'Title' },
          {
            key: 'bio',
            label: 'Bio',
            render: (member: TeamMember) => <p className="line-clamp-2 max-w-xl text-sm text-muted-foreground">{member.bio}</p>,
          },
        ]}
        actions={[
          { label: 'Edit', onClick: (member) => router.push(`/admin/team/edit/${member.id}`) },
          { label: 'Delete', onClick: (member) => setSelected(member), className: 'text-destructive focus:text-destructive' },
        ]}
      />
      <ConfirmDialog
        open={Boolean(selected)}
        onOpenChange={(open) => !open && setSelected(null)}
        title="Delete team member"
        description={`Remove ${selected?.name} from the public team section.`}
        confirmLabel="Delete member"
        variant="destructive"
        isLoading={deleteTeamMember.isPending}
        onConfirm={async () => {
          if (!selected) return;
          await deleteTeamMember.mutateAsync(String(selected.id));
          setSelected(null);
        }}
      />
    </>
  );
}
