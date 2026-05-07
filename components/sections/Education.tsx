'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { education } from '@/lib/data';

export function Education() {
  return (
    <section id="education" className="py-24 px-6 scroll-mt-16 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <SectionHeading>Education</SectionHeading>
        </RevealOnScroll>
        <div className="mt-12 grid sm:grid-cols-2 gap-5">
          {education.map((edu, i) => (
            <RevealOnScroll key={edu.school} direction="up" delay={i * 0.1}>
              <motion.div
                className="group h-full"
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="@container h-full">
                  <Card className="h-full">
                    <div className="flex flex-col @md:flex-row @md:items-start @md:justify-between gap-1 mb-4">
                      <div>
                        <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200 text-balance">
                          {edu.school}
                        </h3>
                        <p className="text-sm font-medium text-[var(--accent)] mt-0.5">
                          {edu.degree}
                        </p>
                      </div>
                      <span className="text-xs text-[var(--text-muted)] font-mono shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <ul className="space-y-1.5">
                      {edu.details.map((detail) => (
                        <li
                          key={detail}
                          className="flex gap-2 text-sm text-[var(--text-muted)] items-center"
                        >
                          <span className="text-[var(--accent)]">·</span>
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </Card>
                </div>
              </motion.div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
