# Static Site Generation for All Content Pages

**Context:** The blog has no dynamic data at request time. Content is MDX files versioned in Git. No user sessions, no databases, no API layer. SPEC Section 2 confirms no runtime API dependencies.

**Decision:**
- All content pages use `generateStaticParams` + SSG at build time
- `generateStaticParams` reads the virtual FS (`lib/virtual-fs.ts`) to discover all content paths
- Content MDX is read and parsed at build time in `lib/content.ts`
- No ISR, no `revalidate`, no `dynamicParams` — purely static export compatible
- Route handlers for RSS feeds are also static (`export const dynamic = 'force-static'`)

**Invariants:**
- Every content page must have a corresponding static path generated at build
- No `cookies()`, `headers()`, or `searchParams` that would force dynamic rendering
- `date-fns` formatting must happen at build time (RSC), not client

**Consequences if violated:** Pages would need server runtime, breaking zero-cost hosting. ISR adds complexity with no benefit for Git-versioned content.

**File references:** `lib/content.ts`, `lib/virtual-fs.ts`, `app/[category]/[slug]/page.tsx`
