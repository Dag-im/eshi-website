'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { UserForm } from '@/components/admin/user/userForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminCreateUserPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader
        title="Create administrator"
        description="Provision a new internal account with a temporary password and controlled access status."
      />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <UserForm onSuccess={() => router.push('/admin/users')} />
        </CardContent>
      </Card>
    </>
  );
}
