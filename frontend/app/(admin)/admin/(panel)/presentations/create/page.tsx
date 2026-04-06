'use client';

import { useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { PresentationForm } from '@/components/admin/presentations/presentationForm';
import { Card, CardContent } from '@/components/ui/card';

export default function AdminCreatePresentationPage() {
  const router = useRouter();

  return (
    <>
      <PageHeader title="Create presentation" description="Add a new presentation card, image, and description." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <PresentationForm onSuccess={() => router.push('/admin/presentations')} />
        </CardContent>
      </Card>
    </>
  );
}
