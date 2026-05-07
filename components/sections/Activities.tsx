'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { activities } from '@/lib/data';

export function Activities() {
  return (
    <section id="activities" className="py-24 px-6 scroll-mt-16 bg-[var(--base)]">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <SectionHeading>Extracurricular & Volunteer</SectionHeading>
        </RevealOnScroll>
        <div className="mt-12 space-y-5">
          {activities.map((activity, i) => (
            <RevealOnScroll key={activity.title + activity.org} direction="up" delay={i * 0.1}>
              <motion.div
                className="group"
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                        {activity.title}
                      </h3>
                      <p className="text-sm font-medium text-[var(--accent)] mt-0.5">
                        {activity.org} · {activity.location}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono shrink-0 mt-0.5">
                      {activity.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {activity.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-3 text-sm text-[var(--text-muted)] leading-relaxed"
                      >
                        <span className="mt-0.5 shrink-0 text-[var(--accent)] group-hover:translate-x-1 transition-transform duration-200">
                          —
                        </span>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
