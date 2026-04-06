'use client';

import { useParams, useRouter } from 'next/navigation';

import { PageHeader } from '@/components/admin/page-header';
import { PresentationForm } from '@/components/admin/presentations/presentationForm';
import { Card, CardContent } from '@/components/ui/card';
import { usePresentation } from '@/lib/api/usePresentations';

export default function AdminEditPresentationPage() {
  const router = useRouter();
  const params = useParams();
  const { data: presentation } = usePresentation(params.id as string);

  if (!presentation) return null;

  return (
    <>
      <PageHeader title="Edit presentation" description="Update copy and artwork for this presentation card." />
      <Card className="rounded-2xl border-border/70 shadow-sm shadow-black/5">
        <CardContent className="p-6">
          <PresentationForm item={presentation} onSuccess={() => router.push('/admin/presentations')} />
        </CardContent>
      </Card>
    </>
  );
}
