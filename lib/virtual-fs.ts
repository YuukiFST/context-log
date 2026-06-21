import { categories } from './categories'

export interface VFSEntry {
  name: string
  type: 'directory' | 'file'
  children?: VFSEntry[]
  slug?: string
}

export function buildTree(language: 'pt' | 'en'): VFSEntry[] {
  return categories.map((cat) => ({
    name: cat.id,
    label: language === 'pt' ? cat.label : cat.labelEn,
    type: 'directory' as const,
    children: [],
  }))
}

export function resolvePath(path: string): string[] {
  const parts = path.split('/').filter(Boolean)
  return parts
}

export function isRoot(path: string): boolean {
  return path === '/' || path === ''
}

export function parentPath(path: string): string {
  if (isRoot(path)) return '/'
  const parts = resolvePath(path)
  parts.pop()
  return '/' + parts.join('/')
}

export function joinPaths(...paths: string[]): string {
  return paths
    .join('/')
    .replace(/\/+/g, '/')
    .replace(/\/$/, '') || '/'
}
