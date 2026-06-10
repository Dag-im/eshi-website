'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent } from '@/components/ui/card';
import { ServiceCard } from '@/types/service-card';

const fallbackServicesData = [
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
];

interface ServicesGridSectionProps {
  services?: ServiceCard[];
}

export default function ServicesGridSection({ services = [] }: ServicesGridSectionProps) {
  const servicesData = services.length
    ? services.map((service) => ({
        title: service.title,
        points: service.points,
      }))
    : fallbackServicesData;

  return (
    <section className="max-w-6xl mx-auto px-6 pb-20 grid grid-cols-1 md:grid-cols-3 gap-8">
      {servicesData.map((service) => (
        <div key={service.title} className="relative">
          <Card className="relative z-10 h-full rounded-2xl shadow-xl bg-deco/40 hover:bg-deco/60 transition overflow-hidden">
            <BorderBeam
              size={150}
              duration={8}
              className="absolute inset-0 z-0"
              colorFrom="var(--color-deco)"
              colorTo="var(--color-avocado)"
            />
            <CardContent className="p-8 relative z-10 flex flex-col h-full">
              <h3 className="text-xl font-bold mb-4 text-rangitoto">
                {service.title}
              </h3>
              <ul className="space-y-2 text-rangitoto/80 mt-auto">
                {service.points.map((point) => (
                  <li key={point} className="list-none">
                    • {point}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      ))}
    </section>
  );
}
