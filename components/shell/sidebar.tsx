'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useContentRegistry } from '@/lib/content-registry'
import { categories } from '@/lib/categories'

export function Sidebar() {
  const pathname = usePathname()
  const {
    expandedFolders,
    toggleFolder,
    sidebarWidth,
    setSidebarWidth,
    language,
  } = useStore()
  const [isResizing, setIsResizing] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const registry = useContentRegistry()

  const onMouseDown = useCallback(() => setIsResizing(true), [])
  const onMouseUp = useCallback(() => setIsResizing(false), [])
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return
      const newWidth = Math.min(400, Math.max(180, e.clientX))
      setSidebarWidth(newWidth)
    },
    [isResizing, setSidebarWidth]
  )

  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      return () => {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    }
  }, [isResizing, onMouseMove, onMouseUp])

  const isActive = (catId: string, slug?: string) => {
    if (slug) return pathname === `/${catId}/${slug}`
    return pathname === `/${catId}`
  }

  return (
    <div className="sidebar" ref={sidebarRef} style={{ width: sidebarWidth }}>
      <div className="sidebar-header">
        <span>EXPLORER</span>
      </div>
      <div className="sidebar-tree">
        {categories.map((cat) => {
          const isOpen = expandedFolders[cat.id] ?? false
          const entry = registry.categories.find((c) => c.id === cat.id)
          const posts = entry?.posts || []
          return (
            <div key={cat.id} className="tree-folder">
              <div
                className="tree-folder-header"
                onClick={() => toggleFolder(cat.id)}
              >
                <span className={`arrow ${isOpen ? 'open' : ''}`}>▶</span>
                <span className="folder-icon">
                  {isOpen ? '📂' : '📁'}
                </span>
                <span className="folder-name">
                  {language === 'pt' ? cat.label : cat.labelEn}
                </span>
              </div>
              {isOpen && (
                <div className="tree-folder-contents">
                  {posts.length === 0 ? (
                    <div className="tree-file empty-folder">(vazio)</div>
                  ) : (
                    posts.map((slug) => (
                      <Link
                        key={slug}
                        href={`/${cat.id}/${slug}`}
                        className={`tree-file ${isActive(cat.id, slug) ? 'active' : ''}`}
                      >
                        <span className="file-icon">📄</span>
                        <span className="file-name">{slug}.mdx</span>
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
      <div className="sidebar-resize-handle" onMouseDown={onMouseDown} />
    </div>
  )
}
