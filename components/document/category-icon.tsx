import { type Category } from '@/lib/categories'

const faceColors: Record<string, string> = {
  icosahedron: 'var(--accent)',
  torus: 'var(--accent)',
  octahedron: 'var(--accent)',
  dodecahedron: 'var(--accent)',
  cube: 'var(--accent)',
}

export function CategoryIcon({ category }: { category: Category }) {
  const color = faceColors[category.shape] || 'var(--accent)'
  const faces = getFaceCount(category.shape)

  return (
    <div className="doc-category-icon" style={{ '--shape-color': color } as React.CSSProperties}>
      <div className={`shape-3d shape-${category.shape}`}>
        {Array.from({ length: faces }, (_, i) => (
          <div key={i} className="shape-face" />
        ))}
      </div>
    </div>
  )
}

function getFaceCount(shape: string): number {
  switch (shape) {
    case 'icosahedron': return 6
    case 'torus': return 8
    case 'octahedron': return 8
    case 'dodecahedron': return 12
    case 'cube': return 6
    default: return 6
  }
}
