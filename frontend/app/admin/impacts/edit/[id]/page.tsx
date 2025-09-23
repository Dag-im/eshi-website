'use client';

import { ImpactForm } from '@/components/admin/impact/impactForm';
import { useImpact } from '@/lib/api/useImpact';
import { useParams, useRouter } from 'next/navigation';

export default function EditImpactPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: impact, isLoading } = useImpact(id);

  const handleSuccess = () => {
    router.push('/admin/impacts');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!impact) {
    return <div>Impact not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Impact</h1>
      <ImpactForm item={impact} onSuccess={handleSuccess} />
    </div>
  );
}
