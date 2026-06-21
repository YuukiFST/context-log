# Prototype: IDE Layout (UI v2)

**Question:** Como o layout IDE (Chrome + Documento + Terminal) deve se comportar visualmente?

## Variants

| # | Name | Structure | Inspiration |
|---|------|-----------|-------------|
| A | VSCode Classic | Activity bar + Sidebar (esq), Terminal (bottom), Status bar — **primary** | Spec Sec 3.4 |
| B | Zed Minimal | Sidebar overlay, Terminal floating drawer | Zed |
| C | Terminal-Centric | Terminal always visible (split), Sidebar (dir) | Ghostty |

## v1 → v2 improvements (based on user feedback "fraco, simples demais")

- **Color**: Replaced generic purple accent with warm ember red (`oklch(0.489 0.190 28.3)`). Dark chrome bg, ember glow in terminal.
- **Typography**: Inter for chrome, EB Garamond for doc body, JetBrains Mono for code/terminal. Proper `text-wrap: balance`, clamp scales.
- **Chrome detail**: macOS dots, realistic activity bar icons, better sidebar indentation, tab close buttons, hover states on everything.
- **Document**: Frontmatter YAML block (collapsible), CategoryIcon 3D cube with CSS transforms, BenchmarkCard with chart + tilt, VerdictBox with stamp + color coding.
- **Terminal**: Glow/phosphor effect on prompt text, typewriter cursor, scanline overlay, 3 tabs (bash/output/problems).
- **Micro-interactions**: `:active` scale on clickable, staggered hover transitions, easing curves (`cubic-bezier(0.23,1,0.32,1)`).
- **Accessibility**: `prefers-reduced-motion: reduce` kills all animations.
- **Responsive**: Mobile hides activity bar, sidebar, collapses breadcrumbs.

## Feedback (13 Jun 2026)

Usuario: "Var C esta praticamente perfeita, unica coisa que tem que mudar para ficar 100% eh a side bar ficar do lado esquerdo"

Acao: Movida sidebar para a esquerda (entre activity bar e coluna de conteudo). Layout final: Activity bar | Sidebar | Content (document + terminal).

## Verdict

(preencher apos avaliacao — qual layout seguir, ou hibrido)
