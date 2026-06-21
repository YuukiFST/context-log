'use client'

import { useStore } from '@/lib/store'
import { usePathname } from 'next/navigation'
import { getCategory } from '@/lib/categories'

export function StatusBar() {
  const pathname = usePathname()
  const { language, readingProgress, toggleTerminal } = useStore()
  const parts = pathname.split('/').filter(Boolean)

  const cat = parts[0] ? getCategory(parts[0]) : null
  const catLabel = cat ? (language === 'pt' ? cat.label : cat.labelEn) : ''

  return (
    <div className="status-bar">
      <div className="status-bar-progress" style={{ width: `${readingProgress}%` }} />
      {cat && (
        <div className="status-section">
          <span className="status-icon">⎇</span> {catLabel}
        </div>
      )}
      <div className="status-section">
        <span className="status-icon">●</span> {language}
      </div>
      <div className="status-section">Markdown</div>
      <div className="status-spacer" />
      <div className="status-section">UTF-8</div>
      <div className="status-section">
        <button className="status-clickable" onClick={toggleTerminal} title="Toggle terminal">
          ⌨ Terminal
        </button>
      </div>
    </div>
  )
}
