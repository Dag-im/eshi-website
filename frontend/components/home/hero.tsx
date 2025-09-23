'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { InteractiveHoverButton } from '@/components/magicui/interactive-hover-button';
import { PulsatingButton } from '@/components/magicui/pulsating-button';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

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

  // keep ref in sync with state
  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  // Lottie JSON (optional)
  const [animData, setAnimData] = useState<any | null>(null);
  useEffect(() => {
    let alive = true;
    fetch('/lotties/hero.json')
      .then((r) => (r.ok ? r.json() : Promise.reject('not found')))
      .then((json) => alive && setAnimData(json))
      .catch(() => setAnimData(null));
    return () => {
      alive = false;
    };
  }, []);

  // overlay CSS vars (pre-built rgba in :root)
  const overlayVars = useMemo(
    () => ['var(--overlay-1)', 'var(--overlay-2)', 'var(--overlay-3)'],
    []
  );

  // preload helper (resolves even on error)
  const preloadImage = useCallback((src?: string) => {
    return new Promise<void>((resolve) => {
      if (!src) return resolve();
      const img = new window.Image();
      img.src = src;
      img.onload = () => resolve();
      img.onerror = () => resolve();
      // safety fallback
      setTimeout(() => resolve(), 3000);
    });
  }, []);

  // loading guard so we don't double-trigger transitions
  const isLoadingRef = useRef(false);

  // move to index (preloads then sets)
  const goTo = useCallback(
    async (targetIdx: number) => {
      if (isLoadingRef.current) return;
      const safeIdx = ((targetIdx % len) + len) % len;
      if (safeIdx === currentRef.current) return;

      isLoadingRef.current = true;
      await preloadImage(bgImages[safeIdx].src);
      setCurrent(safeIdx);

      // small delay to let paint happen
      setTimeout(() => {
        isLoadingRef.current = false;
      }, 120);
    },
    [bgImages, len, preloadImage]
  );

  // auto-slide with preloading
  useEffect(() => {
    if (len <= 1) return;
    let mounted = true;
    const id = setInterval(async () => {
      if (!mounted) return;
      if (isLoadingRef.current) return;
      const next = (currentRef.current + 1) % len;
      isLoadingRef.current = true;
      await preloadImage(bgImages[next].src);
      if (!mounted) {
        isLoadingRef.current = false;
        return;
      }
      setCurrent(next);
      setTimeout(() => (isLoadingRef.current = false), 120);
    }, 5000);
    return () => {
      mounted = false;
      clearInterval(id);
    };
  }, [bgImages, len, preloadImage]);

  // track translate x in percent
  const trackX = `-${current * 100}%`;

  return (
    <section className="relative w-full h-screen pt-10 overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="flex h-full w-full"
          animate={{ x: `-${current * 100}%` }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {bgImages.map((img, idx) => (
            <div key={idx} className="relative h-full w-full flex-shrink-0">
              <Image
                src={img.src}
                alt={img.alt}
                fill
                priority={idx === 0}
                className="object-cover object-center"
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Overlay tint (fades per slide) */}
      <motion.div
        key={`overlay-${current}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 z-10 will-change-opacity"
        style={{ backgroundColor: overlayVars[current % overlayVars.length] }}
      />

      {/* Lottie above images */}
      {animData && (
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Lottie
            animationData={animData}
            loop
            autoplay
            style={{
              width: '100%',
              height: '100%',
              opacity: 0.42,
              willChange: 'opacity, transform',
            }}
            rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-30 flex flex-col items-center justify-center h-full text-center px-4">
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
          transition={{ delay: 0.45, duration: 0.7 }}
          className="text-3xl md:text-5xl font-semibold mb-6 text-indian-khaki drop-shadow-lg"
        >
          Building Capacity for Local Grassroots Organizations
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.8 }}
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
          transition={{ delay: 1, duration: 0.8 }}
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

        {/* Dots */}
        {len > 1 && (
          <div className="absolute bottom-6 flex gap-2">
            {bgImages.map((_, idx) => {
              const disabled = isLoadingRef.current;
              return (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-disabled={disabled}
                  disabled={disabled}
                  className={`h-3 w-3 rounded-full transition-colors ${
                    current === idx
                      ? 'bg-albescent-white'
                      : 'bg-albescent-white/50'
                  } ${
                    disabled
                      ? 'cursor-not-allowed opacity-70'
                      : 'cursor-pointer'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
