'use client';

import { AuroraText } from '@/components/magicui/aurora-text';

import { Particles } from '@/components/magicui/particles';
import { motion } from 'framer-motion';
import { BarChart, BookOpen, Globe, Users } from 'lucide-react';
import { BorderBeam } from '../magicui/border-beam';

type Service = {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
};

const eshiServices: Service[] = [
  {
    id: '1',
    title: 'Project Cycle Management Training',
    description:
      'Comprehensive four-month workshop series covering the full project cycle, with in-person and virtual sessions to embed effective management principles.',
    icon: <BookOpen size={48} />,
  },
  {
    id: '2',
    title: 'Monitoring and Evaluation',
    description:
      'Designing and implementing M&E protocols, including data collection, analysis, and reporting to demonstrate evidence-based results.',
    icon: <BarChart size={48} />,
  },
  {
    id: '3',
    title: 'Capacity Building for NGOs',
    description:
      'Empowering local NGOs, CBOs, and CSOs with tools and skills to achieve sustainability and secure funding independently.',
    icon: <Users size={48} />,
  },
  {
    id: '4',
    title: 'Strategic Program Support',
    description:
      'Providing tailored follow-up support over eight months to ensure organizations integrate project management and evaluation practices effectively.',
    icon: <Globe size={48} />,
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
} as const;

import { easeOut } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Services({
  services = eshiServices,
}: {
  services?: Service[];
}) {
  return (
    <section className="relative pb-16 overflow-hidden bg-transparent">
      {/* Background effects */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={60}
        color="var(--color-lemon-grass)"
        refresh
      />

      <motion.div
        className="max-w-7xl mx-auto px-6 relative z-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.div variants={cardVariants} className="text-center mb-16">
          <AuroraText
            className="text-5xl md:text-6xl font-extrabold"
            colors={[
              'var(--color-avocado)',
              'var(--color-lemon-grass)',
              'var(--color-rangitoto)',
            ]}
            speed={1.2}
          >
            Our Services
          </AuroraText>
          <p className="mt-4 text-[var(--color-albescent-white)/60] max-w-2xl mx-auto">
            We work hand-in-hand with local grassroots organizations and NGOs to
            improve social impact and sustainability. Our programs focus on
            empowering local communities, building capacity, and creating
            lasting change.
          </p>
        </motion.div>

        {/* Services grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7"
          variants={containerVariants}
        >
          {services.map((service) => (
            <motion.div
              key={service.id}
              variants={cardVariants}
              className="relative p-8 bg-avocado/75 backdrop-blur-2xl rounded-3xl shadow-xl flex flex-col items-center text-center transition-transform duration-300 hover:scale-105 hover:bg-[var(--color-rangitoto)]/45 cursor-pointer"
            >
              <BorderBeam
                size={150}
                duration={6}
                colorFrom="var(--color-indian-khaki)"
                colorTo="var(--color-lemon-grass)"
              />
              <div className="w-36 h-36 mb-0 flex items-center justify-center text-[var(--color-deco)]">
                {service.icon}
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--color-albescent-white)]">
                {service.title}
              </h3>
              <p className="text-sm text-[var(--color-albescent-white)]/80">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
