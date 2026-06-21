'use client'

import { useEffect, useRef, useState } from 'react'

interface VerdictBoxProps {
  verdict: 'positive' | 'mixed' | 'negative'
  children: React.ReactNode
}

const config = {
  positive: { icon: '✓', label: { pt: 'Recomendo', en: 'Recommended' }, color: '#27C93F' },
  mixed: { icon: '⚠', label: { pt: 'Com ressalvas', en: 'With caveats' }, color: '#D4A017' },
  negative: { icon: '✕', label: { pt: 'Não recomendo', en: 'Not recommended' }, color: '#D04040' },
}

export function VerdictBox({ verdict, children }: VerdictBoxProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const { icon, label, color } = config[verdict]

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} className={`verdict-box ${verdict}`}>
      <div className="verdict-header">
        <div
          className="verdict-stamp"
          style={{
            '--stamp-color': color,
            transform: visible ? 'scale(1) rotate(0deg)' : 'scale(0) rotate(-15deg)',
            transition: 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)',
          } as React.CSSProperties}
        >
          {icon}
        </div>
        <span>{label.pt}</span>
      </div>
      <div className="verdict-body">{children}</div>
    </div>
  )
}
