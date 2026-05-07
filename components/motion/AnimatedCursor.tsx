'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover';

interface CursorContextValue {
  setCursorState: (state: CursorState) => void;
}

const CursorContext = createContext<CursorContextValue>({ setCursorState: () => {} });

export function useCursor() {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-200);
  const mouseY = useMotionValue(-200);

  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY, visible]);

  const isHover = cursorState === 'hover';

  return (
    <CursorContext.Provider value={{ setCursorState }}>
      {children}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-[var(--text)] mix-blend-difference"
        style={{
          width: 8,
          height: 8,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
      />
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-[var(--text)] mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          translateX: '-50%',
          translateY: '-50%',
          opacity: visible ? 1 : 0,
        }}
        animate={{ width: isHover ? 56 : 32, height: isHover ? 56 : 32 }}
        transition={{ duration: 0.2 }}
      />
    </CursorContext.Provider>
  );
}
