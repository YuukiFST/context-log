'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/lib/store'
import { useContentRegistry } from '@/lib/content-registry'
import { categories, getCategory } from '@/lib/categories'

interface HistoryEntry {
  text: string
  className?: string
  id?: number
}

export function Terminal() {
  const { terminalPath, setTerminalPath, language, terminalOpen, setTerminalOpen } = useStore()
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<HistoryEntry[]>([
    { text: "context.log terminal v0.1.0 — Type 'help' for commands", className: 'dim' },
    { text: 'Sistema de arquivos virtual sincronizado com /content', className: 'dim' },
    { text: '', className: 'output' },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const bodyRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()
  const registry = useContentRegistry()

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [history])

  const addLine = useCallback((text: string, className = 'output') => {
    setHistory((h) => [...h, { text, className }])
  }, [])

  const typeLine = useCallback(async (text: string, className = 'output') => {
    setIsTyping(true)
    setHistory((h) => [...h, { text, className }])
    await new Promise((r) => setTimeout(r, 50))
    setIsTyping(false)
  }, [])

  const getPostsInCurrentDir = useCallback(() => {
    const catId = terminalPath.replace('/', '')
    const entry = registry.categories.find((c) => c.id === catId)
    return entry?.posts || []
  }, [terminalPath, registry])

  const executeCommand = useCallback(
    async (cmd: string) => {
      const trimmed = cmd.trim()
      const parts = trimmed.split(/\s+/)
      const command = parts[0]?.toLowerCase()
      const arg = parts.slice(1).join(' ')

      addLine(`context-log:${terminalPath} $ ${trimmed}`, 'prompt')

      if (command === 'help') {
        await typeLine(`Comandos disponiveis:
  ls              - Listar diretorio atual
  cd <categoria>  - Navegar para categoria
  cd ..           - Voltar para raiz
  cd /            - Voltar para raiz
  cat <slug>      - Abrir post
  open <slug>     - Abrir post
  pwd             - Mostrar caminho atual
  clear           - Limpar terminal
  help            - Mostrar esta mensagem`, 'output')
      } else if (command === 'ls') {
        if (terminalPath === '/') {
          const lines = categories.map((c) => {
            const label = language === 'pt' ? c.label : c.labelEn
            return `  ${c.icon} ${c.id}/  - ${label}`
          })
          await typeLine('Conteudo de ' + terminalPath + ':\n' + lines.join('\n'), 'output')
        } else {
          const posts = getPostsInCurrentDir()
          if (posts.length === 0) {
            await typeLine('(vazio)', 'dim')
          } else {
            await typeLine(posts.map((s) => '  ' + s).join('\n'), 'output')
          }
        }
      } else if (command === 'cd') {
        if (!arg || arg === '..' || arg === '/') {
          setTerminalPath('/')
          router.push('/')
          addLine('', 'output')
        } else {
          const cat = getCategory(arg)
          if (cat) {
            setTerminalPath('/' + arg)
            router.push('/' + arg)
            addLine('', 'output')
          } else {
            await typeLine('cd: no such file or directory: ' + arg, 'dim')
          }
        }
      } else if (command === 'cat' || command === 'open') {
        if (!arg) {
          await typeLine('usage: ' + command + ' <slug>', 'dim')
        } else {
          const catId = terminalPath.replace('/', '')
          if (catId && getCategory(catId)) {
            const posts = getPostsInCurrentDir()
            if (posts.includes(arg)) {
              router.push('/' + catId + '/' + arg)
              addLine('Abrindo ' + arg + '...', 'dim')
            } else {
              await typeLine(command + ': no such file or directory: ' + arg, 'dim')
            }
          } else {
            await typeLine('Navegue para uma categoria primeiro com cd', 'dim')
          }
        }
      } else if (command === 'pwd') {
        addLine(terminalPath, 'output')
      } else if (command === 'clear') {
        setHistory([])
      } else if (trimmed === '') {
        addLine('', 'output')
      } else {
        await typeLine('bash: ' + command + ': command not found', 'dim')
      }
    },
    [terminalPath, setTerminalPath, language, router, addLine, typeLine, getPostsInCurrentDir]
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isTyping) return
    await executeCommand(input)
    setInput('')
  }

  if (!terminalOpen) return null

  return (
    <div className="terminal-panel">
      <div className="terminal-header">
        <div className="terminal-tabs">
          <span className="terminal-tab active">bash</span>
          <span className="terminal-tab">output</span>
          <span className="terminal-tab">problems</span>
        </div>
        <div className="terminal-actions">
          <button className="terminal-close-btn" onClick={() => setTerminalOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
      </div>
      <div className="terminal-body scanlines" ref={bodyRef}>
        {history.map((entry, i) => (
          <div key={i} className={'terminal-line ' + (entry.className || '')}>
            {entry.text}
          </div>
        ))}
        {isTyping && (
          <div className="terminal-line cursor-line">
            <span className="cursor-blink">▊</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="terminal-input-line">
          <span className="prompt-accent">context-log:{terminalPath}</span>
          <span className="prompt-accent"> $ </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="terminal-input"
            autoFocus
            disabled={isTyping}
          />
        </form>
      </div>
    </div>
  )
}
