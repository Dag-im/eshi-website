'use client';

import { ServiceForm } from '@/components/admin/service/serviceForm';
import { useService } from '@/lib/api/useService';
import { useParams, useRouter } from 'next/navigation';

export default function EditServicePage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: service, isLoading } = useService(id);

  const handleSuccess = () => {
    router.push('/admin/services');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!service) {
    return <div>Service not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Service</h1>
      <ServiceForm item={service} onSuccess={handleSuccess} />
    </div>
  );
}
