'use client'

import { useEffect, useRef, useState } from 'react'
import { useStore } from '@/lib/store'

export function Minimap() {
  const { readingProgress, setReadingProgress } = useStore()
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollHeight, setScrollHeight] = useState(0)

  useEffect(() => {
    const doc = document.querySelector('.document-area')
    if (!doc) return

    const onScroll = () => {
      const { scrollTop, scrollHeight: sh, clientHeight } = doc
      setScrollHeight(sh)
      const progress = scrollHeight > clientHeight ? (scrollTop / (scrollHeight - clientHeight)) * 100 : 0
      setReadingProgress(progress)
    }

    doc.addEventListener('scroll', onScroll)
    return () => doc.removeEventListener('scroll', onScroll)
  }, [setReadingProgress])

  const thumbHeight = Math.max(20, (100 / (scrollHeight || 1)) * 100)
  const thumbTop = (readingProgress / 100) * (100 - thumbHeight)

  return (
    <div className="minimap" ref={containerRef}>
      <div
        className="minimap-thumb"
        style={{
          top: `${thumbTop}%`,
          height: `${thumbHeight}%`,
        }}
      />
    </div>
  )
}
