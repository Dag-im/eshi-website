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
import { Skeleton } from '@/components/ui/skeleton';
import { useTeamMembers } from '@/lib/api/useTeam';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { memo, useEffect } from 'react';

type TeamMember = {
  _id: number;
  name: string;
  title: string;
  bio: string;
  imageUrl: string;
};

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
  const { data: teamMembers, isLoading, error } = useTeamMembers();

  // Debug API response
  useEffect(() => {
    console.log('Team Members data:', teamMembers);
  }, [teamMembers]);

  // Map API response to match TeamMember type (handle image vs. imageUrl)
  const mappedTeamMembers: TeamMember[] = (teamMembers || []).map(
    (item: TeamMember) => ({
      id: item._id,
      name: item.name,
      title: item.title,
      bio: item.bio,
      imageUrl: item.imageUrl || '/default-image.png', // Fallback image
    })
  );

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mb-20"
    >
      <motion.h2
        variants={childVariants}
        className="text-3xl md:text-4xl font-bold text-[var(--color-rangitoto)] mb-12 text-center"
      >
        Our Team
      </motion.h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="space-y-4">
              <Skeleton className="w-full h-56 md:h-64 rounded-t-3xl bg-[var(--color-rangitoto)]/10" />
              <Skeleton className="h-6 w-3/4 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
              <Skeleton className="h-4 w-1/2 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
              <Skeleton className="h-4 w-5/6 mx-auto rounded bg-[var(--color-rangitoto)]/10" />
            </div>
          ))
        ) : error ? (
          <div className="text-center text-red-500 col-span-full">
            Failed to load team members. Please try again later.
          </div>
        ) : !mappedTeamMembers || mappedTeamMembers.length === 0 ? (
          <div className="text-center text-[var(--color-rangitoto)]/70 col-span-full">
            No team members available at the moment.
          </div>
        ) : (
          mappedTeamMembers.map((member) => (
            <TeamMemberCard key={member._id} member={member} />
          ))
        )}
      </div>
    </motion.section>
  );
}
