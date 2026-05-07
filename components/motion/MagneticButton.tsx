'use client';

import { useCallback, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onMouseEnter,
  onMouseLeave,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      x.set((e.clientX - rect.left - rect.width / 2) * strength);
      y.set((e.clientY - rect.top - rect.height / 2) * strength);
    },
    [x, y, strength],
  );

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    onMouseLeave?.();
  }, [x, y, onMouseLeave]);

  const handleMouseEnter = useCallback(() => {
    onMouseEnter?.();
  }, [onMouseEnter]);

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className={className}
    >
      {children}
    </motion.div>
  );
}
