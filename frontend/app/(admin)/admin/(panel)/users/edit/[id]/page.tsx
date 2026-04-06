'use client';

import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { UserForm } from '@/components/admin/user/userForm';
import { Card, CardContent } from '@/components/ui/card';
import { useUser } from '@/lib/api/useUsers';

export default function AdminEditUserPage() {
  const router = useRouter();
  const params = useParams();
  const { data: user } = useUser(params.id as string);

  if (!user) {
    return null;
  }

  return (
    <>
      <PageHeader
        title="Edit administrator"
        description="Update account details and access state for this administrator."
      />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <UserForm item={user} onSuccess={() => router.push('/admin/users')} />
        </CardContent>
      </Card>
    </>
  );
}
