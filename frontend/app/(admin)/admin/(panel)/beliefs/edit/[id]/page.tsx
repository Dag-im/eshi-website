'use client';

import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

import { PageHeader } from '@/components/admin/page-header';
import { BeliefForm } from '@/components/admin/beliefs/belief-form';
import { useBelief } from '@/lib/api/useBeliefs';

export default function EditBeliefPage() {
  const params = useParams<{ id: string }>();
  const { data, isLoading } = useBelief(params.id);

  return (
    <>
      <PageHeader
        title="Edit Belief"
        description="Update a belief displayed in the Who We Are section."
      />
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : data ? (
        <BeliefForm initialData={data} />
      ) : null}
    </>
  );
}
