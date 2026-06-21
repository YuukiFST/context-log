'use client'

import { useEffect } from 'react'
import { useStore } from '@/lib/store'
import { TitleBar } from '@/components/shell/title-bar'
import { ActivityBar } from '@/components/shell/activity-bar'
import { Sidebar } from '@/components/shell/sidebar'
import { TabBar } from '@/components/shell/tab-bar'
import { TabManager } from '@/components/shell/tab-manager'
import { Breadcrumbs } from '@/components/shell/breadcrumbs'
import { Terminal } from '@/components/shell/terminal'
import { StatusBar } from '@/components/shell/status-bar'
import { Minimap } from '@/components/shell/minimap'

export function Shell({ children }: { children: React.ReactNode }) {
  const theme = useStore((s) => s.theme)

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])

  return (
    <div className="app">
      <TitleBar />
      <TabManager />
      <div className="app-main">
        <ActivityBar />
        <Sidebar />
        <div className="content-col">
          <TabBar />
          <Breadcrumbs />
          <div className="doc-col">
            <div className="document-area">
              <div className="document-content">
                {children}
              </div>
              <Minimap />
            </div>
            <Terminal />
          </div>
        </div>
      </div>
      <StatusBar />
    </div>
  )
}
