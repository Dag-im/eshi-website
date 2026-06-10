'use client';

import { BorderBeam } from '@/components/magicui/border-beam'; // Adjust this import path based on your local setup
import { Card, CardContent } from '@/components/ui/card';
import { MethodologyPhase } from '@/types/methodology-phase';

const fallbackMethodologyPhases = [
  {
    phase: 'Phase 1',
    description: 'Four-month intensive workshops (in-person + Zoom) covering:',
    items: [
      'Indicators & data collection',
      'Survey design',
      'Visualization & evaluation',
      'Donor reporting',
    ],
  },
  {
    phase: 'Phase 2',
    description:
      'Eight-month follow-up ensuring workshop principles are applied in daily work, with coaching and mentorship.',
    items: [], // Kept empty to gracefully handle layouts without lists
  },
];

interface MethodologySectionProps {
  phases?: MethodologyPhase[];
}

export default function MethodologySection({ phases = [] }: MethodologySectionProps) {
  const methodologyPhases = phases.length
    ? phases.map((phase) => ({
        phase: phase.phase,
        description: phase.description,
        items: phase.items || [],
      }))
    : fallbackMethodologyPhases;

  return (
    <section className="py-24 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-[var(--color-rangitoto)]">
          Our Methodology
        </h2>
        <p className="mb-12 text-lg text-[var(--color-rangitoto)]/80">
          A two-phase approach designed to embed knowledge into daily
          operations.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          {methodologyPhases.map((item, idx) => (
            <div key={idx} className="relative">
              <Card className="relative z-10 h-full rounded-xl shadow-md bg-[var(--color-deco)]/30 border overflow-hidden">
                <BorderBeam
                  size={200}
                  duration={10}
                  className="absolute inset-0 z-0"
                  colorFrom="var(--color-avocado)"
                  colorTo="var(--color-deco)"
                />
                <CardContent className="p-6 relative z-10 flex flex-col h-full">
                  <h3 className="text-xl font-semibold mb-3 text-[var(--color-rangitoto)]">
                    {item.phase}
                  </h3>
                  <p className="text-sm md:text-base text-[var(--color-rangitoto)]/90">
                    {item.description}
                  </p>

                  {item.items.length > 0 && (
                    <ul className="list-disc ml-6 mt-3 space-y-1 text-sm md:text-base text-[var(--color-rangitoto)]/90">
                      {item.items.map((bullet, bulletIdx) => (
                        <li key={bulletIdx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
