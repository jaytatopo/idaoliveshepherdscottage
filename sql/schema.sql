
-- This script initializes the database schema for the Ida Olive Cottage website.
-- It is designed to be idempotent, meaning it can be run multiple times without
-- causing errors or side effects. This is useful for initial setup and for
-- updating the schema as the application evolves.

-- Table to store general text content for different sections of the website.
CREATE TABLE IF NOT EXISTS page_content (
  id SERIAL PRIMARY KEY,
  section VARCHAR(255) NOT NULL,
  content_key VARCHAR(255) NOT NULL,
  content_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (section, content_key)
);

-- Table to store gallery images, linking them to sections.
-- The actual image files are stored in Vercel Blob storage.
CREATE TABLE IF NOT EXISTS gallery_images (
  id SERIAL PRIMARY KEY,
  src_url VARCHAR(255) NOT NULL,
  alt TEXT,
  section VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store amenities offered at the cottage.
CREATE TABLE IF NOT EXISTS amenities (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(255) NOT NULL,
  text VARCHAR(255) NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store categorized lists of facilities.
CREATE TABLE IF NOT EXISTS facilities (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  items TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store nearby activities.
CREATE TABLE IF NOT EXISTS activities (
  id SERIAL PRIMARY KEY,
  icon VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  src_url VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store guest reviews.
CREATE TABLE IF NOT EXISTS reviews (
  id SERIAL PRIMARY KEY,
  quote TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
  source VARCHAR(255),
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to store inquiries submitted through the contact form.
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  guests INTEGER,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table to manage the layout and visibility of homepage sections.
CREATE TABLE IF NOT EXISTS page_sections (
    id SERIAL PRIMARY KEY,
    section_type VARCHAR(50) NOT NULL UNIQUE,
    title VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT NOT NULL
);

-- Table for Frequently Asked Questions.
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0
);

-- Table for promotional specials.
CREATE TABLE IF NOT EXISTS specials (
    id SERIAL PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(100),
    normal_price NUMERIC(10, 2),
    special_price NUMERIC(10, 2),
    src_url VARCHAR(255),
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0
);


-- A function to automatically update the 'updated_at' timestamp on row modification.
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to update the timestamp on the page_content table.
DROP TRIGGER IF EXISTS update_page_content_modtime ON page_content;
CREATE TRIGGER update_page_content_modtime
BEFORE UPDATE ON page_content
FOR EACH ROW
EXECUTE FUNCTION update_modified_column();


-- Insert default page sections if the table is empty.
-- This ensures that on first run, the site has a default layout.
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM page_sections) THEN
        INSERT INTO page_sections (section_type, title, is_visible, sort_order) VALUES
        ('hero', 'Hero', TRUE, 10),
        ('accommodation', 'Accommodation', TRUE, 20),
        ('gallery', 'Gallery', TRUE, 30),
        ('amenities', 'Amenities', TRUE, 40),
        ('facilities', 'Facilities', TRUE, 50),
        ('activities', 'Activities', TRUE, 60),
        ('specials', 'Specials', TRUE, 65),
        ('booking', 'Rates & Booking', TRUE, 70),
        ('reviews', 'Reviews', TRUE, 80),
        ('host', 'Host Profile', TRUE, 85),
        ('faq', 'FAQ', TRUE, 88),
        ('video', 'Video', FALSE, 89),
        ('cta', 'Call to Action', TRUE, 90),
        ('location', 'Location', TRUE, 100);
    END IF;
END $$;
