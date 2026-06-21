import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { frontmatterSchema, type Frontmatter } from './schemas'
import { categories, getCategory } from './categories'
import { type Category } from './categories'

const contentDir = path.join(process.cwd(), 'content')

export interface PostInfo {
  category: string
  slug: string
  frontmatter: Frontmatter
  categoryMeta: Category | undefined
}

export interface PostContent {
  frontmatter: Frontmatter
  content: string
  category: string
  slug: string
}

export function getPostSlugs(): { category: string; slug: string }[] {
  const slugs: { category: string; slug: string }[] = []
  for (const cat of categories) {
    const catDir = path.join(contentDir, cat.id)
    if (!fs.existsSync(catDir)) continue
    const entries = fs.readdirSync(catDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        slugs.push({ category: cat.id, slug: entry.name })
      }
    }
  }
  return slugs
}

export function getCategoryPosts(categoryId: string): string[] {
  const catDir = path.join(contentDir, categoryId)
  if (!fs.existsSync(catDir)) return []
  return fs.readdirSync(catDir, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
}

export function getAllPosts(): PostInfo[] {
  const posts: PostInfo[] = []
  for (const cat of categories) {
    const catDir = path.join(contentDir, cat.id)
    if (!fs.existsSync(catDir)) continue
    const slugs = fs.readdirSync(catDir, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
    for (const slug of slugs) {
      const fm = getFrontmatter(cat.id, slug, 'pt')
      if (fm) {
        posts.push({ category: cat.id, slug, frontmatter: fm, categoryMeta: getCategory(cat.id) })
      }
    }
  }
  return posts.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime())
}

export function getFrontmatter(
  category: string,
  slug: string,
  language: 'pt' | 'en'
): Frontmatter | null {
  const mdxPath = path.join(contentDir, category, slug, `${language}.mdx`)
  if (!fs.existsSync(mdxPath)) return null
  try {
    const source = fs.readFileSync(mdxPath, 'utf-8')
    const { data } = matter(source)
    const parsed = frontmatterSchema.safeParse(data)
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

export function getPostContent(
  category: string,
  slug: string,
  language: 'pt' | 'en'
): PostContent | null {
  const mdxPath = path.join(contentDir, category, slug, `${language}.mdx`)
  if (!fs.existsSync(mdxPath)) return null
  try {
    const source = fs.readFileSync(mdxPath, 'utf-8')
    const { data, content } = matter(source)
    const parsed = frontmatterSchema.safeParse(data)
    if (!parsed.success) return null
    return {
      frontmatter: parsed.data,
      content,
      category,
      slug,
    }
  } catch {
    return null
  }
}

export function getReadmeContent(language: 'pt' | 'en'): PostContent | null {
  const mdxPath = path.join(contentDir, `README.${language}.mdx`)
  if (!fs.existsSync(mdxPath)) return null
  try {
    const source = fs.readFileSync(mdxPath, 'utf-8')
    const { data, content } = matter(source)
    return { frontmatter: data as Frontmatter, content, category: '', slug: 'README' }
  } catch {
    return null
  }
}

export function getPostsByTag(tag: string): PostInfo[] {
  return getAllPosts().filter((p) =>
    p.frontmatter.tags?.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

export function getAllTags(): string[] {
  const tagSet = new Set<string>()
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags || []) {
      tagSet.add(tag)
    }
  }
  return Array.from(tagSet).sort()
}

export function getAllPostsForFeed(_language: 'pt' | 'en'): PostInfo[] {
  return getAllPosts()
}

export function getContentRegistry(): import('./content-registry').ContentRegistry {
  return {
    categories: categories.map((cat) => ({
      id: cat.id,
      posts: getCategoryPosts(cat.id),
    })),
  }
}
