import type { Article } from '../data/articles'

const AUTHOR_BYLINE_TEXT =
  '-Brian Carpinello is a Co-Founder and the COO of Step It Up Strategies, bringing ' +
  'over two decades of experience in hospitality leadership, restaurant operations, ' +
  'financial management, food &amp; beverage programming, and business development.'

export const AUTHOR_BYLINE_HTML = `<p class="article-byline">${AUTHOR_BYLINE_TEXT}</p>`

/**
 * Matches a paragraph that is an author byline for Brian Carpinello, in any wording.
 * Kept deliberately narrow: the paragraph must open with his name (optionally after a
 * leading dash) and also mention the company, so a body paragraph that merely quotes
 * or refers to him is never mistaken for the byline.
 */
const EXISTING_BYLINE_PARAGRAPH =
  /<p\b[^>]*>\s*-?\s*Brian Carpinello is\b[^<]*Step It Up Strategies[\s\S]*?<\/p>/gi

/**
 * Appends the canonical author byline to the end of an article body.
 *
 * Applied when an article is served rather than when it is stored, which is what makes
 * the byline hold for newly imported articles: the daily Soro sync rewrites stored
 * content, so anything written into the database would be overwritten within a day.
 * Every article — from the database, the static fallback, or the live Soro feed —
 * passes through here, so imports need no special handling to pick it up.
 *
 * Any byline already present in the source content is removed first. That keeps
 * exactly one copy on the page, and means an imported article that arrives carrying
 * an older wording of the bio still displays the current wording.
 */
export function withAuthorByline<T extends Pick<Article, 'content'>>(article: T): T {
  if (!article.content || !article.content.trim()) return article

  const body = article.content.replace(EXISTING_BYLINE_PARAGRAPH, '').trimEnd()

  return { ...article, content: `${body}\n${AUTHOR_BYLINE_HTML}` }
}
