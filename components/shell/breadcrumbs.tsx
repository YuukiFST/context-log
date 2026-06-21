'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useStore } from '@/lib/store'
import { getCategory } from '@/lib/categories'

export function Breadcrumbs() {
  const pathname = usePathname()
  const { language, toggleLanguage } = useStore()
  const parts = pathname.split('/').filter(Boolean)

  return (
    <div className="breadcrumbs">
      <Link href="/" className="breadcrumb-item">
        context-log
      </Link>
      {parts.map((part, i) => {
        const href = '/' + parts.slice(0, i + 1).join('/')
        const isLast = i === parts.length - 1
        const cat = getCategory(part)
        const label = cat ? (language === 'pt' ? cat.label : cat.labelEn) : part
        return (
          <span key={part} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <span className="breadcrumb-sep">›</span>
            {isLast ? (
              <span className="breadcrumb-item current">{label}</span>
            ) : (
              <Link href={href} className="breadcrumb-item">
                {label}
              </Link>
            )}
          </span>
        )
      })}
      <div className="breadcrumb-spacer" />
      <div className="lang-toggle">
        <span className={language === 'pt' ? 'active' : ''} onClick={() => useStore.getState().setLanguage('pt')}>
          pt
        </span>
        <span className={language === 'en' ? 'active' : ''} onClick={() => useStore.getState().setLanguage('en')}>
          en
        </span>
      </div>
    </div>
  )
}
