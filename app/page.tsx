import Link from 'next/link'
import { getReadmeContent } from '@/lib/content'
import { categories } from '@/lib/categories'
import { HeroScene } from '@/components/three/hero-scene'

export default function HomePage() {
  const readme = getReadmeContent('pt')

  return (
    <>
      <HeroScene />
      {readme ? (
        <div className="doc-body">
          <h1 className="doc-title">{readme.frontmatter.title}</h1>
          <p className="doc-excerpt">{readme.frontmatter.excerpt}</p>
          <div className="doc-meta">
            <span>📅 {readme.frontmatter.date}</span>
          </div>
          <div style={{ whiteSpace: 'pre-wrap' }}>{readme.content}</div>
        </div>
      ) : (
        <>
          <h1 className="doc-title">context.log</h1>
          <p className="doc-excerpt">
            Inteligência Artificial — LLMs, modelos de fronteira, agentes de IA, benchmarks
          </p>
          <div className="doc-meta">
            <span>Bem-vindo ao context.log</span>
          </div>
          <div className="doc-body">
            <p>
              Este blog explora o universo da inteligência artificial com foco em modelos de linguagem,
              agentes de IA, benchmarks e análise de custo vs performance.
            </p>
            <h2>Categorias</h2>
            <ul>
              {categories.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/${cat.id}`}>
                    {cat.icon} {cat.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}
