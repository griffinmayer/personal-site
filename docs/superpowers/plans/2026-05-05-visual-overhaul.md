# Visual Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Big-bang rewrite of griffinmayer.com — remove shadcn, build a custom Framer Motion component library, and rebuild all sections with a dark Navy+Gold design system.

**Architecture:** Single `app/page.tsx` becomes a thin composition of section components. A `components/motion/` library provides reusable animation primitives. Custom `components/ui/` replaces shadcn. All content lives in `lib/data.ts`. `CursorProvider` and `PageTransition` wrap the app in `layout.tsx`.

**Tech Stack:** Next.js 16.2.4 App Router, React 19, Framer Motion 12, Tailwind CSS v4, TypeScript, Playfair Display + Geist Sans via `next/font/google`.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Modify | `app/globals.css` | Design tokens, @layer utilities |
| Modify | `app/layout.tsx` | Fonts, CursorProvider, PageTransition, grain overlay |
| Modify | `app/page.tsx` | Pure section composition |
| Create | `lib/data.ts` | All resume content arrays |
| Create | `components/motion/AnimatedCursor.tsx` | Cursor + CursorContext + useCursor |
| Create | `components/motion/SplitText.tsx` | Char-level staggered reveal |
| Create | `components/motion/MagneticButton.tsx` | Spring-based magnetic hover |
| Create | `components/motion/RevealOnScroll.tsx` | useInView reveal wrapper |
| Create | `components/motion/ParallaxSection.tsx` | Scroll-driven background parallax |
| Create | `components/motion/PageTransition.tsx` | AnimatePresence page wrapper |
| Overwrite | `components/ui/card.tsx` | Custom card (replaces shadcn) |
| Overwrite | `components/ui/button.tsx` | Custom button (replaces shadcn) |
| Create | `components/ui/section-heading.tsx` | Shared section heading |
| Create | `components/sections/Nav.tsx` | Scroll-aware fixed nav |
| Create | `components/sections/Hero.tsx` | Split-text hero, gradient parallax |
| Create | `components/sections/Experience.tsx` | Card grid with group hover |
| Create | `components/sections/Education.tsx` | Cards with @container queries |
| Create | `components/sections/Activities.tsx` | Card grid with group hover |
| Create | `components/sections/Skills.tsx` | Marquee ticker + tag reveals |
| Create | `components/sections/Contact.tsx` | Magnetic CTAs, cursor expansion |
| Delete | `components/ui/dialog.tsx` | Unused shadcn |
| Delete | `components/ui/input.tsx` | Unused shadcn |
| Delete | `components/json` | shadcn config |

---

## Task 1: Design Tokens — globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css entirely**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-display: var(--font-display);
}

html {
  scroll-behavior: smooth;
}

@layer base {
  :root {
    --base:         #0d0d0f;
    --surface:      #111827;
    --surface-navy: #1a2744;
    --accent:       #c9a84c;
    --accent-dim:   #a07c34;
    --text:         #f0ece4;
    --text-muted:   #8a8070;
    --border:       rgba(255, 255, 255, 0.08);
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    background-color: var(--base);
    color: var(--text);
    -webkit-font-smoothing: antialiased;
  }

  ::selection {
    background-color: var(--accent);
    color: var(--base);
  }
}

