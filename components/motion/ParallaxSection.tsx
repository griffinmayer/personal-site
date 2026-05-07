'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
  bgClassName?: string;
}

export function ParallaxSection({
  children,
  speed = 0.3,
  className,
  bgClassName,
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`${-speed * 100}px`, `${speed * 100}px`],
  );

  return (
    <div ref={ref} className={`relative overflow-hidden ${className ?? ''}`}>
      <motion.div style={{ y }} className={`absolute inset-0 ${bgClassName ?? ''}`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
