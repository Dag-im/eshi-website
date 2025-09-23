'use client';

import { PresentationForm } from '@/components/admin/presentations/presentationForm';
import { useRouter } from 'next/navigation';

export default function CreatePresentationPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/admin/presentations');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Create Presentation</h1>
      <PresentationForm onSuccess={handleSuccess} />
    </div>
  );
}
