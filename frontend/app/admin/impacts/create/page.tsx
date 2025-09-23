'use client';

import { ImpactForm } from '@/components/admin/impact/impactForm';
import { useRouter } from 'next/navigation';

export default function CreateImpactPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/impacts');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Impact</h1>
      <ImpactForm onSuccess={handleSuccess} />
    </div>
  );
}
