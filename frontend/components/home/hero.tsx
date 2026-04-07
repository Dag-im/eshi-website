'use client';

import { AuroraText } from '@/components/magicui/aurora-text';
import { resolveAssetUrl } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

interface HeroProps {
  bgImages?: { src: string; alt: string }[];
}

export default function Hero({
  bgImages = [],
}: HeroProps) {
  const [failedImageSources, setFailedImageSources] = useState<string[]>([]);

  const normalizedImages = bgImages
    .map((img) => ({
      ...img,
      resolvedSrc: resolveAssetUrl(img.src),
    }))
    .filter((img) => Boolean(img.resolvedSrc));

  const availableImages = normalizedImages.filter(
    (img) => !failedImageSources.includes(img.resolvedSrc)
  );

  const len = availableImages.length;
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const isTransitioning = useRef(false);

  useEffect(() => {
    currentRef.current = current;
  }, [current]);

  useEffect(() => {
    if (!len) {
      setCurrent(0);
      currentRef.current = 0;
      return;
    }

    if (current >= len) {
      setCurrent(0);
      currentRef.current = 0;
    }
  }, [current, len]);

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
      if (!len) return;
      if (isTransitioning.current) return;
      const safeIdx = ((nextIdx % len) + len) % len;
      if (safeIdx === currentRef.current) return;
      isTransitioning.current = true;
      await preloadImage(availableImages[safeIdx].resolvedSrc);
      setCurrent(safeIdx);
      setTimeout(() => (isTransitioning.current = false), 1800);
    },
    [availableImages, len, preloadImage]
  );

  useEffect(() => {
    if (len <= 1) return;
    const id = setInterval(() => {
      const next = (currentRef.current + 1) % len;
      goTo(next);
    }, 6000);
    return () => clearInterval(id);
  }, [len, goTo]);

  return (
    <section className="relative w-full h-screen overflow-hidden pt-10 bg-black">
      {/* HERO BACKGROUNDS */}
      <div className="absolute inset-0 z-0">
        {len ? (
          <AnimatePresence mode="wait">
            {availableImages.map((img, idx) => {
              const isActive = idx === current;
              return (
                <motion.div
                  key={img.resolvedSrc}
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
                    src={img.resolvedSrc}
                    alt={img.alt}
                    fill
                    className="object-cover object-center"
                    priority={idx === 0}
                    sizes="100vw"
                    onError={() => {
                      setFailedImageSources((prev) =>
                        prev.includes(img.resolvedSrc)
                          ? prev
                          : [...prev, img.resolvedSrc]
                      );
                    }}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        ) : (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(186,166,114,0.34),transparent_45%),radial-gradient(circle_at_84%_24%,rgba(131,142,98,0.32),transparent_40%),linear-gradient(135deg,#172315_0%,#1f2d1a_36%,#2f3d24_100%)]" />
            <div className="absolute inset-0 opacity-25 bg-[linear-gradient(115deg,rgba(255,255,255,0.08)_0%,rgba(255,255,255,0)_22%,rgba(255,255,255,0.08)_44%,rgba(255,255,255,0)_66%,rgba(255,255,255,0.08)_88%)] bg-[length:240px_240px]" />
            <div className="absolute inset-0 bg-black/25" />
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <h1>
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
        </h1>

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
          <Link
            href="/services"
            className="inline-flex items-center justify-center bg-avocado text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-rangitoto transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deco"
          >
            Discover Our Services
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center bg-transparent border-2 border-albescent-white text-albescent-white font-semibold py-3 px-6 rounded-lg hover:bg-albescent-white hover:text-rangitoto transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deco"
          >
            Get in Touch
          </Link>
        </motion.div>
      </div>

      {/* DOTS */}
      {len > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-30">
          {availableImages.map((img, idx) => (
            <button
              key={`${img.resolvedSrc}-${idx}`}
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