@layer utilities {
  .text-balance   { text-wrap: balance; }
  .no-scrollbar   { scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .fluid-heading  { font-size: clamp(3rem, 8vw, 5rem); }
  .fluid-body     { font-size: clamp(0.875rem, 1.5vw, 1rem); }
}
```

- [ ] **Step 2: Verify TypeScript is happy (no JSX errors from removing shadcn CSS vars)**

```
npx tsc --noEmit
```

Expected: errors about missing shadcn component types — that's fine, sections haven't been rewritten yet. What must NOT appear: Tailwind config errors.

- [ ] **Step 3: Commit**

```
git add app/globals.css
git commit -m "feat: replace globals.css with dark design token system"
```

---

## Task 2: Content — lib/data.ts

**Files:**
- Create: `lib/data.ts`

- [ ] **Step 1: Create lib/data.ts with all resume content**

```typescript
export const NAV_SECTIONS = ['Experience', 'Education', 'Activities', 'Skills', 'Contact'] as const;

export const experience = [
  {
    title: 'Private Wealth Analyst',
    company: 'CIBC Wood Gundy',
    location: 'Toronto, ON',
    period: 'Sept 2025 – Dec 2025',
    bullets: [
      'Conducted fee standardization analysis across multiple advisory platforms to identify pricing inconsistencies and optimize client cost structures.',
      'Built Excel models to compare tiered fee schedules, optimize fees, and assess revenue impacts of proposed standardization.',
      'Supported rollout of standardized pricing frameworks by preparing data validation templates and assisting in advisor communications.',
    ],
  },
  {
    title: 'Business Analyst',
    company: 'CIBC',
    location: 'Toronto, ON',
    period: 'Jan 2025 – Apr 2025',
    bullets: [
      'Audited business rules and requirements for payment systems of 100+ companies.',
      'Built effective communication skills by adapting and responding quickly in high-stress environments.',
      'Mapped end-to-end payment processing flows and identified and resolved pain points.',
    ],
  },
  {
    title: 'Waterfront Lifeguard',
    company: 'City of Toronto',
    location: 'Toronto, ON',
    period: 'Jun 2021 – Aug 2024',
    bullets: [
      'Responsible for patron safety and surveillance; provided emergency first aid and coordinated with police and emergency services.',
      'Analyzed and reported on weekly attendance and incident data to track trends and improve operational strategies.',
      'Obtained certifications including Bronze Medal/Cross, Standard First Aid, and National Waterfront Lifeguard.',
    ],
  },
] as const;

export const education = [
  {
    school: 'Rowe School of Business, Dalhousie University',
    location: 'Halifax, NS',
    degree: 'Honours Bachelor of Commerce & Co-op',
    details: ['Finance Major', 'GPA: 3.34'],
    period: 'Candidate 2027',
  },
  {
    school: 'Malvern Collegiate Institute',
    location: 'Toronto, ON',
    degree: 'Ontario Secondary School Diploma',
    details: ['Honour Roll', 'Student Council'],
    period: '2019 – 2023',
  },
] as const;

export const activities = [
  {
    title: 'Student Representative',
    org: 'Dalhousie Commerce Society (DCS)',
    location: 'Halifax, NS',
    period: 'Jan 2023 – Sept 2024',
    bullets: [
      'Contacted and built professional relationships with sponsors and businesses to fund DCS events.',
      'Successfully planned and hosted three events for Dalhousie students.',
      'Attended multiple networking events to grow professional network.',
    ],
  },
  {
    title: 'General Member',
    org: 'Dalhousie Investment Society (DALIS)',
    location: 'Halifax, NS',
    period: 'Jan 2023 – Present',
    bullets: [
      'Gained Bloomberg Terminal skills and Bloomberg Market Concepts certification.',
      'Learned portfolio management principles and investment strategies.',
      'Participated in investment research for group portfolios and weekly market news updates.',
    ],
  },
] as const;

export const skills = [
  'Public Speaking',
  'Microsoft Excel',
  'Bloomberg Terminal',
  'Investment Research & Analysis',
] as const;

export const interests = [
  'Personal Investment Portfolio',
  'Travel',
  'Fitness',
  'Outdoor Activities',
] as const;

export const volunteer = [
  'Assistant Coach — Phoenix Volleyball',
  'Delivery Person — Beach Metro',
] as const;
```

- [ ] **Step 2: Commit**

```
git add lib/data.ts
git commit -m "feat: extract all resume content to lib/data.ts"
```

---

## Task 3: AnimatedCursor — CursorProvider + useCursor

**Files:**
- Create: `components/motion/AnimatedCursor.tsx`

- [ ] **Step 1: Create AnimatedCursor.tsx**

```tsx
'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
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
      {/* Dot — raw position, no spring */}
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
      {/* Ring — spring position */}
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
```

- [ ] **Step 2: Type-check**

```
npx tsc --noEmit
```

Expected: no errors in the new file (errors elsewhere about shadcn are expected at this stage).

- [ ] **Step 3: Commit**

```
git add components/motion/AnimatedCursor.tsx
git commit -m "feat: add AnimatedCursor with CursorContext and useCursor hook"
```

---

## Task 4: SplitText

**Files:**
- Create: `components/motion/SplitText.tsx`

- [ ] **Step 1: Create SplitText.tsx**

```tsx
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
        <span key={wi} className="inline-flex overflow-hidden" style={{ marginRight: wi < words.length - 1 ? '0.3em' : 0 }}>
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
```

- [ ] **Step 2: Commit**

```
git add components/motion/SplitText.tsx
git commit -m "feat: add SplitText component with char-level spring animation"
```

---

## Task 5: MagneticButton

**Files:**
- Create: `components/motion/MagneticButton.tsx`

- [ ] **Step 1: Create MagneticButton.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```
git add components/motion/MagneticButton.tsx
git commit -m "feat: add MagneticButton with spring-based magnetic pull"
```

---

## Task 6: RevealOnScroll

**Files:**
- Create: `components/motion/RevealOnScroll.tsx`

- [ ] **Step 1: Create RevealOnScroll.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```
git add components/motion/RevealOnScroll.tsx
git commit -m "feat: add RevealOnScroll with configurable direction and delay"
```

---

## Task 7: ParallaxSection

**Files:**
- Create: `components/motion/ParallaxSection.tsx`

- [ ] **Step 1: Create ParallaxSection.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```
git add components/motion/ParallaxSection.tsx
git commit -m "feat: add ParallaxSection with scroll-driven background offset"
```

---

## Task 8: PageTransition

**Files:**
- Create: `components/motion/PageTransition.tsx`

- [ ] **Step 1: Create PageTransition.tsx**

```tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';

export function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="page"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
```

- [ ] **Step 2: Commit**

```
git add components/motion/PageTransition.tsx
git commit -m "feat: add PageTransition with AnimatePresence enter/exit"
```

---

## Task 9: Custom Card

**Files:**
- Overwrite: `components/ui/card.tsx`

- [ ] **Step 1: Overwrite card.tsx with custom implementation**

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={`bg-[var(--surface)] border border-[var(--border)] rounded-xl p-6 ${className ?? ''}`}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```
git add components/ui/card.tsx
git commit -m "feat: replace shadcn Card with custom dark-theme Card"
```

---

## Task 10: Custom Button

**Files:**
- Overwrite: `components/ui/button.tsx`

- [ ] **Step 1: Overwrite button.tsx with custom implementation**

```tsx
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'ghost';
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit';
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: 'bg-[var(--accent)] text-[var(--base)] hover:bg-[var(--accent-dim)]',
  outline: 'border border-[var(--border)] text-[var(--text)] hover:border-[var(--accent)] hover:text-[var(--accent)]',
  ghost:   'text-[var(--text-muted)] hover:text-[var(--text)]',
};

