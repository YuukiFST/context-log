'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Tab {
  id: string
  label: string
  category?: string
  slug?: string
  isReadme?: boolean
}

interface Store {
  theme: 'dark' | 'light'
  setTheme: (theme: 'dark' | 'light') => void
  toggleTheme: () => void

  language: 'pt' | 'en'
  setLanguage: (lang: 'pt' | 'en') => void
  toggleLanguage: () => void

  terminalOpen: boolean
  setTerminalOpen: (open: boolean) => void
  toggleTerminal: () => void

  terminalPath: string
  setTerminalPath: (path: string) => void

  sidebarWidth: number
  setSidebarWidth: (width: number) => void

  expandedFolders: Record<string, boolean>
  toggleFolder: (id: string) => void
  setFolderExpanded: (id: string, expanded: boolean) => void

  tabs: Tab[]
  activeTabId: string | null
  openTab: (tab: Tab) => void
  closeTab: (id: string) => void
  setActiveTab: (id: string) => void

  readingProgress: number
  setReadingProgress: (progress: number) => void
}

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      theme: 'dark',
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),

      language: 'pt',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => set((s) => ({ language: s.language === 'pt' ? 'en' : 'pt' })),

      terminalOpen: false,
      setTerminalOpen: (terminalOpen) => set({ terminalOpen }),
      toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),

      terminalPath: '/',
      setTerminalPath: (terminalPath) => set({ terminalPath }),

      sidebarWidth: 260,
      setSidebarWidth: (sidebarWidth) => set({ sidebarWidth }),

      expandedFolders: { 'frontier-models': true },
      toggleFolder: (id) =>
        set((s) => ({
          expandedFolders: { ...s.expandedFolders, [id]: !s.expandedFolders[id] },
        })),
      setFolderExpanded: (id, expanded) =>
        set((s) => ({
          expandedFolders: { ...s.expandedFolders, [id]: expanded },
        })),

      tabs: [],
      activeTabId: null,
      openTab: (tab) =>
        set((s) => {
          const exists = s.tabs.find((t) => t.id === tab.id)
          if (exists) return { activeTabId: tab.id }
          return { tabs: [...s.tabs, tab], activeTabId: tab.id }
        }),
      closeTab: (id) =>
        set((s) => {
          const tabs = s.tabs.filter((t) => t.id !== id)
          let activeTabId = s.activeTabId
          if (activeTabId === id) {
            activeTabId = tabs.length > 0 ? tabs[tabs.length - 1].id : null
          }
          return { tabs, activeTabId }
        }),
      setActiveTab: (activeTabId) => set({ activeTabId }),

      readingProgress: 0,
      setReadingProgress: (readingProgress) => set({ readingProgress }),
    }),
    {
      name: 'context-log-store',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        sidebarWidth: state.sidebarWidth,
        expandedFolders: state.expandedFolders,
      }),
    }
  )
)
