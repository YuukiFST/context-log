'use client'

import Giscus from '@giscus/react'
import { useStore } from '@/lib/store'

interface GiscusCommentsProps {
  category: string
  slug: string
}

export function GiscusComments({ category, slug }: GiscusCommentsProps) {
  const theme = useStore((s) => s.theme)

  return (
    <div className="giscus-wrapper" style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
      <Giscus
        id="comments"
        repo="context-log/context-log"
        repoId=""
        category="Announcements"
        categoryId=""
        mapping="specific"
        term={`${category}/${slug}`}
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="pt"
        loading="lazy"
      />
    </div>
  )
}
