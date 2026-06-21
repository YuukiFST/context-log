'use client'

import { useState } from 'react'
import { newsletterSchema } from '@/lib/schemas'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = newsletterSchema.safeParse({ email })
    if (!result.success) {
      setError(result.error.errors[0].message)
      setStatus('error')
      return
    }
    setStatus('loading')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
      } else {
        setError('Erro ao inscrever. Tente novamente.')
        setStatus('error')
      }
    } catch {
      setError('Erro de conexao. Tente novamente.')
      setStatus('error')
    }
  }

  return (
    <div className="newsletter-form">
      <h3>Receba novos posts por email</h3>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          disabled={status === 'loading'}
        />
        <button type="submit" disabled={status === 'loading'}>
          {status === 'loading' ? 'Enviando...' : 'Inscrever'}
        </button>
      </form>
      {status === 'success' && <p className="success">Inscricao confirmada!</p>}
      {status === 'error' && <p className="error">{error}</p>}
    </div>
  )
}
