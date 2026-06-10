'use client';

import { PageHeader } from '@/components/admin/page-header';
import { BeliefForm } from '@/components/admin/beliefs/belief-form';

export default function CreateBeliefPage() {
  return (
    <>
      <PageHeader
        title="Create Belief"
        description="Add a belief displayed in the Who We Are section."
      />
      <BeliefForm />
    </>
  );
}
