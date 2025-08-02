-- This script cleans up the database by dropping columns that were
-- previously used to store image data directly. This is intended to be
-- run AFTER migrating to a blob storage solution like Vercel Blob,
-- where only the image URL is stored (e.g., in 'image_src').
--
-- Running this script is optional but recommended for a cleaner schema.
-- It will fail gracefully if the columns do not exist, so it is safe to run.

-- Drop the 'image' column from the 'activities' table if it exists
ALTER TABLE activities DROP COLUMN IF EXISTS image;

-- Drop the 'image' column from the 'specials' table if it exists
ALTER TABLE specials DROP COLUMN IF EXISTS image;

-- Note: The 'gallery_images' table is the central place for most images
-- and its 'src' column correctly stores the URL from the blob store.
-- The 'image_src' columns in 'activities' and 'specials' also store URLs.
-- This script only targets columns named 'image' which may have held raw data.
