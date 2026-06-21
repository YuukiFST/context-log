'use client'

import { useStore } from '@/lib/store'

export function TitleBar() {
  const activeTab = useStore((s) =>
    s.activeTabId ? s.tabs.find((t) => t.id === s.activeTabId) : null
  )
  const label = activeTab
    ? `context.log — ${activeTab.label}`
    : 'context.log'

  return (
    <div className="title-bar">
      <div className="title-dots">
        <div className="title-dot red" />
        <div className="title-dot yellow" />
        <div className="title-dot green" />
      </div>
      <div className="title-label">
        {label} <span className="title-label-dim">— context.log</span>
      </div>
      <div className="title-search">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <span>Buscar por tag...</span>
        <span className="kbd">⌘K</span>
      </div>
    </div>
  )
}
