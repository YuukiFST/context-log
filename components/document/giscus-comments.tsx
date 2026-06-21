'use client'

import Giscus from '@giscus/react'
import { useStore } from '@/lib/store'

interface GiscusCommentsProps {
  category: string
  slug: string
}

export function GiscusComments(_props: GiscusCommentsProps) {
  const theme = useStore((s) => s.theme)

  return (
    <div className="giscus-wrapper" style={{ marginTop: 64, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
      <Giscus
        id="comments"
        repo="YuukiFST/context-log"
        repoId="R_kgDOTA-Vnw"
        category="Announcements"
        categoryId="DIC_kwDOTA-Vn84C_mhE"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="bottom"
        theme={theme === 'dark' ? 'dark_tritanopia' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  )
}
