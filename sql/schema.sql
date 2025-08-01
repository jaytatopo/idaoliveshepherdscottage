-- This script is designed to be run to set up the database schema for the Ida Olive Shepherd's Cottage website.
-- It is idempotent, meaning it can be safely run multiple times without causing errors or data loss.
-- It uses `CREATE TABLE IF NOT EXISTS` to ensure that it only creates tables that are missing.

-- Stores general text content for various sections of the website.
CREATE TABLE IF NOT EXISTS page_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(255) NOT NULL,
    content_key VARCHAR(255) NOT NULL,
    content_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, content_key)
);

-- Stores image URLs and metadata for galleries and section backgrounds.
-- The `src` column is TEXT to accommodate base64-encoded data URIs.
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    section VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stores inquiries submitted through the contact/booking form.
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    guests INTEGER NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Stores the list of amenities available at the cottage.
CREATE TABLE IF NOT EXISTS amenities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Stores nearby activities or things to do.
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_src TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Stores guest reviews or testimonials.
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    source VARCHAR(255),
    sort_order INTEGER DEFAULT 0
);

-- Stores categorized lists of cottage facilities.
CREATE TABLE IF NOT EXISTS facilities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    items TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Stores Frequently Asked Questions.
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT,
    sort_order INTEGER DEFAULT 0
);

-- Defines the sections of the homepage and their visibility/order.
CREATE TABLE IF NOT EXISTS page_sections (
    id SERIAL PRIMARY KEY,
    section_type VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INTEGER
);

-- Stores promotional specials.
CREATE TABLE IF NOT EXISTS specials (
    id SERIAL PRIMARY KEY,
    headline TEXT NOT NULL,
    description TEXT,
    duration VARCHAR(255),
    normal_price NUMERIC(10, 2),
    special_price NUMERIC(10, 2),
    image_src TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0
);


-- The following functions and triggers automatically update the `updated_at` timestamp on row changes.
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
   NEW.updated_at = NOW();
   RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
   IF NOT EXISTS (
      SELECT 1 FROM pg_trigger
      WHERE tgname = 'update_page_content_updated_at'
   ) THEN
      CREATE TRIGGER update_page_content_updated_at
      BEFORE UPDATE ON page_content
      FOR EACH ROW
      EXECUTE PROCEDURE update_updated_at_column();
   END IF;
END
$$;

-- Populate the page_sections table with default values if it's empty.
-- This ensures the site has a default layout after the first time the schema is run.
INSERT INTO page_sections (section_type, title, sort_order, is_visible)
VALUES
    ('hero', 'Hero', 10, TRUE),
    ('accommodation', 'Accommodation', 20, TRUE),
    ('amenities', 'Amenities', 30, TRUE),
    ('facilities', 'Facilities', 40, TRUE),
    ('activities', 'Activities', 50, TRUE),
    ('gallery', 'Gallery', 60, TRUE),
    ('specials', 'Specials', 65, TRUE),
    ('booking', 'Rates & Booking', 70, TRUE),
    ('reviews', 'Reviews', 80, TRUE),
    ('location', 'Location', 90, TRUE),
    ('host', 'Host Profile', 100, TRUE),
    ('faq', 'FAQ', 110, TRUE),
    ('video', 'Video', 120, FALSE),
    ('cta', 'Call to Action', 130, TRUE)
ON CONFLICT (section_type) DO NOTHING;
