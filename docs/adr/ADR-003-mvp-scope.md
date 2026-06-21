# MVP Ships with 2-3 Content Categories

**Context:** SPEC Section 4.1 lists 5 categories. The prototype shows 5 with mock data. Shipping a full taxonomical structure before any real content exists adds maintenance overhead.

**Decision:**
- MVP launches with 3 categories: `frontier-models`, `chinese-models`, `benchmarks`
- `cost-performance` and `tools-agents` remain defined in `lib/categories.ts` but content folders are added post-launch
- The sidebar shows all 5 categories always (empty folders display "(vazio)" as in prototype)
- Category shapes for all 5 are implemented in `CategoryIcon` — no need to retrofit later

**Invariants:**
- Adding a new category post-launch must not require code changes beyond creating the content folder
- Empty categories must render gracefully in sidebar (show "(vazio)" or similar)
- `lib/categories.ts` is the single source of truth for category metadata

**Consequences if violated:** Empty categories showing errors or crashing the sidebar. Adding content would require code deploys instead of just Git pushes.

**File references:** `lib/categories.ts`, `lib/content.ts`, `components/shell/sidebar.tsx`
