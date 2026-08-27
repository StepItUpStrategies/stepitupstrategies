import { createServerFn } from '@tanstack/react-start'
import type { Article } from '../data/articles'
import { withAuthorByline } from './author-byline'

const SORO_TOKEN = '3cc0116b-c696-4d4d-8f15-cdd7c40c1db6'
const SORO_EMBED_URL = `https://app.trysoro.com/api/embed/${SORO_TOKEN}`

interface SoroArticle {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string | null
  date: string
  isoDate: string
  image: string
}

async function fetchSoroArticleList(): Promise<SoroArticle[]> {
  try {
    const response = await fetch(SORO_EMBED_URL)
    if (!response.ok) return []
    const script = await response.text()
    const start = script.indexOf('SORO_ARTICLES')
    if (start === -1) return []
    const arrayStart = script.indexOf('[', start)
    const arrayEnd = script.indexOf('];', arrayStart)
    if (arrayStart === -1 || arrayEnd === -1) return []
    return JSON.parse(script.slice(arrayStart, arrayEnd + 1))
  } catch {
    return []
  }
}

async function fetchSoroArticleContent(articleId: string): Promise<string> {
  try {
    const response = await fetch(`${SORO_EMBED_URL}/article/${articleId}`)
    if (!response.ok) return ''
    const data = await response.json()
    return data.content || ''
  } catch {
    return ''
  }
}

function soroToArticle(soro: SoroArticle): Article {
  return {
    slug: soro.slug,
    title: soro.title,
    category: 'General',
    summary: soro.excerpt,
    image: soro.image,
    content: '',
    publishedAt: soro.isoDate,
  }
}

function dbRowToArticle(row: {
  slug: string
  title: string
  category: string
  summary: string
  imageUrl: string
  content: string
  publishedAt: Date
}): Article {
  return {
    slug: row.slug,
    title: row.title,
    category: row.category,
    summary: row.summary,
    image: row.imageUrl,
    content: row.content,
    publishedAt: row.publishedAt.toISOString(),
  }
}

async function getAllMergedArticles(): Promise<Article[]> {
  let dbArticles: Article[] = []
  try {
    const { db } = await import('../../db/index')
    const { articles: articlesTable } = await import('../../db/schema')
    const { desc } = await import('drizzle-orm')
    const rows = await db
      .select()
      .from(articlesTable)
      .orderBy(desc(articlesTable.publishedAt))
    dbArticles = rows.map(dbRowToArticle)
  } catch {
    // DB not available
  }

  const soroArticles = await fetchSoroArticleList()
  const soroMapped = soroArticles.map(soroToArticle)

  const dbSlugs = new Set(dbArticles.map((a) => a.slug))
  const newFromSoro = soroMapped.filter((a) => !dbSlugs.has(a.slug))

  const all = [...dbArticles, ...newFromSoro].map(withAuthorByline)
  all.sort(
    (a, b) =>
      new Date(b.publishedAt ?? 0).getTime() -
      new Date(a.publishedAt ?? 0).getTime()
  )
  return all
}

export const getCurrentArticles = createServerFn({ method: 'GET' }).handler(
  async () => {
    const articles = await getAllMergedArticles()
    return articles.slice(0, 3)
  }
)

export const getArchiveArticles = createServerFn({ method: 'GET' }).handler(
  async () => {
    return getAllMergedArticles()
  }
)

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
        return [...dbArticles, ...fallback].map(withAuthorByline)
      }
    } catch {
      // DB not available yet — fall back to static data
    }

    return staticArticles.map(withAuthorByline)
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
        return withAuthorByline(dbRowToArticle(rows[0]))
      }
    } catch {
      // DB not available yet
    }

    const { articles } = await import('../data/articles')
    const article = articles.find((a) => a.slug === slug)
    if (article) return withAuthorByline(article)

    const soroArticles = await fetchSoroArticleList()
    const soroArticle = soroArticles.find((a) => a.slug === slug)
    if (soroArticle) {
      const content = await fetchSoroArticleContent(soroArticle.id)
      return withAuthorByline({ ...soroToArticle(soroArticle), content })
    }

    throw new Error('Article not found')
  })

/**
 * Resolve a fixed list of article slugs to their archive metadata, preserving the
 * order the slugs were requested in. Used by the service detail pages to render
 * their "Related Articles" block. Content bodies are stripped so the payload
 * stays small — these are teaser cards that link through to /insights/$slug.
 *
 * Slugs that no longer exist in the archive are silently dropped rather than
 * rendered as dead links.
 */
export const getArticlesBySlugs = createServerFn({ method: 'GET' })
  .inputValidator((slugs: string[]) => slugs)
  .handler(async ({ data: slugs }) => {
    const { articles: staticArticles } = await import('../data/articles')

    const merged = await getAllMergedArticles()
    const bySlug = new Map<string, Article>()
    for (const article of [...staticArticles.map(withAuthorByline), ...merged]) {
      bySlug.set(article.slug, article)
    }

    return slugs
      .map((slug) => bySlug.get(slug))
      .filter((a): a is Article => Boolean(a))
      .map(({ slug, title, category, summary, image, publishedAt }) => ({
        slug,
        title,
        category,
        summary,
        image,
        publishedAt,
      }))
  })
