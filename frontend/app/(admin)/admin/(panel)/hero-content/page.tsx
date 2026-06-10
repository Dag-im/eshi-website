'use client';

import { PageHeader } from '@/components/admin/page-header';
import { HeroContentForm } from '@/components/admin/hero-content/hero-content-form';
import { useHeroContents } from '@/lib/api/useHeroContent';
import { Loader2 } from 'lucide-react';

export default function AdminHeroContentPage() {
  const { data: heroContents, isLoading } = useHeroContents();
  
  // Since we only maintain one record, we take the first one if it exists
  const initialData = heroContents?.[0] || null;

  return (
    <>
      <PageHeader
        title="Hero Content Management"
        description="Update the main text displayed on the landing page hero section."
      />
      {isLoading ? (
        <div className="flex h-32 items-center justify-center">
          <Loader2 className="size-6 animate-spin text-muted-foreground" />
        </div>
      ) : (
        <HeroContentForm initialData={initialData} />
      )}
    </>
  );
}
