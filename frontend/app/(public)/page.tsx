import AboutEshi from '@/components/home/about';
import CallToAction from '@/components/home/callToAction';
import Hero from '@/components/home/hero';
import Services from '@/components/home/services';
import { getHeroData, getServicesData } from '@/lib/api/public/content';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'ESHI Consultancy | Capacity Building for Grassroots Organizations',
    description:
      'ESHI Consultancy empowers NGOs, CBOs, and CSOs through practical capacity building, training, and sustainable organizational support.',
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: 'ESHI Consultancy',
      description:
        'Capacity building and consultancy support for local grassroots organizations.',
      url: '/',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'ESHI Consultancy',
      description:
        'Capacity building and consultancy support for local grassroots organizations.',
    },
  };
}

export default async function HomePage() {
  const [hero, services] = await Promise.all([getHeroData(), getServicesData()]);

  return (
    <main className="bg-green-50/50">
      <Hero bgImages={hero?.bgImages} />
      <AboutEshi />
      <Services services={services ?? []} />
      <CallToAction />
      {/* Other sections */}
    </main>
  );
}
