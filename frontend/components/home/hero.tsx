'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const Lottie = dynamic(() => import('lottie-react'), { ssr: false });

interface HeroProps {
  bgImages?: { src: string; alt: string }[];
}

export default function Hero({
  bgImages = [
    { src: '/hero-bg.png', alt: 'ESHI Consultancy background' },
    { src: '/hero-bg-2.png', alt: 'ESHI Consultancy background 2' },
    { src: '/hero-bg-3.png', alt: 'ESHI Consultancy background 3' },
  ],
}: HeroProps) {
  const len = bgImages.length;
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  const preloadImage = useCallback((src?: string) => {
    return new Promise<void>((resolve) => {
      if (!src) return resolve();
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
      setTimeout(resolve, 3000);
    });
  }, []);

  const goTo = useCallback(
    async (nextIdx: number) => {
      if (isTransitioning.current) return;
      const safeIdx = ((nextIdx % len) + len) % len;
      if (safeIdx === currentRef.current) return;
      isTransitioning.current = true;
      await preloadImage(bgImages[safeIdx].src);
      setCurrent(safeIdx);
      setTimeout(() => (isTransitioning.current = false), 1800);
    },
    [bgImages, len, preloadImage]
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => {
      const next = (currentRef.current + 1) % len;
      goTo(next);
    }, 6000);
    return () => clearInterval(id);
  }, [len, goTo]);

  // Optional Lottie animation
  const [animData, setAnimData] = useState<any>(null);
  useEffect(() => {
    fetch('/lotties/hero.json')
      .then((r) => (r.ok ? r.json() : null))
      .then(setAnimData)
      .catch(() => setAnimData(null));
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden pt-10 bg-black">
      {/* HERO BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          {bgImages.map((img, idx) => {
            const isActive = idx === current;
            return (
              <motion.div
                key={idx}
                className="absolute inset-0"
                style={{ zIndex: isActive ? 2 : 1 }}
                initial={
                  isActive
                    ? { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' }
                    : {}
                }
                animate={
                  isActive
                    ? {
                        clipPath: [
                          'polygon(0 0, 0 0, 0 100%, 0 100%)',
                          'polygon(0 0, 60% 0, 40% 100%, 0 100%)',
                          'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
                        ],
                      }
                    : {}
                }
                transition={{
                  duration: 1.5,
                  ease: [0.45, 0, 0.55, 1],
                }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center"
                  priority={idx === 0}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* LOTTIE ANIMATION */}
      {animData && (
        <div className="absolute inset-0 z-10 pointer-events-none">
          <Lottie
            animationData={animData}
            loop
            autoplay
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.42,
            }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <AuroraText
          className="text-5xl md:text-7xl font-bold mb-4 drop-shadow-lg"
          colors={[
            'var(--color-albescent-white)',
            'var(--color-deco)',
            'var(--color-indian-khaki)',
          ]}
          speed={1.5}
        >
          ESHI Consultancy
        </AuroraText>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-3xl md:text-5xl font-semibold mb-6 text-indian-khaki drop-shadow-lg"
        >
          Building Capacity for Local Grassroots Organizations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="max-w-3xl text-albescent-white mb-8 drop-shadow-md"
        >
          ESHI has two meanings: E.S.H.I. began as an acronym for Ethiopian
          Self-Help Initiative, but as our intention was always to work
          globally, we now respond to Eshi, an everyday Ethiopian expression
          that means, “ok, cool.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/services">
            <PulsatingButton
              pulseColor="var(--color-deco)"
              duration="2s"
              className="bg-avocado text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-rangitoto transition-colors"
            >
              Discover Our Services
            </PulsatingButton>
          </Link>
          <Link href="/contact">
            <InteractiveHoverButton className="bg-transparent border-2 border-albescent-white text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-albescent-white hover:text-rangitoto transition-all">
              Get in Touch
            </InteractiveHoverButton>
          </Link>
        </motion.div>
      </div>

      {/* DOTS */}
      {len > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {bgImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goTo(idx)}
              disabled={isTransitioning.current}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-3 w-3 rounded-full transition-all ${
                current === idx
                  ? 'bg-albescent-white scale-110'
                  : 'bg-albescent-white/50'
              } ${
                isTransitioning.current
                  ? 'cursor-not-allowed opacity-70'
                  : 'cursor-pointer'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
