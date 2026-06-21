'use client'

import Link from 'next/link'
import { useStore } from '@/lib/store'

export function TabBar() {
  const { tabs, activeTabId, setActiveTab, closeTab } = useStore()

  if (tabs.length === 0) return null

  return (
    <div className="tab-bar">
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={`tab-item ${tab.id === activeTabId ? 'active' : ''}`}
          onClick={() => setActiveTab(tab.id)}
        >
          <span className="tab-icon">{tab.isReadme ? '📝' : '◇'}</span>
          <span className="tab-label">{tab.label}</span>
          <span
            className="tab-close"
            onClick={(e) => {
              e.stopPropagation()
              closeTab(tab.id)
            }}
          >
            ✕
          </span>
        </div>
      ))}
    </div>
  )
}
