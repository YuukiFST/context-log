# Terminal-Centric Layout with Adaptive Mobile Behavior

**Context:** Variant C (Terminal-Centric) was chosen as the layout direction. The terminal is the distinctive feature and should feel like a first-class pane, not an afterthought. SPEC Section 3.4 describes a collapsible terminal; Variant C makes it always visible.

**Decision:**
- Desktop: Terminal is always visible as a bottom split (40% height), sharing vertical space with the document area via flex column. No collapse toggle needed.
- Mobile: Terminal opens as a fullscreen overlay (SPEC Section 3.5), with a close button.
- The zustand store manages terminal open/closed state (relevant only on mobile).

**Invariants:**
- Terminal must never overlap the document area on desktop (they share space in a flex column)
- Terminal must always have a minimum height of 160px on desktop
- Terminal overlay on mobile must have a visible close button

**Consequences if violated:** Layout breaks the "terminal-centric" design identity. Overlapping terminal would make document content inaccessible.

**File references:** `components/shell/terminal.tsx`, `lib/store.ts`
