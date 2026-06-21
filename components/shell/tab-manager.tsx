'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'

export function TabManager() {
  const pathname = usePathname()
  const openTab = useStore((s) => s.openTab)

  useEffect(() => {
    const parts = pathname.split('/').filter(Boolean)
    if (parts.length === 0) {
      openTab({ id: 'README', label: 'README.md', isReadme: true })
    } else if (parts.length === 2) {
      const [category, slug] = parts
      openTab({
        id: `${category}/${slug}`,
        label: `${slug}.pt.mdx`,
        category,
        slug,
      })
    }
  }, [pathname, openTab])

  return null
}
