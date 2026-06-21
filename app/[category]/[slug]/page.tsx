import Link from 'next/link'
import { notFound } from 'next/navigation'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getCategory } from '@/lib/categories'
import { getPostContent, getPostSlugs } from '@/lib/content'
import { FrontmatterBlock } from '@/components/document/frontmatter-block'
import { CategoryIcon } from '@/components/document/category-icon'
import { BenchmarkCard } from '@/components/document/benchmark-card'
import { VerdictBox } from '@/components/document/verdict-box'
import { GiscusComments } from '@/components/document/giscus-comments'
import { NewsletterForm } from '@/components/document/newsletter-form'
import type { Frontmatter } from '@/lib/schemas'

export async function generateStaticParams() {
  return getPostSlugs()
}

const mdxComponents = {
  BenchmarkCard,
  VerdictBox,
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>
}) {
  const { category, slug } = await params
  const cat = getCategory(category)
  if (!cat) notFound()

  const post = getPostContent(category, slug, 'pt')
  if (!post) notFound()

  const { content } = await compileMDX({
    source: post.content,
    components: mdxComponents,
    options: { mdxOptions: { remarkPlugins: [], rehypePlugins: [] } },
  })

  return (
    <>
      <FrontmatterBlock frontmatter={post.frontmatter as Frontmatter} />
      <CategoryIcon category={cat} />
      <h1 className="doc-title">{post.frontmatter.title}</h1>
      <p className="doc-excerpt">{post.frontmatter.excerpt}</p>
      <div className="doc-meta">
        <span>{post.frontmatter.date}</span>
        <span className="doc-meta-sep" />
        <span>{cat.label}</span>
        <span className="doc-meta-sep" />
        {post.frontmatter.tags?.map((tag) => (
          <Link key={tag} href={'/tags/' + tag} className="doc-tag">
            {tag}
          </Link>
        ))}
      </div>
      <div className="doc-body">
        {content}
      </div>
      <NewsletterForm />
      <GiscusComments category={category} slug={slug} />
    </>
  )
}
