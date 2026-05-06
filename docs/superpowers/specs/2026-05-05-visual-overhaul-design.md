# Visual Overhaul Design — Griffin Mayer Personal Site
**Date:** 2026-05-05
**Status:** Approved

---

## Summary

Full visual and animation overhaul of griffinmayer.com. Big-bang rewrite: remove shadcn entirely, build a custom motion component library with Framer Motion, evolve the existing Navy + Gold brand into a dark-base design system, and apply scroll-driven animations across all sections. The site remains a single-page finance resume — the aesthetic shifts from "template" to "premium handcrafted" while keeping the professional finance identity intact.

---

## Decisions Made

| Decision | Choice | Reason |
|---|---|---|
| Color system | Evolve Navy + Gold into dark base | Preserves finance identity; Gold works as vivid accent on dark |
| UI library | Full shadcn removal | Clean motion control; custom components replace Card + Button |
| Display font | Playfair Display | Editorial, sophisticated; pairs with finance/wealth aesthetic |
| Body font | Geist Sans (existing) | Already installed, clean geometric |
| Rewrite strategy | Big Bang (all at once) | Single coherent pass; site is not in active production |
| Accent color | Gold (#c9a84c) | Existing brand, warm against dark backgrounds |

---

## Architecture

### File Structure

```
app/
  globals.css           ← design tokens, @layer utilities, grain overlay
  layout.tsx            ← fonts, <AnimatedCursor>, <PageTransition> wrapper
  page.tsx              ← pure section composition (~50 lines, no logic)

components/
  motion/
    SplitText.tsx
    MagneticButton.tsx
    RevealOnScroll.tsx
    ParallaxSection.tsx
    AnimatedCursor.tsx
    PageTransition.tsx

  sections/
    Hero.tsx
    Nav.tsx
    Experience.tsx
    Education.tsx
    Activities.tsx
    Skills.tsx
    Contact.tsx

  ui/
    Card.tsx            ← custom replacement for shadcn Card
    Button.tsx          ← custom replacement for shadcn Button

lib/
  data.ts               ← all content arrays (experience, education, activities, skills)
```

### Data Flow

- `lib/data.ts` is the single source of truth for all resume content.
- Section components are pure — they receive no props, import from `lib/data.ts` directly.
- `CursorContext` (exported from `AnimatedCursor.tsx`) is provided in `layout.tsx`; any component calls `useCursor()` to set cursor state.
- Nav active-section state is managed via `IntersectionObserver` inside `Nav.tsx`, written to a `data-[state]` attribute on each nav link.

---

## Design Tokens

Defined in `@layer base` in `globals.css`, consumed via Tailwind `var()` arbitrary values everywhere. No hardcoded hex in any component.

```css
@layer base {
  :root {
    --base:          #0d0d0f;   /* near-black page background */
    --surface:       #111827;   /* card/section backgrounds */
    --surface-navy:  #1a2744;   /* hero, contact, elevated surfaces */
    --accent:        #c9a84c;   /* gold — primary vivid accent */
    --accent-dim:    #a07c34;   /* gold at ~70% for secondary use */
    --text:          #f0ece4;   /* warm off-white — headings, primary */
    --text-muted:    #8a8070;   /* body copy, descriptions, periods */
    --border:        #ffffff14; /* subtle white at 8% for borders */
    --grain-opacity: 0.04;      /* SVG noise overlay intensity */
  }
}
```

**Tailwind consumption pattern:**
- `bg-[var(--base)]` — page background
- `bg-[var(--surface-navy)]` — hero, contact
- `bg-[var(--surface)]` — cards
- `text-[var(--accent)]` — gold labels, markers, active nav
- `text-[var(--text)]` — headings
- `text-[var(--text-muted)]` — body copy
- `border-[var(--border)]` — card borders

---

## Typography

| Role | Font | Usage |
|---|---|---|
| Display | Playfair Display | `h1`, `h2`, section headings |
| Body | Geist Sans | Nav, body text, UI |
| Mono | Geist Mono | Skill tags, labels, period strings |

Loaded via `next/font/google` in `layout.tsx`. CSS variables `--font-display`, `--font-sans`, `--font-mono` registered in `@theme inline` in `globals.css`.

Fluid sizing via `@layer utilities`:
- `.fluid-heading` — `clamp(3rem, 8vw, 5rem)` for hero h1
- `.fluid-body` — `clamp(0.875rem, 1.5vw, 1rem)` for body text

---

## Motion Component Library

### `<SplitText>`

```
Props: children (string), className?, delay? (default 0)
```

Splits string into `<motion.span>` per character. Parent `motion.div` uses `staggerChildren: 0.03`. Default variant: `{ hidden: { y: 80, opacity: 0 }, visible: { y: 0, opacity: 1 } }`. Transition: spring `{ stiffness: 60, damping: 20 }`. Used only in Hero `h1`.

### `<MagneticButton>`

```
Props: children, className?
```

Tracks mouse offset relative to element center via `useRef` + `onMouseMove`. Applies `useSpring` (stiffness: 200, damping: 20) to `x`/`y` `useMotionValue`s on a wrapping `motion.div`. Resets to `{ x: 0, y: 0 }` on `onMouseLeave`. Renders any children — no opinion on inner element type.

### `<RevealOnScroll>`

```
Props: children, direction ('up'|'down'|'left'|'right'), delay (default 0), distance (default 40)
```

`useInView` with `once: true`, threshold `0.15`. `motion.div` transitions from `{ opacity: 0, [axis]: distance }` to `{ opacity: 1, [axis]: 0 }` when in view. Transition: `{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1], delay }`.

### `<ParallaxSection>`

```
Props: children, speed (0–1, default 0.3), className?
```

`useRef` + `useScroll({ target })` + `useTransform` maps scroll progress `[0, 1]` to `translateY` `["-speed*100px", "speed*100px"]` on a background `div`. Content renders in `relative z-10` above it.

### `<AnimatedCursor>`

Two-layer cursor: 8px snappy dot (raw `useMotionValue`) + 32px ring (spring: stiffness 150, damping 15). Both `position: fixed`, `pointer-events: none`, `z-index: 9999`. `mix-blend-mode: difference`. Reads `CursorContext` — ring scales to `2` on hover state. `CursorContext` provides `{ setCursorState: (state: 'default' | 'hover') => void }`. Exported from this file; provided in `layout.tsx`.

### `<PageTransition>`

Wraps children in `<AnimatePresence mode="wait">` + `motion.div`. Enter: `{ opacity: 0, y: 20 } → { opacity: 1, y: 0 }` over 0.4s `ease: [0.25, 0.1, 0.25, 1]`. Exit: `{ opacity: 1, y: 0 } → { opacity: 0, y: -10 }` over 0.2s. Single-page for now; structure is multi-route ready.

---

## Section Motion Design

### Nav

- `useScroll` → `scrollY` motionValue → `useTransform(scrollY, [0, 80], [0, 1])` feeds backdrop opacity.
- At scroll 0: transparent. At 80px: `bg-[var(--surface-navy)]/80 backdrop-blur-md border-b border-[var(--border)]`.
- Active link: `layoutId="nav-indicator"` underline `motion.div` slides between links.
- Active section tracked by `IntersectionObserver`, written to `data-[state=active]` on link elements.

### Hero

- `h1` ("Griffin Mayer"): `<SplitText>` — chars spring up from `y: 80, opacity: 0`, staggered at `0.03s`.
- Tagline: `<RevealOnScroll direction="up" delay={0.6}>`.
- Body + CTAs: `<RevealOnScroll direction="up" delay={0.8}>`.
- Background: `mousemove` drives `--mouse-x`/`--mouse-y` CSS variables → radial gradient mesh parallax shift.
- Scroll indicator: `animate={{ y: [0, 10, 0] }}`, `repeat: Infinity`, `duration: 1.6s`, `ease: "easeInOut"`.

### Experience / Activities Cards

- Grid: `<RevealOnScroll>` per card, `delay={index * 0.1}`.
- Card hover: `whileHover={{ y: -6, scale: 1.015 }}`, spring `{ stiffness: 300, damping: 20 }`.
- Bullet dash marker (`—`): `group-hover:translate-x-1 transition-transform duration-200`.
- Job title: `group-hover:text-[var(--accent)]`.
- Faint gold left-border: `opacity-0 group-hover:opacity-100 transition-opacity`.

### Education Cards

- Same `<RevealOnScroll>` stagger pattern as Experience.
- `@container` queries inside each card: degree/period layout adapts to card width independently of viewport.

### Skills Section

- Horizontal marquee: `motion.div` `animate={{ x: ["0%", "-50%"] }}`, `repeat: Infinity`, `ease: "linear"`, `duration: 18s`. Skill list duplicated in DOM for seamless loop. `.no-scrollbar` applied.
- Interests + Volunteer: `<RevealOnScroll direction="left">`.

### Contact

- Heading + items: `<RevealOnScroll>` staggered by index.
- Email/LinkedIn links: `useCursor()` call → cursor ring expands on hover.
- CTA buttons: wrapped in `<MagneticButton>`.

---

## Tailwind Advanced Patterns

### `@layer utilities`

```css
@layer utilities {
  .text-balance    { text-wrap: balance; }
  .no-scrollbar    { scrollbar-width: none; }
  .no-scrollbar::-webkit-scrollbar { display: none; }
  .fluid-heading   { font-size: clamp(3rem, 8vw, 5rem); }
  .fluid-body      { font-size: clamp(0.875rem, 1.5vw, 1rem); }
}
```

Grain overlay applied as a fixed `div` in `layout.tsx` (not a pseudo-element — React doesn't render `::after` on `<body>`):
```html
<div class="fixed inset-0 pointer-events-none z-[100] opacity-[var(--grain-opacity)]"
     style={{ backgroundImage: "url('data:image/svg+xml;...')" }} />
```

### `group` / `peer` — Compound Card Hover

`group` on card wrapper. Inner elements use:
- `group-hover:text-[var(--accent)]` — job title
- `group-hover:translate-x-1` — dash markers
- `group-hover:opacity-100` — gold border accent

### `data-[state]` — Nav Active State

Nav links: `data-[state=active]:text-[var(--accent)] data-[state=active]:font-semibold`. `state` attribute toggled by `IntersectionObserver` in `Nav.tsx`.

### `@container` — Education Cards

Education cards: wrapper gets `@container`, inner layout uses `@md:flex-row`. Adapts to card's own width, not viewport.

### Backdrop + Opacity Modifier

Nav: `bg-[var(--surface-navy)]/80 backdrop-blur-md` — Tailwind v4 native opacity modifier, no custom class needed.

---

## Dependencies

All already installed. No new packages required:
- `framer-motion: ^12.38.0` ✓
- `tailwindcss: ^4` ✓
- `next/font/google` (built-in) ✓ — add `Playfair_Display` import

---

## Out of Scope

- Multiple routes / true page transitions (architecture is ready, not implemented)
- Dark mode toggle (always dark)
- Contact form (remains mailto/tel links)
- Analytics or performance monitoring
