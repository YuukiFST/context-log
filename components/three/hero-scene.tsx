'use client'

import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('./scene-inner'), { ssr: false })

export function HeroScene() {
  return (
    <div className="hero-scene">
      <Scene />
    </div>
  )
}
