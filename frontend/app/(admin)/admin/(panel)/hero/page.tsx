'use client';

import { PageHeader } from '@/components/admin/page-header';
import { HeroForm } from '@/components/admin/hero/hero-form';
import { useHero } from '@/lib/api/useHero';

export default function AdminHeroPage() {
  const { data: hero } = useHero();

  return (
    <>
      <PageHeader
        title="Hero image management"
        description="Control the rotating homepage hero gallery, preserve slide order, and keep alt text accessible."
      />
      <HeroForm images={hero?.bgImages ?? []} />
    </>
  );
}
