import ApproachsSection from '@/components/about/ApproachsSection';
import BentoGridSection from '@/components/about/BentoGridSection';
import ClientsSection from '@/components/about/ClientsSection';
import TeamSection from '@/components/about/TeamSection';
import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import { getPresentationsData, getTeamData } from '@/lib/api/public/content';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'About ESHI Consultancy',
    description:
      'Learn about ESHI Consultancy, our mission, team, and approach to empowering grassroots organizations with sustainable capacity building.',
    alternates: {
      canonical: '/about',
    },
    openGraph: {
      title: 'About ESHI Consultancy',
      description:
        'Mission, team, and approach behind ESHI Consultancy.',
      url: '/about',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'About ESHI Consultancy',
      description:
        'Mission, team, and approach behind ESHI Consultancy.',
    },
  };
}

export default async function AboutPage() {
  const [teamMembers, presentations] = await Promise.all([
    getTeamData(),
    getPresentationsData(),
  ]);

  return (
    <section className="relative min-h-screen overflow-hidden bg-green-50/50 pt-12">
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />

      <div className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1>
            <AuroraText
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-[var(--color-rangitoto)]"
              colors={[
                'var(--color-deco)',
                'var(--color-avocado)',
                'var(--color-rangitoto)',
              ]}
              speed={1.2}
            >
              About ESHI Consultancy
            </AuroraText>
          </h1>
          <p className="mt-6 text-xl text-[var(--color-rangitoto)]/80 max-w-3xl mx-auto">
            ESHI Consultancy empowers grassroots NGOs, CBOs, and CSOs through
            capacity building, enabling sustainable impact and financial
            independence. Our mission is to equip local organizations with the
            tools and expertise needed to thrive in the global development
            landscape.
          </p>
        </div>

        <BentoGridSection />

        {/* Team Section */}
        <TeamSection teamMembers={teamMembers ?? []} />

        {/* Clients Section */}
        <ClientsSection presentations={presentations ?? []} />

        {/* Presentations Section */}
        <ApproachsSection />
      </div>
    </section>
  );
}
