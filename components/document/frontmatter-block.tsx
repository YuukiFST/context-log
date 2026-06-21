'use client'

import { useState } from 'react'
import type { Frontmatter } from '@/lib/schemas'

export function FrontmatterBlock({ frontmatter }: { frontmatter: Frontmatter }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="doc-frontmatter">
      <div className="doc-fm-header" onClick={() => setExpanded(!expanded)}>
        <span className={`arrow ${expanded ? 'open' : ''}`}>▶</span>
        <span>frontmatter.yaml</span>
      </div>
      {expanded && (
        <div className="doc-fm-body">
          <span className="fm-key">title</span>: <span className="fm-value">"{frontmatter.title}"</span><br />
          <span className="fm-key">excerpt</span>: <span className="fm-value">"{frontmatter.excerpt}"</span><br />
          <span className="fm-key">date</span>: <span className="fm-value">{frontmatter.date}</span><br />
          <span className="fm-key">tags</span>: <span className="fm-value">[{frontmatter.tags?.map((t) => `"${t}"`).join(', ')}]</span>
        </div>
      )}
    </div>
  )
}
