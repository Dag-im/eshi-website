'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Marquee } from '@/components/magicui/marquee';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { memo } from 'react';

type Presentation = {
  id: number;
  title: string;
  description: string;
};

const presentations: Presentation[] = [
  {
    id: 1,
    title: 'Women\'s Business, Empowerment, and the "Self-Help Approach"',
    description:
      'Consortium of Self-Help Group Approach Promoters and The New School, June 23, 2023, Addis Ababa, Ethiopia',
  },
  {
    id: 2,
    title:
      'From Here to There: Can Evaluation Localization Lead to Decolonized Funding and Greater Social Impact?',
    description:
      'American Evaluation Association annual conference, New Orleans, Nov. 12, 2022',
  },
  {
    id: 3,
    title:
      'De-colonizing M&E By Rejecting External Evaluation and Building Internal Capacity',
    description:
      'April 25, 2022, Eastern Evaluation Research Society Annual Conference, New Jersey, U.S.',
  },
  {
    id: 4,
    title:
      'Complexity and Context: Customizing Stakeholder Work in Ethiopia, Kenya and Guatemala',
    description:
      'May 6, 2019, Eastern Evaluation Research Society Annual Conference',
  },
  {
    id: 5,
    title:
      "(Not) Localizing International Evaluation: Why Aren't More Small National NGOs Doing Monitoring and Evaluation?",
    description:
      'May 1, 2018, Eastern Evaluation Research Society Annual Conference, New Jersey, U.S.',
  },
  {
    id: 6,
    title:
      'Capacity-building workshops in Monitoring and Evaluation and Data Collection Design with Ethiopian non-profits',
    description: 'Addis Ababa, 2015 and 2016',
  },
  {
    id: 7,
    title: 'Refugees, Immigrants, CBOs and Universities',
    description:
      'International Rescue Committee annual conference, April 2007, Washington, D.C.',
  },
  {
    id: 8,
    title: 'The Practice and Profession of Monitoring and Evaluation',
    description:
      'June 20, 2022, Addis Ababa University, Sociology Department, Addis Ababa, Ethiopia',
  },
  {
    id: 9,
    title:
      'The Role of Humanitarian Aid in Human Rights and U.S. Foreign Policy',
    description:
      'March 16, 2022, School of Politics and Global Studies, Arizona State University, Phoenix, Arizona, U.S.',
  },
  {
    id: 10,
    title:
      'The International Aid and Development Landscape, and the Complicated Issues in Working Within It',
    description:
      'NYU Dental Leaders in Global Public Health, March 6, 2020, New York, U.S.',
  },
  {
    id: 11,
    title: 'Nation Building and the War in Yugoslavia',
    description:
      'March 19, 2019; and "Humanitarian Crisis and International Intervention" lectures in Global Studies 341, Prof. Victor Peskin, Arizona State University, March 21, 2016',
  },
  {
    id: 12,
    title:
      'International Aid and Development, Its Ineffectiveness, and How We Can Improve It',
    description:
      'June 2, 2018, Yom Institute of Economic Development, Addis Ababa, Ethiopia',
  },
  {
    id: 13,
    title: 'Data Collection Methods for Monitoring and Evaluation',
    description:
      'Yom Institute of Economic Development, Addis Ababa, June, 2016',
  },
  {
    id: 14,
    title: 'Project Cycle Management',
    description:
      'Yom Institute of Economic Development, Addis Ababa, June, 2015',
  },
  {
    id: 15,
    title: 'Writing for Human Rights course',
    description:
      'Taught at Addis Ababa University Human Rights Center, 2015 and 2016',
  },
  {
    id: 16,
    title:
      'Monitoring and Evaluation capacity-building workshops with Ethiopian non-profits',
    description: '2016 and 2018',
  },
  {
    id: 17,
    title: 'International Evaluation: Decolonized? Disrupted? Status Quo?',
    description: 'March 16, 2022, New York Consortium of Evaluators',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
} as const;

const PresentationCard = memo(
  ({ presentation }: { presentation: Presentation }) => (
    <Card
      className="relative bg-[var(--color-avocado)]/90 backdrop-blur-xl border border-[var(--color-lemon-grass)]/40 rounded-3xl p-6 w-[300px] md:w-[350px] hover:shadow-2xl hover:scale-105 transition-all duration-300"
      aria-label={`Presentation: ${presentation.title}`}
    >
      <BorderBeam
        size={150}
        duration={6}
        colorFrom="var(--color-indian-khaki)"
        colorTo="var(--color-lemon-grass)"
      />
      <CardContent>
        <h3 className="text-lg md:text-xl font-bold text-rangitoto mb-3 line-clamp-2">
          {presentation.title}
        </h3>
        <p className="text-sm md:text-base text-[var(--color-albescent-white)] leading-relaxed line-clamp-3">
          {presentation.description}
        </p>
      </CardContent>
    </Card>
  )
);

PresentationCard.displayName = 'PresentationCard';

export default function PresentationsSection() {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="mb-20"
    >
      <motion.h2
        variants={childVariants}
        className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] mb-12 text-center"
      >
        Presentations & Workshops
      </motion.h2>
      <div className="relative overflow-hidden">
        <Marquee pauseOnHover className="gap-6 [--duration:60s]" repeat={2}>
          {presentations.map((presentation) => (
            <PresentationCard
              key={presentation.id}
              presentation={presentation}
            />
          ))}
        </Marquee>
        <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--color-albescent-white)]/70 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-albescent-white)]/70 to-transparent pointer-events-none" />
      </div>
    </motion.section>
  );
}
