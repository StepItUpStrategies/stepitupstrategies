import { createServerFn } from '@tanstack/react-start'
import type { Article } from '../data/articles'

function dbRowToArticle(row: {
  slug: string
  title: string
  category: string
  summary: string
  imageUrl: string
  content: string
}): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    image: row.imageUrl,
    content: row.content,
  }
}

export const getArticles = createServerFn({ method: 'GET' }).handler(
  async () => {
    const { articles: staticArticles } = await import('../data/articles')

    try {
      const { db } = await import('../../db/index')
      const { articles: articlesTable } = await import('../../db/schema')
      const { desc } = await import('drizzle-orm')
      const rows = await db
        .select()
        .from(articlesTable)
        .orderBy(desc(articlesTable.publishedAt))

      if (rows.length > 0) {
        const dbArticles = rows.map(dbRowToArticle)
        const dbSlugs = new Set(dbArticles.map((a) => a.slug))
        const fallback = staticArticles.filter((a) => !dbSlugs.has(a.slug))
        return [...dbArticles, ...fallback]
      }
    } catch {
      // DB not available yet — fall back to static data
    }

    return staticArticles
  }
)

export const getArticleBySlug = createServerFn({ method: 'GET' })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    try {
      const { db } = await import('../../db/index')
      const { articles: articlesTable } = await import('../../db/schema')
      const { eq } = await import('drizzle-orm')
      const rows = await db
        .select()
        .from(articlesTable)
        .where(eq(articlesTable.slug, slug))

      if (rows.length > 0) {
        return dbRowToArticle(rows[0])
      }
    } catch {
      // DB not available yet
    }

    const { articles } = await import('../data/articles')
    const article = articles.find((a) => a.slug === slug)
    if (!article) throw new Error('Article not found')
    return article
  })
