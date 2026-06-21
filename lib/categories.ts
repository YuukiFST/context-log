export interface Category {
  id: string
  label: string
  labelEn: string
  icon: string
  shape: 'icosahedron' | 'torus' | 'octahedron' | 'dodecahedron' | 'cube'
}

export const categories: Category[] = [
  {
    id: 'frontier-models',
    label: 'Frontier Models',
    labelEn: 'Frontier Models',
    icon: '◇',
    shape: 'icosahedron',
  },
  {
    id: 'chinese-models',
    label: 'Modelos Chineses',
    labelEn: 'Chinese Models',
    icon: '○',
    shape: 'torus',
  },
  {
    id: 'benchmarks',
    label: 'Benchmarks',
    labelEn: 'Benchmarks',
    icon: '⬡',
    shape: 'octahedron',
  },
  {
    id: 'cost-performance',
    label: 'Custo & Performance',
    labelEn: 'Cost & Performance',
    icon: '⬠',
    shape: 'dodecahedron',
  },
  {
    id: 'tools-agents',
    label: 'Ferramentas & Agentes',
    labelEn: 'Tools & Agents',
    icon: '□',
    shape: 'cube',
  },
]

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getShapeFaces(shape: Category['shape']): number {
  switch (shape) {
    case 'icosahedron': return 20
    case 'torus': return 8
    case 'octahedron': return 8
    case 'dodecahedron': return 12
    case 'cube': return 6
  }
}
