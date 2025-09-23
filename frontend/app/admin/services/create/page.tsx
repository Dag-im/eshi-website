'use client';

import { ServiceForm } from '@/components/admin/service/serviceForm';
import { useRouter } from 'next/navigation';

export default function CreateServicePage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/services');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Service</h1>
      <ServiceForm onSuccess={handleSuccess} />
    </div>
  );
}
