'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { SectionHeading } from '@/components/ui/section-heading';
import { skills, interests, volunteer } from '@/lib/data';

export function Skills() {
  const marqueeItems = [...skills, ...skills];

  return (
    <section id="skills" className="py-24 px-6 scroll-mt-16 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <SectionHeading>Skills & Interests</SectionHeading>
        </RevealOnScroll>

        <div className="mt-10 overflow-hidden no-scrollbar">
          <motion.div
            className="flex gap-6 w-max"
            animate={{ x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, ease: 'linear', duration: 18 }}
          >
            {marqueeItems.map((skill, i) => (
              <span
                key={i}
                className="text-sm font-semibold px-4 py-2 rounded-full border border-[var(--border)] text-[var(--accent)] whitespace-nowrap shrink-0"
              >
                {skill}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 gap-10">
          <RevealOnScroll direction="left" delay={0.1}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5 text-[var(--text-muted)] font-mono">
                Interests
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <span
                    key={interest}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-[var(--base)] text-[var(--text-muted)] border border-[var(--border)]"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll direction="left" delay={0.2}>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest mb-5 text-[var(--text-muted)] font-mono">
                Volunteer
              </p>
              <ul className="space-y-2.5">
                {volunteer.map((v) => (
                  <li
                    key={v}
                    className="text-sm text-[var(--text-muted)] flex gap-2 items-start"
                  >
                    <span className="text-[var(--accent)] mt-0.5">·</span>
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
