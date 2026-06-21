import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/content'

export async function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag }))
}

export default async function TagPage({
  params,
}: {
  params: Promise<{ tag: string }>
}) {
  const { tag } = await params
  const posts = getPostsByTag(tag)
  if (posts.length === 0) notFound()

  return (
    <>
      <h1 className="doc-title">#{tag}</h1>
      <p className="doc-excerpt">{posts.length} {posts.length === 1 ? 'post' : 'posts'} com esta tag</p>
      <div className="doc-meta" />
      <div className="doc-body">
        <div className="category-list">
          {posts.map((post) => (
            <Link
              key={`${post.category}/${post.slug}`}
              href={`/${post.category}/${post.slug}`}
              className="category-list-item"
            >
              <div className="post-title">
                {post.categoryMeta?.icon} {post.frontmatter.title}
              </div>
              <div className="post-excerpt">{post.frontmatter.excerpt}</div>
              <div className="post-meta">
                📅 {post.frontmatter.date} · ⎇ {post.categoryMeta?.label || post.category}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
