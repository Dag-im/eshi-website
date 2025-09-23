'use client';

import { PresentationForm } from '@/components/admin/presentations/presentationForm';
import { usePresentation } from '@/lib/api/usePresentations';
import { useParams, useRouter } from 'next/navigation';

export default function EditPresentationPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: presentation, isLoading } = usePresentation(id);

  const handleSuccess = () => {
    router.push('/admin/presentations');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!presentation) {
    return <div>Presentation not found</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Edit Presentation</h1>
      <PresentationForm item={presentation} onSuccess={handleSuccess} />
    </div>
  );
}
