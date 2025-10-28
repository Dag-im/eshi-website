'use client';
import AboutEshi from '@/components/home/about';
import CallToAction from '@/components/home/callToAction';
import FeaturedBlogs from '@/components/home/featuredBlogs';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';
import { useHero } from '@/lib/api/useHero';

export default function HomePage() {
  const { data: hero } = useHero();
  return (
    <main className="bg-green-50/50">
      <Hero bgImages={hero?.bgImages} />
      <AboutEshi />
      <Services />
      <FeaturedBlogs />
      <CallToAction />
      {/* Other sections */}
    </main>
  );
}
