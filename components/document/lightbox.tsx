'use client'

import { useCallback, useEffect, useRef } from 'react'

interface LightboxProps {
  open: boolean
  onClose: () => void
  children: React.ReactNode
}

export function Lightbox({ open, onClose, children }: LightboxProps) {
  const dialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const el = dialogRef.current
    if (!el) return
    if (open && !el.open) {
      el.showModal()
    } else if (!open && el.open) {
      el.close()
    }
  }, [open])

  const handleBackdrop = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === dialogRef.current) onClose()
    },
    [onClose]
  )

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      onClick={handleBackdrop}
      onClose={onClose}
    >
      <div className="lightbox-content">
        {children}
      </div>
      <button className="lightbox-close" onClick={onClose}>
        ✕
      </button>
    </dialog>
  )
}
