import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getCategory } from '@/lib/categories'
import { getAllPosts } from '@/lib/content'
import { categories } from '@/lib/categories'
import { CategoryIcon } from '@/components/document/category-icon'

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.id }))
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>
}) {
  const { category } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const posts = getAllPosts().filter((p) => p.category === category)

  return (
    <>
      <CategoryIcon category={cat} />
      <h1 className="doc-title">{cat.label}</h1>
      <p className="doc-excerpt">
        Posts sobre {cat.label.toLowerCase()}
      </p>
      <div className="doc-meta">
        <span>{posts.length} {posts.length === 1 ? 'post' : 'posts'}</span>
      </div>
      <div className="doc-body">
        {posts.length === 0 ? (
          <p>Nenhum post ainda nesta categoria.</p>
        ) : (
          <div className="category-list">
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/${category}/${post.slug}`}
                className="category-list-item"
              >
                <div className="post-title">
                  {cat.icon} {post.frontmatter.title}
                </div>
                <div className="post-excerpt">{post.frontmatter.excerpt}</div>
                <div className="post-meta">
                  📅 {post.frontmatter.date} · {post.frontmatter.tags?.join(', ')}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
