'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { Particles } from '@/components/magicui/particles';
import { Skeleton } from '@/components/ui/skeleton';
import { useServices } from '@/lib/api/useService';
import { easeOut, motion } from 'framer-motion';
import { useEffect } from 'react';
import { BorderBeam } from '../magicui/border-beam';

import { Service } from '@/types/service';
import {
  Activity,
  Bell,
  Book,
  Calendar,
  Camera,
  ChartBar,
  ChartPie,
  Check,
  Clipboard,
  Cloud,
  Code,
  Compass,
  Cpu,
  Database,
  FileText,
  Flag,
  Folder,
  Gift,
  Globe,
  Heart,
  Home,
  Image,
  Layers,
  LifeBuoy,
  Lightbulb,
  List,
  Loader,
  Lock,
  Mail,
  Map,
  Monitor,
  Moon,
  Music,
  PenTool,
  Phone,
  Rocket,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sliders,
  Star,
  Sun,
  Target,
  ThumbsUp,
  TrendingUp,
  Truck,
  User,
  Wallet,
  Wrench,
} from 'lucide-react';

const iconMap: Record<
  string,
  React.ComponentType<{ className?: string; size?: number }>
> = {
  Activity,
  Bell,
  Book,
  Camera,
  Check,
  Code,
  Globe,
  Heart,
  Home,
  Lock,
  Mail,
  Map,
  Phone,
  Star,
  User,
  Calendar,
  ChartBar,
  ChartPie,
  Clipboard,
  Cloud,
  Compass,
  Cpu,
  Database,
  FileText,
  Flag,
  Folder,
  Gift,
  Image,
  Layers,
  LifeBuoy,
  Lightbulb,
  List,
  Loader,
  Monitor,
  Moon,
  Music,
  PenTool,
  Rocket,
  Search,
  Settings,
  Shield,
  ShoppingCart,
  Sliders,
  Sun,
  Target,
  ThumbsUp,
  TrendingUp,
  Truck,
  Wallet,
  Wrench,
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.7, ease: easeOut },
  },
};

export default function Services() {
  const { data: services, isLoading, error } = useServices();

  // Debug API response
  useEffect(() => {
    console.log('Services data:', services);
  }, [services]);

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
        animate="visible"
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
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="relative p-8 bg-avocado/75 backdrop-blur-2xl rounded-3xl shadow-xl flex flex-col items-center text-center"
              >
                <BorderBeam
                  size={150}
                  duration={6}
                  colorFrom="var(--color-indian-khaki)"
                  colorTo="var(--color-lemon-grass)"
                />
                <Skeleton className="w-20 h-20 rounded-full mb-6 bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-6 w-32 mb-4 bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-48 bg-[var(--color-rangitoto)]/10" />
                <Skeleton className="h-4 w-40 mt-2 bg-[var(--color-rangitoto)]/10" />
              </div>
            ))
          ) : error ? (
            <div className="text-center text-red-500 col-span-full">
              Failed to load services. Please try again later.
            </div>
          ) : !services || services.length === 0 ? (
            <div className="text-center text-[var(--color-albescent-white)]/70 col-span-full">
              No services available at the moment.
            </div>
          ) : (
            services.map((service: Service, key: number) => {
              const IconComponent = iconMap[service.icon] ?? Activity;
              return (
                <motion.div
                  key={key}
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
                    <IconComponent size={64} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold mb-3 text-[var(--color-albescent-white)]">
                    {service.title}
                  </h3>
                  <p className="text-sm text-[var(--color-albescent-white)]/80">
                    {service.description}
                  </p>
                </motion.div>
              );
            })
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
