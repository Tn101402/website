# Tech Spec - Portfolio 3D Book (Lê Anh Kiệt)

## Dependencies

### Core (pre-installed by init-webapp.sh)
- react, react-dom, typescript, vite, tailwindcss

### Animation
| Package | Version | Purpose |
|---------|---------|---------|
| framer-motion | ^11.0 | Component animations, gestures, AnimatePresence for page transitions, cursor tracking |
| gsap | ^3.12 | Landing sequence timeline (ScrollTrigger not needed - timeline-based, not scroll) |
| react-pageflip | ^2.0 | 3D book page flip engine (HTMLFlipBook) |

### Fonts
| Package | Version | Purpose |
|---------|---------|---------|
| @fontsource/playfair-display | ^5.0 | Heading font (H1, H2, cover titles, quotes) |
| @fontsource/inter | ^5.0 | Body text, labels, descriptions |
| @fontsource/poppins | ^5.0 | Button text |

### Icons
| Package | Version | Purpose |
|---------|---------|---------|
| lucide-react | ^0.400 | All UI icons (volume, social, award, trophy, mail, phone, etc.) |

### QR Code
| Package | Version | Purpose |
|---------|---------|---------|
| qrcode.react | ^3.1 | Generate QR code for Thank You page |

### Dev
| Package | Version | Purpose |
|---------|---------|---------|
| @types/react-pageflip | — | TypeScript types for react-pageflip |

---

## Component Inventory

### Layout
| Component | Source | Reuse |
|-----------|--------|-------|
| BookScene | Custom | Once — 3D CSS perspective container, book positioning, shadow |
| FlipBook | react-pageflip (HTMLFlipBook wrapper) | Once — main book with all pages as children |

### Pages (each rendered as a child of HTMLFlipBook)
| Component | Source | Notes |
|-----------|--------|-------|
| CoverPage | Custom | Leather texture, embossed gold text |
| AboutPage | Custom | Avatar, bio, contact grid |
| ProjectsPage | Custom | 2-col card grid, modal trigger |
| AchievementsPage | Custom | 2-col: timeline (left) + achievements/skills (right) |
| ThankYouPage | Custom | Thank you title, contact links, QR, signature |
| BackCoverPage | Custom | Quote on leather background |

### Reusable Components
| Component | Source | Used By |
|-----------|--------|---------|
| GradientButton | Custom | All pages (Next/Prev navigation) |
| GlassCard | Custom | ProjectsPage (×4), AchievementsPage (×2) |
| SkillBadge | Custom | AchievementsPage (×5) |
| TimelineItem | Custom | AchievementsPage (×2) |
| NavigationDots | Custom | All inner pages (bottom page indicator) |
| SoundToggle | Custom | App-level (fixed floating) |
| ImageModal | Custom | ProjectsPage (image lightbox) |

### Effects Components
| Component | Source | Notes |
|-----------|--------|-------|
| ParticleCanvas | Custom | Canvas 2D — background particle system, RAF loop |
| CustomCursor | Custom | Desktop only — lerp-smoothed, hover/click states |
| GlassOverlay | Custom | CSS radial gradient overlay behind book |
| LightSweep | Custom | Cover only — diagonal gradient sweep animation |

### Hooks
| Hook | Purpose |
|------|---------|
| useMousePosition | Track mouse coords with lerp interpolation for cursor smoothness |
| useBookState | Central book state: currentPage, isFlipping, isOpen, soundEnabled, orientation |
| useSound | Load/play page-flip sound, respects autoplay policy |
| useMediaQuery | Detect desktop/tablet/mobile breakpoints + orientation |

---

## Animation Implementation

| Animation | Library | Approach | Complexity |
|-----------|---------|----------|------------|
| Landing Sequence (6 phases) | GSAP Timeline | Single `gsap.timeline()` with labeled phases. Phase 1-2: CSS properties (opacity, scale, rotateX). Phase 4: backgroundPosition tween. Phase 5: rotateY tween. Phase 6: child stagger. `onComplete` enables flipbook interaction. | High |
| Light Sweep (Phase 4) | GSAP | Tween `backgroundPosition` from `"100% 0"` to `"-100% 0"` on a gradient overlay pseudo-element | Low |
| Cover Open (Phase 5) | GSAP | Tween `rotateY: 0 → -180deg` with `transformOrigin: "left center"` | Medium |
| Background Fade In (Phase 1) | GSAP | `opacity: 0 → 1` over 800ms | Low |
| Camera Zoom (Phase 2) | GSAP | `scale: 0.6 → 1`, `rotateX: 15 → 0`, `opacity: 0 → 1` in timeline | Low |
| Page Content Stagger (Phase 6) | GSAP | `stagger: 0.1s` on child elements with `y` and `opacity` | Low |
| Book Breathing | GSAP / CSS | CSS `keyframes` infinite loop: `scale(1) → scale(1.005) → scale(1)` over 4s. Triggered by GSAP `onComplete` of Phase 3, killed on Phase 5 start | Low |
| Page Flip | react-pageflip | Built-in. Config: `flippingTime: 800`, `drawShadow: true`. Listen to `onFlip` for sound trigger and state update | Low |
| Particle System | Canvas 2D API | Custom RAF loop. 60/30/15 particles based on breakpoint. Position update, connection lines (120px threshold), mouse repulsion (150px). Batch draw calls. Pause on `visibilitychange` | High |
| Custom Cursor | framer-motion | `motion.div` with `useMotionValue` + `useSpring` (or manual lerp in RAF). Outer ring + inner dot. Scale/color change on hover via CSS classes. Desktop only via `matchMedia('(hover:hover)')` | Medium |
| Avatar Glow | CSS | `@keyframes` pulse: `scale(1→1.05→1)`, `opacity(0.5→0.7→0.5)` over 3s infinite | Low |
| Avatar Tilt | framer-motion | `onMouseMove` handler calculates `rotateX/Y` from cursor position relative to avatar center. `motion.div` applies transform | Low |
| 3D Card Tilt | framer-motion | Same pattern as avatar tilt but on GlassCard. `perspective(600px)`, max 10deg rotation. Reset on `onMouseLeave` | Low |
| Ripple Button | Custom DOM | `onClick`: create `<span>` at click coordinates, CSS `@keyframes` expand circle + fade, remove after 600ms | Low |
| Page Entrance Staggers | GSAP | Each page's content animates in via `gsap.from()` with stagger when page becomes current. Triggered by `onFlip` callback | Medium |
| "THANK YOU" Letter Wave | GSAP | Split text into individual letters (wrap each in `<span>`), stagger `y: 20→0`, `opacity: 0→1` with 30ms delay per letter | Medium |
| Timeline Dot Pulse | CSS | `@keyframes dotPulse`: `scale(0→1.3→1)` triggered by IntersectionObserver or page visibility | Low |
| Skill Badge Pop-in | GSAP | `stagger: 0.05s`, `scale: 0→1`, `opacity: 0→1`, easing with overshoot `back.out(1.7)` | Low |
| Modal Open/Close | framer-motion | `AnimatePresence` + `motion.div`: scale `0.9→1`, opacity `0→1` (300ms). Overlay fade (200ms) | Low |
| Image Modal | framer-motion | Same as above + click-outside and Escape key handling | Low |
| Glass Overlay Fade | GSAP | Part of landing timeline: `opacity: 0→1` over 1000ms starting at 600ms | Low |
| Sound Toggle Hover | CSS | `transition` on background and box-shadow | Low |

