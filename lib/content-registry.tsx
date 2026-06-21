'use client'

import { createContext, useContext } from 'react'

export interface CategoryEntry {
  id: string
  posts: string[]
}

export interface ContentRegistry {
  categories: CategoryEntry[]
}

const defaultRegistry: ContentRegistry = { categories: [] }

const ContentRegistryContext = createContext<ContentRegistry>(defaultRegistry)

export function ContentRegistryProvider({
  data,
  children,
}: {
  data: ContentRegistry
  children: React.ReactNode
}) {
  return (
    <ContentRegistryContext.Provider value={data}>
      {children}
    </ContentRegistryContext.Provider>
  )
}

export function useContentRegistry() {
  return useContext(ContentRegistryContext)
}
