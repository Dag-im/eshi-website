'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.div
      className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-[90%] max-w-5xl rounded-3xl"
      initial={{ backgroundColor: 'rgba(255,255,255,0)' }}
      animate={{
        backgroundColor: scrolled
          ? 'rgba(255,255,255,0.1)'
          : 'rgba(255,255,255,0)',
        backdropFilter: scrolled ? 'blur(20px)' : 'blur(0px)',
        boxShadow: scrolled ? '0 8px 30px rgba(0,0,0,0.15)' : 'none',
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between items-center px-6 py-3">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold text-[var(--color-rangitoto)]">
          <Image
            src={'/eshi.png'}
            alt="ESHI Consulting Logo"
            width={75}
            height={75}
            priority
            className="rounded-xl"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-8 text-rangitoto font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-rangitoto/50 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/#contact"
            className="ml-6 px-6 py-2 rounded-full font-semibold bg-[var(--color-avocado)] text-[var(--color-albescent-white)] shadow-lg hover:bg-[var(--color-lemon-grass)] transition-colors"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <X className="w-6 h-6 text-[var(--color-rangitoto)]" />
            ) : (
              <Menu className="w-6 h-6 text-[var(--color-rangitoto)]" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-[rgba(255,255,255,0.1)] backdrop-blur-xl w-full shadow-md rounded-b-3xl"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-[var(--color-rangitoto)] text-lg font-medium hover:text-[var(--color-avocado)] transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile CTA */}
              <Link
                href="/#contact"
                className="mt-4 px-6 py-2 rounded-full font-semibold bg-[var(--color-avocado)] text-[var(--color-albescent-white)] shadow-lg hover:bg-[var(--color-lemon-grass)] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
