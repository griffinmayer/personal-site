'use client';

import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { useCursor } from '@/components/motion/AnimatedCursor';

interface ContactItemProps {
  label: string;
  value: string;
  href: string;
  external?: boolean;
}

function ContactItem({ label, value, href, external }: ContactItemProps) {
  const { setCursorState } = useCursor();
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-widest mb-2 text-[var(--accent)] font-mono">
        {label}
      </p>
      <MagneticButton
        onMouseEnter={() => setCursorState('hover')}
        onMouseLeave={() => setCursorState('default')}
      >
        <a
          href={href}
          className="text-sm text-[var(--text)] hover:text-[var(--accent)] transition-colors duration-200 break-all"
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        >
          {value}
        </a>
      </MagneticButton>
    </div>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 px-6 scroll-mt-16 bg-[var(--surface-navy)]"
    >
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-3 text-[var(--accent)] font-mono">
            ——
          </p>
          <h2 className="text-3xl font-bold text-[var(--text)] mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Get in Touch
          </h2>
          <p className="text-sm leading-relaxed max-w-md mb-12 text-[var(--text-muted)]">
            Open to internship and co-op opportunities. Feel free to reach out directly.
          </p>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-3 gap-8">
          <RevealOnScroll direction="up" delay={0.1}>
            <ContactItem label="Email" value="Griffin.mayer@bell.net" href="mailto:Griffin.mayer@bell.net" />
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.2}>
            <ContactItem label="Phone" value="(647) 782-2025" href="tel:6477822025" />
          </RevealOnScroll>
          <RevealOnScroll direction="up" delay={0.3}>
            <ContactItem
              label="LinkedIn"
              value="griffinrobertmayer"
              href="https://www.linkedin.com/in/griffinrobertmayer"
              external
            />
          </RevealOnScroll>
        </div>

        <p className="mt-20 text-xs text-[var(--text-muted)] opacity-50">
          References available upon request · Toronto, Ontario
        </p>
      </div>
    </section>
  );
}
