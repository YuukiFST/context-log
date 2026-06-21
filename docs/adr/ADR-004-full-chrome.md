# Full IDE Chrome from v1

**Context:** SPEC Section 13 (Roadmap) defers multi-tab support, sidebar resize, and minimap to v2. However, the IDE metaphor is the core identity of the blog. Shipping with a single tab, fixed sidebar, and no minimap breaks the illusion.

**Decision:**
- Minimap: Implemented as a thin scrollable strip on the right edge of the document area (not the full VS Code minimap — just a scroll-position indicator with syntax highlighting hints)
- Multi-tab: Tab bar supports multiple open files with close buttons. Active tab tracked in zustand store. MVP shows 1-2 tabs (README + current post), architecture supports N tabs.
- Sidebar resize: Drag handle on the right edge of sidebar, updates width in zustand store, persisted in localStorage.

**Invariants:**
- Minimap must not be a canvas/WebGL (CSS-based, lightweight)
- Tab bar must gracefully handle zero tabs (show nothing or a "no file open" state)
- Sidebar width must have min 180px and max 400px constraints
- Sidebar width must persist across sessions (localStorage)
- All three features must work with both light and dark themes

**Consequences if violated:** Without tabs, navigating between posts closes the previous view (no back-navigation muscle memory). Without sidebar resize, users on narrow desktops lose content space. Without minimap, the IDE feel is incomplete.

**File references:** `components/shell/tab-bar.tsx`, `components/shell/sidebar.tsx`, `components/shell/minimap.tsx`, `lib/store.ts`
