-- Remove the article with the typo in the title (missing "A").
-- The corrected version "How To Build A Beverage Program That Pays"
-- will be re-fetched from Soro with its new slug on the next sync.
DELETE FROM "articles" WHERE "slug" = 'how-to-build-beverage-program-that-pays';
