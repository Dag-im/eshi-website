'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { ImpactForm } from '@/components/admin/impact/impactForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminCreateImpactPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Create impact" description="Add a new social proof or impact highlight." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <ImpactForm onSuccess={() => router.push('/admin/impacts')} />
        </CardContent>
      </Card>
    </>
  );
}
