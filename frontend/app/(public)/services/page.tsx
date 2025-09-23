'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { BorderBeam } from '@/components/magicui/border-beam';

import { Particles } from '@/components/magicui/particles';
import CallToAction from '@/components/services/CallToAction';
import ImpactSection from '@/components/services/ImpactSection';
import WhyChooseESHI from '@/components/services/WhyChooseEshi';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-albescent-white text-rangitoto">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center text-center py-24 px-6">
        <Particles
          className="absolute inset-0 z-0"
          quantity={100}
          ease={60}
          color="var(--color-lemon-grass)"
          refresh
        />

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-5xl md:text-6xl font-extrabold mb-6"
        >
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
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 max-w-2xl text-lg text-lemon-grass"
        >
          At ESHI, we focus on strengthening grassroots organizations by
          building their{' '}
          <span className="font-semibold">internal capacity</span>—not
          dependency on external consultants.
        </motion.p>
      </section>

      {/* Service Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Capacity Building Programs',
            points: [
              'Project Cycle Management workshops',
              'Monitoring & Evaluation trainings',
            ],
          },
          {
            title: 'Organizational Strengthening',
            points: [
              'Administrative tools & NGO methodology',
              'Grant readiness & fundraising support',
            ],
          },
          {
            title: 'Consulting Services',
            points: [
              'External consultant role (when required)',
              'Emphasis on building internal skills',
            ],
          },
        ].map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="relative"
          >
            <Card className="relative z-10 rounded-2xl shadow-xl bg-deco/40 hover:bg-deco/60 transition">
              <BorderBeam
                size={150}
                duration={8}
                className="absolute inset-0 z-0"
                colorFrom="var(--color-deco)"
                colorTo="var(--color-avocado)"
              />
              <CardContent className="p-8">
                <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                <ul className="space-y-2 text-rangitoto/80">
                  {service.points.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      {/* Process / Methodology */}
      <section className="bg-lemon-grass/20 py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">
            Our Methodology
          </h2>
          <p className="mb-12 text-lg text-rangitoto/80">
            A two-phase approach designed to embed knowledge into daily
            operations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="relative">
              <Card className="relative z-10 rounded-xl shadow-md bg-deco/30 border">
                <BorderBeam
                  size={200}
                  duration={10}
                  className="absolute inset-0 z-0"
                  colorFrom="var(--color-avocado)"
                  colorTo="var(--color-deco)"
                />
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-3">Phase 1</h3>
                  <p>
                    Four-month intensive workshops (in-person + Zoom) covering:
                  </p>
                  <ul className="list-disc ml-6 mt-3 space-y-1">
                    <li>Indicators & data collection</li>
                    <li>Survey design</li>
                    <li>Visualization & evaluation</li>
                    <li>Donor reporting</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Card className="relative z-10 rounded-xl shadow-md bg-deco/30">
              <BorderBeam
                size={200}
                duration={10}
                className="absolute inset-0 z-0"
                colorFrom="var(--color-avocado)"
                colorTo="var(--color-deco)"
              />
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-3">Phase 2</h3>
                <p>
                  Eight-month follow-up ensuring workshop principles are applied
                  in daily work, with coaching and mentorship.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact */}
      <section>
        <ImpactSection />
      </section>

      {/* Why ESHI */}
      <section>
        <WhyChooseESHI />
      </section>

      {/* CTA */}
      <section>
        <CallToAction />
      </section>
    </div>
  );
}
