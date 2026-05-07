'use client';

import { motion } from 'framer-motion';

interface SplitTextProps {
  children: string;
  className?: string;
  delay?: number;
}

const charVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: (delay: number) => ({
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 60, damping: 20, delay },
  }),
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03 } },
};

export function SplitText({ children, className, delay = 0 }: SplitTextProps) {
  const words = children.split(' ');

  return (
    <motion.span
      className={`inline-flex flex-wrap ${className ?? ''}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label={children}
    >
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-flex overflow-hidden"
          style={{ marginRight: wi < words.length - 1 ? '0.3em' : 0 }}
        >
          {word.split('').map((char, ci) => (
            <motion.span
              key={ci}
              variants={charVariants}
              custom={delay}
              aria-hidden
              style={{ display: 'inline-block' }}
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.span>
  );
}