export function Button({
  children,
  variant = 'primary',
  href,
  external,
  onClick,
  className,
  type = 'button',
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-lg h-11 px-8 text-sm';
  const classes = `${base} ${variantClasses[variant]} ${className ?? ''}`;

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 2: Commit**

```
git add components/ui/button.tsx
git commit -m "feat: replace shadcn Button with custom dark-theme Button"
```

---

## Task 11: SectionHeading

**Files:**
- Create: `components/ui/section-heading.tsx`

- [ ] **Step 1: Create section-heading.tsx**

```tsx
export function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="w-8 h-0.5 mb-3 rounded-full bg-[var(--accent)]" />
      <h2 className="text-3xl font-display font-bold text-[var(--text)] text-balance">
        {children}
      </h2>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```
git add components/ui/section-heading.tsx
git commit -m "feat: add SectionHeading component with gold accent bar"
```

---

## Task 12: Nav Section

**Files:**
- Create: `components/sections/Nav.tsx`

- [ ] **Step 1: Create Nav.tsx**

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NAV_SECTIONS } from '@/lib/data';

export function Nav() {
  const [activeSection, setActiveSection] = useState('');
  const { scrollY } = useScroll();
  const backdropOpacity = useTransform(scrollY, [0, 80], [0, 1]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    NAV_SECTIONS.forEach((section) => {
      const el = document.getElementById(section.toLowerCase());
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(section.toLowerCase()); },
        { threshold: 0.3 },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 h-16">
      <motion.div
        className="absolute inset-0 bg-[var(--surface-navy)] backdrop-blur-md border-b border-[var(--border)]"
        style={{ opacity: backdropOpacity }}
      />
      <div className="relative max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
        <span className="font-semibold text-sm tracking-widest uppercase text-[var(--text)]">
          Griffin Mayer
        </span>
        <div className="hidden sm:flex items-center gap-1">
          {NAV_SECTIONS.map((section) => {
            const id = section.toLowerCase();
            const isActive = activeSection === id;
            return (
              <a
                key={section}
                href={`#${id}`}
                data-state={isActive ? 'active' : 'inactive'}
                className="relative px-3 py-1.5 text-sm transition-colors duration-200 text-[var(--text-muted)] data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold"
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-0 right-0 h-px bg-[var(--accent)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
                {section}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
```

- [ ] **Step 2: Commit**

```
git add components/sections/Nav.tsx
git commit -m "feat: add Nav with scroll-aware backdrop and layoutId active indicator"
```

---

## Task 13: Hero Section

**Files:**
- Create: `components/sections/Hero.tsx`

- [ ] **Step 1: Create Hero.tsx**

```tsx
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

        <h1 className="fluid-heading font-display font-bold text-[var(--text)] mb-6 overflow-hidden leading-tight">
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

      {/* Scroll indicator */}
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Hero.tsx
git commit -m "feat: add Hero with SplitText, gradient parallax, and scroll indicator"
```

---

## Task 14: Experience Section

**Files:**
- Create: `components/sections/Experience.tsx`

- [ ] **Step 1: Create Experience.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { Card } from '@/components/ui/card';
import { SectionHeading } from '@/components/ui/section-heading';
import { experience } from '@/lib/data';

export function Experience() {
  return (
    <section id="experience" className="py-24 px-6 scroll-mt-16 bg-[var(--base)]">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <SectionHeading>Employment Experience</SectionHeading>
        </RevealOnScroll>
        <div className="mt-12 space-y-5">
          {experience.map((job, i) => (
            <RevealOnScroll key={job.title + job.company} direction="up" delay={i * 0.1}>
              <motion.div
                className="group"
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <Card>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--accent)] transition-colors duration-200">
                        {job.title}
                      </h3>
                      <p className="text-sm font-medium text-[var(--accent)] mt-0.5">
                        {job.company} · {job.location}
                      </p>
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-mono shrink-0 mt-0.5">
                      {job.period}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {job.bullets.map((bullet) => (
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Experience.tsx
git commit -m "feat: add Experience section with staggered card reveals and group hover"
```

---

## Task 15: Education Section

**Files:**
- Create: `components/sections/Education.tsx`

- [ ] **Step 1: Create Education.tsx**

```tsx
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
                {/* @container lets the card adapt to its own width */}
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Education.tsx
git commit -m "feat: add Education section with @container responsive cards"
```

---

## Task 16: Activities Section

**Files:**
- Create: `components/sections/Activities.tsx`

- [ ] **Step 1: Create Activities.tsx**

```tsx
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Activities.tsx
git commit -m "feat: add Activities section with group hover cards"
```

---

## Task 17: Skills Section

**Files:**
- Create: `components/sections/Skills.tsx`

- [ ] **Step 1: Create Skills.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import { RevealOnScroll } from '@/components/motion/RevealOnScroll';
import { SectionHeading } from '@/components/ui/section-heading';
import { skills, interests, volunteer } from '@/lib/data';

export function Skills() {
  // Duplicate for seamless infinite loop — when x reaches -50%, it looks identical to 0%
  const marqueeItems = [...skills, ...skills];

  return (
    <section id="skills" className="py-24 px-6 scroll-mt-16 bg-[var(--surface)]">
      <div className="max-w-5xl mx-auto">
        <RevealOnScroll direction="up">
          <SectionHeading>Skills & Interests</SectionHeading>
        </RevealOnScroll>

        {/* Full-width skills marquee */}
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

        {/* Interests + Volunteer */}
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Skills.tsx
git commit -m "feat: add Skills section with infinite marquee and staggered reveals"
```

---

## Task 18: Contact Section

**Files:**
- Create: `components/sections/Contact.tsx`

- [ ] **Step 1: Create Contact.tsx**

```tsx
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
          <h2 className="text-3xl font-display font-bold text-[var(--text)] mb-4">
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
```

- [ ] **Step 2: Commit**

```
git add components/sections/Contact.tsx
git commit -m "feat: add Contact section with magnetic links and cursor expansion"
```

---

## Task 19: Update layout.tsx

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace layout.tsx**

```tsx
import type { Metadata } from 'next';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import './globals.css';
import { CursorProvider } from '@/components/motion/AnimatedCursor';
import { PageTransition } from '@/components/motion/PageTransition';

const geistSans = Geist({ variable: '--font-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-mono', subsets: ['latin'] });
const playfair = Playfair_Display({ variable: '--font-display', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Griffin Mayer',
  description:
    'Finance student at Dalhousie University — wealth management, business analysis, and investment research.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[var(--base)] text-[var(--text)] antialiased">
        <CursorProvider>
          <PageTransition>{children}</PageTransition>
          {/* Grain overlay — fixed SVG noise texture at 4% opacity */}
          <div
            aria-hidden
            className="fixed inset-0 pointer-events-none z-[100]"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
              opacity: 0.04,
            }}
          />
        </CursorProvider>
      </body>
    </html>
  );
}
```

- [ ] **Step 2: Commit**

```
git add app/layout.tsx
git commit -m "feat: update layout with Playfair Display, CursorProvider, PageTransition, grain overlay"
```

---

## Task 20: Update page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace page.tsx with pure section composition**

```tsx
import { Nav } from '@/components/sections/Nav';
import { Hero } from '@/components/sections/Hero';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Activities } from '@/components/sections/Activities';
import { Skills } from '@/components/sections/Skills';
import { Contact } from '@/components/sections/Contact';

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Experience />
      <Education />
      <Activities />
      <Skills />
      <Contact />
    </main>
  );
}
```

- [ ] **Step 2: Commit**

```
git add app/page.tsx
git commit -m "feat: replace page.tsx with pure section composition"
```

---

## Task 21: Remove Shadcn Remnants

**Files:**
- Delete: `components/ui/dialog.tsx`
- Delete: `components/ui/input.tsx`
- Delete: `components.json`

- [ ] **Step 1: Delete unused shadcn files**

```
rm components/ui/dialog.tsx components/ui/input.tsx components.json
```

- [ ] **Step 2: Uninstall unused shadcn packages**

```
npm uninstall radix-ui shadcn tw-animate-css class-variance-authority
```

These are no longer imported anywhere after the rewrite. `framer-motion`, `clsx`, `tailwind-merge`, and `lucide-react` stay.

- [ ] **Step 3: Commit**

```
git add -A
git commit -m "chore: remove shadcn components and unused dependencies"
```

---

## Task 22: Build Verification

- [ ] **Step 1: Run TypeScript type-check**

```
npx tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 2: Run production build**

```
npm run build
```

Expected: Build completes successfully. Note any warnings (not errors) about bundle size or unused packages — these are acceptable.

- [ ] **Step 3: Start dev server and visually verify**

```
npm run dev
```

Open `http://localhost:3000` and verify:
- Dark background renders immediately (no flash of white)
- Nav is transparent at top, gains frosted glass on scroll
- Hero h1 "Griffin Mayer" chars animate in on load
- Custom cursor appears (dot + ring, mix-blend-mode difference)
- Scroll down: sections reveal with directional fade
- Experience/Activity cards: hover lifts and scales, bullet dashes translate right
- Skills section: gold-outlined tags scroll in infinite marquee
- Contact links: MagneticButton pull effect on hover
- Active nav indicator slides between links as sections scroll into view

- [ ] **Step 4: Commit final state if any tweaks were made**

```
git add -A
git commit -m "fix: post-build visual tweaks"
```
