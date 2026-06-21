import { z } from 'zod'

export const frontmatterSchema = z.object({
  title: z.string(),
  excerpt: z.string(),
  date: z.string(),
  tags: z.array(z.string()).default([]),
})

export type Frontmatter = z.infer<typeof frontmatterSchema>

export const newsletterSchema = z.object({
  email: z.string().email('Email inválido'),
})
