# Master PRD: context.log

## Design Reference

**Prototype:** `prototypes/ide-layout.html?variant=C&theme=dark`
**Variant C** — Terminal-Centric layout, sidebar on left (moved per user feedback).

## ADRs

1. `docs/adr/ADR-001-terminal-layout.md` — Terminal always visible in desktop split
2. `docs/adr/ADR-002-static-generation.md` — SSG for all content
3. `docs/adr/ADR-003-mvp-scope.md` — MVP ships with 3 categories
4. `docs/adr/ADR-004-full-chrome.md` — Minimap, multi-tab, sidebar resize in v1
5. `docs/adr/ADR-005-three-zone-architecture.md` — Strict zone separation

## Implementation Phases

### Phase 1: Project Scaffold
- [x] Initialize Next.js with App Router + TypeScript strict
- [x] Install deps: tailwindcss, shadcn/ui, zustand, date-fns, motion, zod
- [x] Install dev deps: GSAP, @react-three/fiber, @react-three/drei
- [x] Configure tailwind with CSS custom properties for light/dark themes (SPEC 3.2)
- [x] Create `lib/store.ts` — zustand store for shared state
- [x] Create `lib/categories.ts` — category metadata
- [x] Create `lib/virtual-fs.ts` — virtual FS abstraction
- [x] Create `lib/content.ts` — MDX reading/parsing
- [x] Create `lib/schemas.ts` — zod schemas for frontmatter

### Phase 2: Chrome Shell
- [x] Title bar (macOS dots, file label, command palette search)
- [x] Activity bar (explorer, tags, about, theme toggle, lang, github, rss)
- [x] Sidebar (file tree with expand/collapse, drag resize, empty folder state)
- [x] Tab bar (multi-tab support, close buttons, active indicator)
- [x] Breadcrumbs (clickable segments, lang toggle PT/EN)
- [x] Status bar (category, lang, reading time, reading progress, terminal toggle)
- [x] Minimap (scroll-position indicator on right edge)
- [x] Theme system (light/dark with CSS custom properties)

### Phase 3: Document Area
- [x] Frontmatter block (collapsible YAML block, JetBrains Mono)
- [x] CategoryIcon (CSS 3D rotating shape per category)
- [x] Post content (EB Garamond typography, scroll reveals via motion)
- [x] BenchmarkCard (image+text side-by-side, CSS 3D tilt on hover, lightbox)
- [x] VerdictBox (stamp icon with color coding, stamp animation)
- [x] Lightbox (native `<dialog>`, zoom transition, backdrop blur)
- [x] MDX rendering pipeline (frontmatter validation, component mapping)

### Phase 4: Terminal
- [x] Terminal panel (always visible on desktop, 40% split)
- [x] Command parsing: ls, cd, cat/open, pwd, clear, help
- [x] Virtual FS integration (bidirectional sync with sidebar via zustand)
- [x] Typewriter effect on command output
- [x] Blinking cursor with glow
- [x] Scanlines overlay
- [x] Mobile: fullscreen overlay with close button

### Phase 5: Content & Pages
- [x] Homepage (`/`) — README.md display + R3F hero scene
- [x] Category pages (`/[category]`) — directory listing
- [x] Post pages (`/[category]/[slug]`) — full document layout
- [x] Tag pages (`/tags/[tag]`) — cross-category filtering
- [x] RSS feeds (`/feed/pt.xml`, `/feed/en.xml`)
- [x] sitemap.xml + robots.txt
- [x] Open Graph images via `@vercel/og`
- [x] giscus comments integration
- [x] Newsletter form
- [x] `@vercel/analytics`

### Phase 6: Dogfooding & E2E
- [x] Page rendering tests (all routes)
- [x] Terminal: ls, cd, cat, pwd, clear, help, error cases
- [x] Theme toggle (light/dark, persistence)
- [x] Sidebar: folder expand/collapse, item selection, resize
- [x] Tab bar: open tab, close tab
- [x] Lightbox open/close via dialog
- [x] Language toggle PT/EN
- [x] Responsive: mobile layout adaptation
- [x] Reduced motion: all animations disabled
- [x] Keyboard navigation: sidebar, terminal, lightbox
