import { getAllPostsForFeed } from '@/lib/content'

export const dynamic = 'force-static'

export async function GET() {
  const posts = getAllPostsForFeed('en')
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.frontmatter.title)}</title>
      <link>https://context-log.vercel.app/${post.category}/${post.slug}</link>
      <description>${escapeXml(post.frontmatter.excerpt)}</description>
      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
    </item>`
    )
    .join('')

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>context.log (EN)</title>
    <link>https://context-log.vercel.app/</link>
    <description>Artificial Intelligence — LLMs, frontier models, AI agents, benchmarks</description>
    <language>en</language>
    <atom:link href="https://context-log.vercel.app/feed/en.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

  return new Response(feed, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  })
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
