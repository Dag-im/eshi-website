'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BeliefRecord } from '@/types/belief';
import { MissionStoryRecord } from '@/types/mission-story';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
} as const;

const missionStory = [
  {
    type: 'mission',
    title: 'Our Mission: Empowering Grassroots',
    description:
      'ESHI Consultancy is dedicated to empowering local grassroots NGOs, CBOs, and CSOs to deliver high-quality social services to marginalized populations. We provide the administrative and technical skills needed to secure sustainable funding, ensuring these organizations thrive independently and achieve lasting impact.',
  },
  {
    type: 'story',
    title: 'Our Story: From Ethiopia to Global Impact',
    description:
      'ESHI Consultancy began as the Ethiopian Self-Help Initiative, born from over a decade of collaboration among its three principals working with grassroots women’s microsavings groups in Ethiopia. Inspired by the power of knowledge sharing and capacity building, we adopted “Eshi”—an Ethiopian expression meaning “ok, cool”—to reflect our approachable, global mission. Today, ESHI empowers local NGOs, CBOs, and CSOs worldwide.',
  },
];

const beliefs = [
  {
    title: 'Local Expertise Drives Impact',
    description:
      'Grassroots organizations are uniquely positioned to deliver effective, targeted social services to marginalized communities, outperforming larger international NGOs in impact and trust.',
  },
  {
    title: 'Cost-Efficient Solutions',
    description:
      'Local NGOs and CBOs deliver services more cost-effectively than their larger counterparts, maximizing resources for those who need them most.',
  },
  {
    title: 'Capacity Building Unlocks Potential',
    description:
      'By investing in capacity building, we overcome barriers cited by donors, equipping local organizations with the skills to secure sustainable funding and thrive independently.',
  },
];

interface BentoGridSectionProps {
  missionStories?: MissionStoryRecord[];
  beliefs?: BeliefRecord[];
}

export default function BentoGridSection({
  missionStories = [],
  beliefs: backendBeliefs = [],
}: BentoGridSectionProps) {
  const missionStoryItems = missionStories.length ? missionStories : missionStory;
  const beliefItems = backendBeliefs.length ? backendBeliefs : beliefs;

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
        Who We Are
      </motion.h2>

      {/* Main Flex Container */}
      <div className="flex flex-col md:flex-row gap-8 md:gap-12">
        {/* Left Column: Mission & Story */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8 h-full">
          {missionStoryItems.map((item, idx) => {
            // Uniformly assign distinct styles based on type without modifying the data object
            const cardStyles =
              item.type === 'mission'
                ? 'bg-avocado border-[var(--color-lemon-grass)]/50 hover:shadow-[0_0_20px_var(--color-lemon-grass)]'
                : 'bg-[var(--color-rangitoto)] border-[var(--color-albescent-white)]/20 hover:shadow-[0_0_20px_var(--color-rangitoto)]';

            return (
              <motion.div key={idx} variants={childVariants} className="flex-1">
                <Card
                  className={`relative ${cardStyles} border rounded-3xl shadow-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] flex flex-col`}
                  aria-label={`${
                    item.type === 'mission' ? 'Mission' : 'Story'
                  }: ${item.title}`}
                >
                  <CardHeader>
                    <CardTitle className="text-lg md:text-2xl font-bold text-[var(--color-albescent-white)] text-center">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-sm md:text-base text-[var(--color-albescent-white)] text-center leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Beliefs */}
        <motion.div
          className="flex-1 relative flex flex-col gap-6 md:gap-8 h-full"
          variants={childVariants}
        >
          {/* Beliefs Container */}
          <Card className="flex-1 flex flex-col gap-4 p-6 md:p-8 rounded-3xl bg-[var(--color-lemon-grass)]/20 border border-[var(--color-lemon-grass)]/40 shadow-inner">
            {/* Section Title */}
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-rangitoto)] text-center mb-4">
              Beliefs
            </h3>

            {/* Belief Cards */}
            <div className="flex flex-col gap-4">
              {beliefItems.map((belief, idx) => (
                <motion.div key={idx} variants={childVariants}>
                  <Card className="relative bg-avocado border border-[var(--color-albescent-white)]/20 rounded-2xl shadow-md p-5 hover:shadow-xl hover:scale-[1.02] transition-all duration-300">
                    <CardHeader className="p-0 mb-2">
                      <CardTitle className="text-lg font-bold text-[var(--color-albescent-white)]">
                        {belief.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <p className="text-sm text-[var(--color-albescent-white)]/90 leading-relaxed">
                        {belief.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </motion.section>
  );
}
