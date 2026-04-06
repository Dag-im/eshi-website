'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { ServiceForm } from '@/components/admin/service/serviceForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminCreateServicePage() {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Create service" description="Add a new service card to the public site and internal catalog." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <ServiceForm onSuccess={() => router.push('/admin/services')} />
        </CardContent>
      </Card>
    </>
  );
}
