'use client';

import { motion } from 'framer-motion';
import { Mail, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  {
    title: 'Company',
    links: [
      { name: 'About', href: '#about' },
      { name: 'Services', href: '#services' },
      { name: 'Team', href: '#team' },
      { name: 'Blog', href: '#blog' },
    ],
  },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-[var(--color-avocado)] text-[var(--color-albescent-white)] pt-20"
    >
      <div className="max-w-6xl mx-auto px-3 py-16 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Logo & Description */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold">ESHI</h2>
          <p className="text-[var(--color-albescent-white)]/90 leading-relaxed">
            Empowering grassroots organizations to deliver sustainable impact
            worldwide through expertise, training, and capacity building.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2">
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="flex flex-col gap-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="hover:text-rangitoto transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
          <div className="flex items-center gap-3">
            <MapPin className="w-5 h-5" />
            <span>Addis Ababa, Ethiopia</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5" />
            <span>+251 911 123 456</span>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5" />
            <span>info@eshi-consulting.org</span>
          </div>
          <Link
            href="/#contact"
            className="mt-4 inline-block px-2 py-2 rounded-sm font-semibold bg-albescent-white text-center text-[var(--color-avocado)] hover:bg-[var(--color-deco)] hover:text-[var(--color-bg-rangitoto] transition-colors shadow-lg"
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-[var(--color-albescent-white)]/20 mt-12 py-6 text-center text-sm text-[var(--color-albescent-white)]/70">
        &copy; {new Date().getFullYear()} ESHI Consulting. All rights reserved.
      </div>
    </motion.footer>
  );
}
