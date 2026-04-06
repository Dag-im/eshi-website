'use client';

import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { ImpactForm } from '@/components/admin/impact/impactForm';
import { Card, CardContent } from '@/components/ui/card';
import { useImpact } from '@/lib/api/useImpact';

export default function AdminEditImpactPage() {
  const router = useRouter();
  const params = useParams();
  const { data: impact } = useImpact(params.id as string);

  if (!impact) return null;

  return (
    <>
      <PageHeader title="Edit impact" description="Update the impact statistic, description, and artwork." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <ImpactForm item={impact} onSuccess={() => router.push('/admin/impacts')} />
        </CardContent>
      </Card>
    </>
  );
}
