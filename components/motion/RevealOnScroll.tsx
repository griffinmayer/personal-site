'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right';

interface RevealOnScrollProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  distance?: number;
  className?: string;
}

function getHidden(direction: Direction, distance: number) {
  switch (direction) {
    case 'up':    return { opacity: 0, y:  distance };
    case 'down':  return { opacity: 0, y: -distance };
    case 'left':  return { opacity: 0, x:  distance };
    case 'right': return { opacity: 0, x: -distance };
  }
}

function getVisible(direction: Direction) {
  return direction === 'left' || direction === 'right'
    ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 };
}

export function RevealOnScroll({
  children,
  direction = 'up',
  delay = 0,
  distance = 40,
  className,
}: RevealOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.div
      ref={ref}
      initial={getHidden(direction, distance)}
      animate={inView ? getVisible(direction) : getHidden(direction, distance)}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
