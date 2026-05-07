'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/data';

export function Nav() {
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section.toLowerCase()); },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16">
      <motion.div
        className="absolute inset-0 bg-[var(--surface-navy)] backdrop-blur-md border-b border-[var(--border)]"
        style={{ opacity: backdropOpacity }}
      />
      <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <span className="font-semibold text-sm tracking-widest uppercase text-[var(--text)]">
          Griffin Mayer
        </span>
        <div className="hidden sm:flex items-center gap-1">
          {NAV_SECTIONS.map((section) => {
            const id = section.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={section}
                href={`#${id}`}
                data-state={isActive ? 'active' : 'inactive'}
                className="relative px-3 py-1.5 text-sm transition-colors duration-200 text-[var(--text-muted)] data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {section}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
