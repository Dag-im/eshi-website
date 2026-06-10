import { AuroraText } from '@/components/magicui/aurora-text';

import { Particles } from '@/components/magicui/particles';
import CallToAction from '@/components/services/CallToAction';
import ImpactSection from '@/components/services/ImpactSection';
import MethodologySection from '@/components/services/Phases';
import ServicesGridSection from '@/components/services/ServiceGridSetion';
import WhyChooseESHI from '@/components/services/WhyChooseEshi';
import {
  getImpactsData,
  getMethodologyPhasesData,
  getServiceCardsData,
  getWhyChooseReasonsData,
} from '@/lib/api/public/content';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Services | ESHI Consultancy',
    description:
      'Explore ESHI Consultancy services: organizational strengthening, capacity building, and long-term support for grassroots organizations.',
    alternates: {
      canonical: '/services',
    },
    openGraph: {
      title: 'Services | ESHI Consultancy',
      description:
        'Organizational strengthening and capacity building services for grassroots organizations.',
      url: '/services',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Services | ESHI Consultancy',
      description:
        'Organizational strengthening and capacity building services for grassroots organizations.',
    },
  };
}

export default async function ServicesPage() {
  const [impacts, serviceCards, methodology, whyChoose] = await Promise.all([
    getImpactsData(),
    getServiceCardsData(),
    getMethodologyPhasesData(),
    getWhyChooseReasonsData(),
  ]);

  return (
    <div className="min-h-screen bg-green-50/50 text-rangitoto">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={60}
          color="var(--color-lemon-grass)"
          refresh
        />

        <h1 className="relative z-10 text-5xl md:text-6xl font-extrabold pt-20">
          <AuroraText
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
            colors={[
              'var(--color-deco)',
              'var(--color-avocado)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            Our Services
          </AuroraText>
        </h1>
      </section>

      {/* Service Categories */}
      <section>
        <ServicesGridSection services={serviceCards ?? []} />
      </section>

      {/* Process / Methodology */}
      <section>
        <MethodologySection phases={methodology ?? []} />
      </section>

      {/* Impact */}
      <section>
        <ImpactSection impacts={impacts ?? []} />
      </section>

      {/* Why ESHI */}
      <section>
        <WhyChooseESHI reasons={whyChoose ?? []} />
      </section>

      {/* CTA */}
      <section>
        <CallToAction />
      </section>
    </div>
  );
}
