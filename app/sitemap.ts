import { getAllPosts } from '@/lib/content'

export default async function sitemap() {
  const posts = getAllPosts()
  const postUrls = posts.map((post) => ({
    url: `https://context-log.vercel.app/${post.category}/${post.slug}`,
    lastModified: new Date(post.frontmatter.date),
  }))

  return [
    { url: 'https://context-log.vercel.app/', lastModified: new Date() },
    ...postUrls,
  ]
}
