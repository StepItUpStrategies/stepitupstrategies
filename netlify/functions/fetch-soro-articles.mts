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

interface ParsedArticle {
  title: string
  slug: string
  summary: string
  content: string
  category: string
  pubDate: string
  image: string
  link: string
}

function extractTagContent(xml: string, tag: string): string {
  const cdataMatch = xml.match(
    new RegExp(`<${tag}><!\\[CDATA\\[([\\s\\S]*?)\\]\\]><\\/${tag}>`)
  )
  if (cdataMatch) return cdataMatch[1].trim()

  const plainMatch = xml.match(
    new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`)
  )
  if (plainMatch) return plainMatch[1].trim()

  return ''
}

function extractImageUrl(itemXml: string): string {
  const mediaMatch = itemXml.match(/<media:content[^>]+url="([^"]+)"/)
  if (mediaMatch) return mediaMatch[1]

  const enclosureMatch = itemXml.match(
    /<enclosure[^>]+url="([^"]+)"[^>]+type="image/
  )
  if (enclosureMatch) return enclosureMatch[1]

  const mediaThumb = itemXml.match(/<media:thumbnail[^>]+url="([^"]+)"/)
  if (mediaThumb) return mediaThumb[1]

  const contentHtml =
    extractTagContent(itemXml, 'content:encoded') ||
    extractTagContent(itemXml, 'description')
  const imgMatch = contentHtml.match(/<img[^>]+src="([^"]+)"/)
  if (imgMatch) return imgMatch[1]

  return ''
}

function slugify(url: string, title: string): string {
  const urlPath = url.replace(/\/$/, '').split('/').pop() || ''
  if (urlPath && !urlPath.includes('?') && !urlPath.includes('.')) {
    return urlPath
  }
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function generateSummary(html: string): string {
  const text = html
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
  if (text.length <= 200) return text
  return text.slice(0, 197).replace(/\s+\S*$/, '') + '...'
}

function parseRssFeed(xml: string): ParsedArticle[] {
  const items: ParsedArticle[] = []
  const itemRegex = /<item>([\s\S]*?)<\/item>/g
  let match

  while ((match = itemRegex.exec(xml)) !== null) {
    const itemXml = match[1]
    const title = extractTagContent(itemXml, 'title')
    const link = extractTagContent(itemXml, 'link')
    const description = extractTagContent(itemXml, 'description')
    const content = extractTagContent(itemXml, 'content:encoded') || description
    const category = extractTagContent(itemXml, 'category') || 'General'
    const pubDate = extractTagContent(itemXml, 'pubDate')
    const image = extractImageUrl(itemXml)
    const slug = slugify(link, title)
    const summary = description
      ? description.replace(/<[^>]+>/g, '').trim()
      : generateSummary(content)

    if (title && (content || description)) {
      items.push({ title, slug, summary, content, category, pubDate, image, link })
    }
  }

  return items
}

async function fetchAndStoreArticles(feedUrl: string): Promise<number> {
  console.log(`Fetching RSS feed: ${feedUrl}`)

  const response = await fetch(feedUrl, {
    headers: { 'User-Agent': 'StepItUpStrategies/1.0' },
  })

  if (!response.ok) {
    throw new Error(`RSS feed returned ${response.status}: ${response.statusText}`)
  }

  const xml = await response.text()
  const parsed = parseRssFeed(xml)
  console.log(`Parsed ${parsed.length} articles from feed`)

  let inserted = 0

  for (const article of parsed) {
    const existing = await db
      .select({ id: articlesTable.id })
      .from(articlesTable)
      .where(eq(articlesTable.slug, article.slug))

    if (existing.length === 0) {
      await db.insert(articlesTable).values({
        slug: article.slug,
        title: article.title,
        category: article.category,
        summary: article.summary,
        imageUrl: article.image || '/placeholder.png',
        content: article.content,
        sourceUrl: article.link,
        publishedAt: article.pubDate ? new Date(article.pubDate) : new Date(),
      })
      console.log(`Inserted: ${article.title}`)
      inserted++
    }
  }

  return inserted
}

export default async (_req: Request, _context: Context) => {
  const feedUrl = Netlify.env.get('SORO_FEED_URL')

  if (!feedUrl) {
    console.log(
      'SORO_FEED_URL environment variable not set. ' +
        'Set it to your WordPress RSS feed URL (e.g. https://yourdomain.com/feed/) ' +
        'to enable automatic article fetching.'
    )
    return new Response('No feed URL configured', { status: 200 })
  }

  try {
    const count = await fetchAndStoreArticles(feedUrl)
    const msg = `Done — ${count} new article(s) added`
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
