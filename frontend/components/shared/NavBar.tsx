'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

type NavLink = {
  name: string;
  href: string;
};

const links: NavLink[] = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Services', href: '/services' },
  { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50 bg-white shadow-md"
      initial={false}
      animate={false}
    >
      <nav
        className="flex justify-between items-center px-6 py-3 max-w-6xl mx-auto"
        aria-label="Primary"
      >
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold">
          <Image
            src={'/eshi.png'}
            alt=" ESHI Consultancy Logo"
            width={100}
            height={100}
            priority
            className="rounded-xl"
          />
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6">
          <div className="flex gap-8 text-lemon-grass font-medium">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-rangitoto transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avocado rounded-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <Link
            href="/#contact"
            className="ml-6 px-6 py-2 rounded-full font-semibold bg-[var(--color-avocado)] text-[var(--color-albescent-white)] shadow-lg hover:bg-[var(--color-lemon-grass)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avocado"
          >
            Get in Touch
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-menu"
            aria-label={
              menuOpen ? 'Close navigation menu' : 'Open navigation menu'
            }
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avocado rounded-sm"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-rangitoto" />
            ) : (
              <Menu className="w-6 h-6 text-rangitoto" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-nav-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white w-full shadow-md"
          >
            <div className="flex flex-col items-center gap-6 py-6">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-lemon-grass text-lg font-medium hover:text-rangitoto transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avocado rounded-sm"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              {/* Mobile CTA */}
              <Link
                href="/#contact"
                className="mt-4 px-6 py-2 rounded-full font-semibold bg-[var(--color-avocado)] text-[var(--color-albescent-white)] shadow-lg hover:bg-[var(--color-lemon-grass)] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-avocado"
                onClick={() => setMenuOpen(false)}
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
