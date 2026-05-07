'use client';

import { useCallback } from 'react';
import { motion } from 'framer-motion';
import { SplitText } from '@/components/motion/SplitText';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { MagneticButton } from '@/components/motion/MagneticButton';
import { Button } from '@/components/ui/button';
import { useCursor } from '@/components/motion/AnimatedCursor';

export function Hero() {
  const { setCursorState } = useCursor();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center px-6 pt-16 overflow-hidden bg-[var(--surface-navy)]"
      onMouseMove={handleMouseMove}
      style={{
        backgroundImage:
          'radial-gradient(circle at var(--mouse-x, 30%) var(--mouse-y, 50%), rgba(201,168,76,0.10) 0%, transparent 60%)',
      }}
    >
      <div className="max-w-5xl mx-auto w-full py-28">
        <RevealOnScroll direction="up" delay={0.1}>
          <p className="text-xs font-bold uppercase tracking-[0.2em] mb-6 text-[var(--accent)] font-mono">
            Finance · Business · Investment
          </p>
        </RevealOnScroll>

        <h1 className="fluid-heading font-bold text-[var(--text)] mb-6 overflow-hidden leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
          <SplitText delay={0.15}>Griffin Mayer</SplitText>
        </h1>

        <RevealOnScroll direction="up" delay={0.6}>
          <p className="text-lg leading-relaxed max-w-xl mb-10 text-[var(--text-muted)]">
            Finance student at Dalhousie University with hands-on experience in wealth management
            at CIBC Wood Gundy and business analysis at CIBC. Passionate about investment research
            and financial markets.
          </p>
        </RevealOnScroll>

        <RevealOnScroll direction="up" delay={0.8}>
          <div className="flex flex-wrap gap-4">
            <MagneticButton
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <Button href="#contact" variant="primary">Get in Touch</Button>
            </MagneticButton>
            <MagneticButton
              onMouseEnter={() => setCursorState('hover')}
              onMouseLeave={() => setCursorState('default')}
            >
              <Button
                href="https://www.linkedin.com/in/griffinrobertmayer"
                variant="outline"
                external
              >
                LinkedIn ↗
              </Button>
            </MagneticButton>
          </div>
        </RevealOnScroll>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <div className="w-px h-8 bg-[var(--accent)] opacity-40 mx-auto" />
      </motion.div>
    </section>
  );
}
