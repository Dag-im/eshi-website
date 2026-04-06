'use client';

import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { ServiceForm } from '@/components/admin/service/serviceForm';
import { Card, CardContent } from '@/components/ui/card';
import { useService } from '@/lib/api/useService';

export default function AdminEditServicePage() {
  const router = useRouter();
  const params = useParams();
  const { data: service } = useService(params.id as string);

  if (!service) return null;

  return (
    <>
      <PageHeader title="Edit service" description="Refine copy, iconography, and service positioning." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <ServiceForm item={service} onSuccess={() => router.push('/admin/services')} />
        </CardContent>
      </Card>
    </>
  );
}
