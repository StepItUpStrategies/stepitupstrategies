import type { Config, Context } from '@netlify/functions'
import { drizzle } from 'drizzle-orm/netlify-db'
import { eq } from 'drizzle-orm'
import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

const articlesTable = pgTable('articles', {
  id: serial('id').primaryKey(),
  slug: text('slug').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull().default('General'),
  summary: text('summary').notNull(),
  imageUrl: text('image_url').notNull(),
  content: text('content').notNull(),
  sourceUrl: text('source_url'),
  publishedAt: timestamp('published_at').notNull().defaultNow(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
})

const db = drizzle()

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
  console.log('Fetching articles from Soro embed API...')
  const response = await fetch(SORO_EMBED_URL)
  if (!response.ok) {
    throw new Error(`Soro embed returned ${response.status}: ${response.statusText}`)
  }
  const script = await response.text()
  const start = script.indexOf('SORO_ARTICLES')
  if (start === -1) throw new Error('Could not find SORO_ARTICLES in embed script')
  const arrayStart = script.indexOf('[', start)
  const arrayEnd = script.indexOf('];', arrayStart)
  if (arrayStart === -1 || arrayEnd === -1) throw new Error('Could not parse SORO_ARTICLES array')
  return JSON.parse(script.slice(arrayStart, arrayEnd + 1))
}

async function fetchArticleContent(articleId: string): Promise<string> {
  try {
    const response = await fetch(`${SORO_EMBED_URL}/article/${articleId}`)
    if (!response.ok) return ''
    const data = await response.json()
    return data.content || ''
  } catch {
    return ''
  }
}

export default async (_req: Request, _context: Context) => {
  try {
    const soroArticles = await fetchSoroArticleList()
    console.log(`Found ${soroArticles.length} articles from Soro`)

    let inserted = 0
    let updated = 0

    for (const article of soroArticles) {
      const existing = await db
        .select({ id: articlesTable.id })
        .from(articlesTable)
        .where(eq(articlesTable.slug, article.slug))

      const content = await fetchArticleContent(article.id)

      if (existing.length === 0) {
        await db.insert(articlesTable).values({
          slug: article.slug,
          title: article.title,
          category: 'General',
          summary: article.excerpt,
          imageUrl: article.image || '/placeholder.png',
          content: content || article.excerpt,
          sourceUrl: null,
          publishedAt: new Date(article.isoDate),
        })
        console.log(`Inserted: ${article.title}`)
        inserted++
      } else {
        await db
          .update(articlesTable)
          .set({
            title: article.title,
            summary: article.excerpt,
            imageUrl: article.image || '/placeholder.png',
            content: content || article.excerpt,
            publishedAt: new Date(article.isoDate),
          })
          .where(eq(articlesTable.slug, article.slug))
        updated++
      }
    }

    const msg = `Done — ${inserted} new, ${updated} updated`
    console.log(msg)
    return new Response(msg, { status: 200 })
  } catch (err) {
    console.error('Error fetching articles:', err)
    return new Response(`Error: ${err}`, { status: 500 })
  }
}

export const config: Config = {
  schedule: '@daily',
}
