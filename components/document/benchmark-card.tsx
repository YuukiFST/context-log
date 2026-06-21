'use client'

import { useCallback, useRef, useState } from 'react'
import { Lightbox } from './lightbox'

interface BenchmarkCardProps {
  image: string
  alt: string
  children: React.ReactNode
}

export function BenchmarkCard({ image, alt, children }: BenchmarkCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateY(-2px)`
  }, [])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (!card) return
    card.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg) translateY(0px)'
  }, [])

  return (
    <>
      <div
        ref={cardRef}
        className="benchmark-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <div className="benchmark-image" onClick={() => setLightboxOpen(true)}>
          <img src={image} alt={alt} />
        </div>
        <div className="benchmark-content">
          <div className="benchmark-label">Benchmark: {alt}</div>
          {children}
        </div>
      </div>
      <Lightbox open={lightboxOpen} onClose={() => setLightboxOpen(false)}>
        <img src={image} alt={alt} className="lightbox-image" />
      </Lightbox>
    </>
  )
}
