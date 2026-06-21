import type { Metadata } from 'next'
import './globals.css'
import { Shell } from './shell'
import { ContentRegistryProvider } from '@/lib/content-registry'
import { getContentRegistry } from '@/lib/content'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: 'context.log',
  description: 'Inteligência Artificial — LLMs, modelos de fronteira, agentes de IA, benchmarks',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const registry = getContentRegistry()

  return (
    <html lang="pt-BR" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ContentRegistryProvider data={registry}>
          <Shell>{children}</Shell>
        </ContentRegistryProvider>
        <Analytics />
      </body>
    </html>
  )
}