---

## State & Logic Plan

### Book State Machine

```
[LOADING] ──► [LANDING] ──► [OPEN] ──► [READING] ──► [CLOSED]
```

- **LOADING**: Assets loading (fonts, images). Brief.
- **LANDING**: GSAP timeline playing (5s). User can skip. No flipbook interaction.
- **OPEN**: Landing complete. Book is open at Page 1. Flipbook interaction enabled.
- **READING**: User flipping through pages normally.
- **CLOSED**: Back cover visible (end of book).

### State: Landing vs Normal Mode

`isLandingComplete` (boolean, stored in `useBookState`):
- `false` → GSAP timeline controls all visuals. Skip button visible. `pointer-events: none` on flipbook.
- `true` → react-pageflip takes over. User can click/swipe/keyboard flip.

Session persistence via `sessionStorage`:
- Key: `bookLandingPlayed` — if `"true"`, skip landing, start directly at `OPEN` state with remembered page.

### Sound Architecture

Sound requires user interaction before playing (browser autoplay policy):
1. On first click/tap anywhere during landing: initialize Audio object, set volume to 0.15.
2. `useSound` hook exposes `play()` and `enabled` state.
3. Page flip callback (`onFlip`) triggers `play()` only if `enabled === true`.
4. SoundToggle component toggles `enabled` state (persisted to `localStorage`).

### Responsive Breakpoint System

`useMediaQuery` returns one of: `desktop` | `tablet` | `mobile`
- Drives: book dimensions (800×560 / 600×420 / 340×480), particle count (60/30/15), flipbook `usePortrait` (false/true/true), cursor visibility, 3D tilt availability.
- Also returns orientation for flipbook config updates.

### Page Visibility Tracking

The flipbook `onFlip` callback receives the new page index. This updates `currentPage` in state, which:
1. Triggers entrance animations for the newly visible page(s)
2. Updates NavigationDots active state
3. Plays flip sound (if enabled)

### Particle System: Imperative Canvas

ParticleCanvas runs entirely outside React's render cycle:
- Single RAF loop in `useEffect`
- Refs for particle positions, mouse position
- Canvas context stored in ref
- Resize handler debounced (200ms) recalculates canvas size
- Cleanup: cancel RAF, remove listeners
- Visibility API: pause RAF when `document.hidden === true`

### GSAP Timeline Lifecycle

- Created on mount in `useEffect`
- Plays automatically
- Skip: call `timeline.progress(1)` to jump to end
- Cleanup: `timeline.kill()` on unmount
- Landing only plays once per session (check `sessionStorage` first)

---

## Other Key Decisions

### No shadcn/ui components needed
This is a fully custom-designed portfolio book with unique glassmorphism cards, embossed text, and leather textures. Standard UI components (Button, Card, Dialog) would require more override work than building custom. All components are custom-built with Tailwind.

### react-pageflip over pure CSS/CSS flip
react-pageflip provides realistic page curvature, shadow during flip, corner grab areas, and swipe support out of the box. Re-implementing these with pure CSS would be extremely complex. The library's `HTMLFlipBook` accepts React children, fitting our architecture.

### Canvas 2D over WebGL/Three.js for particles
The particle system has only 60 max particles with simple 2D drift and line connections. Canvas 2D is sufficient and avoids the heavy Three.js dependency (~600KB). No 3D particle effects are required by design.

### Data stored as JSON file, not CMS/hardcoded
All portfolio data (projects, education, achievements, skills, contacts) lives in `src/data/portfolio.json`. Components import and map over this data. Easy to edit without touching component code.

### Page Flip Sound: generate at build time
The page-flip sound effect will be a short MP3 (~200ms paper rustle) included as a static asset in `public/sounds/`. No external sound API needed.

### Avatar: generate as image asset
The avatar will be an AI-generated image (see design Assets section) placed in `public/images/`. Not a live-rendered component.
