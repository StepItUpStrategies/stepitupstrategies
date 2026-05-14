import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core'

export const articles = pgTable('articles', {
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
