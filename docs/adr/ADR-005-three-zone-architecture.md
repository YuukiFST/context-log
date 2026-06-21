# Three-Zone Component Architecture

**Context:** SPEC Section 3.1 divides the UI into Chrome, Document, and Terminal zones. Each has different visual treatment (colors, typography, animation complexity) and different performance constraints.

**Decision:**
- Three top-level component groups, never mixed:
  - `components/shell/` — Chrome (title bar, activity bar, sidebar, tab bar, breadcrumbs, status bar, minimap). Only CSS transitions, no 3D, no WebGL.
  - `components/document/` — Document area (frontmatter block, category icon, benchmark card, verdict box, lightbox). CSS 3D transforms allowed, motion/GSAP animations, R3F canvas only on home page.
  - `components/three/` — WebGL components (hero scene). Maximum 1 canvas per page, lazy-loaded via `next/dynamic`.
- Zustand store (`lib/store.ts`) is the only bridge between zones (terminal ↔ sidebar sync, active file tracking)
- Chrome components never import from `components/document/` or `components/three/`
- Document components never import from `components/shell/` (except through the store)

**Invariants:**
- `components/shell/` must never import from `components/document/` or `components/three/`
- Maximum 1 R3F canvas per page
- R3F components must be lazy-loaded (`next/dynamic`, `ssr: false`)
- Chrome components use only CSS transitions — no GSAP, no motion `whileInView`

**Consequences if violated:** Animation-heavy code in Chrome components would cause jank on sidebar interactions. Cross-zone imports would create circular dependencies and make the component tree hard to reason about.

**File references:** `components/shell/*`, `components/document/*`, `components/three/*`, `lib/store.ts`
