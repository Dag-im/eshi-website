'use client';

import { BorderBeam } from '@/components/magicui/border-beam';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo } from 'react';

type TeamMember = {
  id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Mark Johnson',
    title: 'Founder & Principal Consultant, Associate Professor of Practice',
    bio: "Mark Johnson has worked in and around the international aid and development industry for 35 years. Besides consulting work, he is Associate Professor of Practice at The New School’s graduate International Affairs department, teaching Project Cycle Management, Monitoring and Evaluation, and Worst and Better Practice in Aid and Development. Prior to joining The New School, Johnson worked in emergency relief, refugee resettlement, and humanitarian aid for the International Rescue Committee, Center for International Rehabilitation, United Nations, and Human Rights Watch. He has worked in Pakistan, Sudan, Ethiopia, Cote d'Ivoire, Sierra Leone, Liberia, Ghana, Nigeria, Kenya, Bosnia, Croatia, Nicaragua, Guatemala, El Salvador, Burundi, and the U.S. He has given lectures at Addis Ababa University, runs capacity-building workshops for national NGOs, and served three years as President of the New York Consortium of Evaluators, the regional American Evaluation Association chapter, and has been a member of the Eastern Evaluation Research Society for 15 years.",
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Henok Mengistu',
    title: 'Monitoring and Evaluation Director',
    bio: 'Henok Mengistu is Monitoring and Evaluation Director for Wide Horizons for Children, bringing expertise in data-driven program evaluation and capacity building for international humanitarian aid programs.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Yosef Akalu',
    title: 'Principal Consultant',
    bio: 'Yosef Akalu brings extensive experience in capacity building and program implementation for grassroots organizations in Ethiopia and beyond, focusing on sustainable development and community empowerment.',
    imageUrl:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
} as const;

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
} as const;

const TeamMemberCard = memo(({ member }: { member: TeamMember }) => (
  <motion.div variants={childVariants} className="group">
    <Card className="relative bg-[var(--color-avocado)]/90 backdrop-blur-xl border border-[var(--color-lemon-grass)]/30 rounded-3xl shadow-lg hover:shadow-2xl hover:scale-[1.03] transition-all duration-300 overflow-hidden">
      <BorderBeam
        size={150}
        duration={6}
        colorFrom="var(--color-indian-khaki)"
        colorTo="var(--color-deco)"
      />
      <div className="relative w-full h-56 md:h-64 overflow-hidden rounded-t-3xl">
        <Image
          src={member.imageUrl}
          alt={member.name}
          width={800}
          height={400}
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-deco)]/50 to-transparent" />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg md:text-2xl font-bold text-[var(--color-rangitoto)] group-hover:text-[var(--color-deco)] transition-colors">
          {member.name}
        </CardTitle>
        <p className="text-sm md:text-base text-albescent-white font-medium">
          {member.title}
        </p>
      </CardHeader>
      <CardContent>
        <p className="text-sm md:text-base text-[var(--color-rangitoto)]/80 leading-relaxed line-clamp-3">
          {member.bio}
        </p>
        {member.bio.length > 200 && (
          <Dialog>
            <DialogTrigger asChild>
              <button
                className="mt-3 text-[var(--color-deco)]/80 font-medium hover:text-[var(--color-deco)] hover:underline transition-colors"
                aria-label={`Read more about ${member.name}`}
              >
                Read More
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[90vw] sm:max-w-lg md:max-w-xl rounded-2xl bg-[var(--color-albescent-white)]/90 backdrop-blur-md">
              <DialogHeader>
                <DialogTitle className="text-lg md:text-2xl font-bold text-[var(--color-rangitoto)]">
                  {member.name}
                </DialogTitle>
                <p className="text-sm text-[var(--color-avocado)]">
                  {member.title}
                </p>
              </DialogHeader>
              <div className="mt-4 max-h-80 overflow-y-auto pr-4">
                <p className="text-sm md:text-base text-[var(--color-rangitoto)]/90 leading-relaxed whitespace-pre-line">
                  {member.bio}
                </p>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </CardContent>
    </Card>
  </motion.div>
));

TeamMemberCard.displayName = 'TeamMemberCard';

export default function TeamSection() {
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
        Our Team
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </motion.section>
  );
}
