'use client';

import { PageHeader } from '@/components/admin/page-header';
import { AboutForm } from '@/components/admin/about/about-form';
import { useAboutData } from '@/lib/api/useAbout';
import { Loader2 } from 'lucide-react';

export default function AdminAboutPage() {
  const { data: aboutData, isLoading } = useAboutData();
  
  // Since we only maintain one record, we take the first one if it exists
  const initialData = aboutData?.[0] || null;

  return (
    <>
      <PageHeader
        title="About Us Management"
        description="Update the paragraphs and title for the About Us section."
      />
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <AboutForm initialData={initialData} />
      )}
    </>
  );
}
