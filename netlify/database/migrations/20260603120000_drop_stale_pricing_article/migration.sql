-- A new version of "How to Price Menu Items for Profit" is available from Soro.
-- The Insights page prioritizes the stored DB record over the live Soro feed, so the
-- old version keeps showing until the stale row is removed. Delete it so the merge logic
-- re-fetches the current version from Soro (slug 'how-to-price-menu-items-for-profit',
-- Soro id 63b0c7c1-9d73-4b8e-a566-7e96c5756407). The daily sync function will then
-- re-insert it with the updated content.
DELETE FROM "articles" WHERE "slug" = 'how-to-price-menu-items-for-profit';
