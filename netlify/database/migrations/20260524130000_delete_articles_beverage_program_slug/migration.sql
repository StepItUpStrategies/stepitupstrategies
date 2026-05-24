-- The previous migration targeted the wrong slug ('how-to-build-beverage-program-that-pays').
-- The actual Soro slug is 'how-to-build-beverage-program'. Delete the stale DB record
-- so the corrected title from Soro ("How to Build a Beverage Program That Pays") appears.
DELETE FROM "articles" WHERE "slug" = 'how-to-build-beverage-program';
