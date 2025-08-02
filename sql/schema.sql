
-- This schema is designed to be idempotent, meaning it can be run multiple times safely.
-- It will create tables only if they do not already exist.

-- Create the table for basic text content across different page sections
CREATE TABLE IF NOT EXISTS page_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(255) NOT NULL,
    content_key VARCHAR(255) NOT NULL,
    content_value TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (section, content_key)
);

-- Create the table for gallery images, storing only the URL from Vercel Blob
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL,
    alt TEXT NOT NULL,
    section VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the table for amenities
CREATE TABLE IF NOT EXISTS amenities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    text VARCHAR(255) NOT NULL,
    sort_order INT DEFAULT 0
);

-- Create the table for facilities
CREATE TABLE IF NOT EXISTS facilities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    items TEXT,
    sort_order INT DEFAULT 0
);

-- Create the table for activities, storing only the image URL from Vercel Blob
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    sort_order INT DEFAULT 0,
    image_src TEXT
);

-- Create the table for guest reviews
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL CHECK (rating >= 1 AND rating <= 5),
    source VARCHAR(255),
    sort_order INT DEFAULT 0
);

-- Create the table for web inquiries from the contact form
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    guests INT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- Create the table for FAQs
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INT DEFAULT 0
);

-- Create the table for page sections to control layout and visibility
CREATE TABLE IF NOT EXISTS page_sections (
    id SERIAL PRIMARY KEY,
    section_type VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);

-- Create the table for specials, storing only the image URL from Vercel Blob
CREATE TABLE IF NOT EXISTS specials (
    id SERIAL PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    description TEXT,
    duration VARCHAR(255),
    normal_price NUMERIC(10, 2),
    special_price NUMERIC(10, 2),
    image_src TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INT DEFAULT 0
);


-- A function to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- A trigger to execute the function before an update on page_content
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_page_content_updated_at' AND tgrelid = 'page_content'::regclass
    ) THEN
        CREATE TRIGGER update_page_content_updated_at
        BEFORE UPDATE ON page_content
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END;
$$;

-- A trigger to execute the function before an update on gallery_images
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger 
        WHERE tgname = 'update_gallery_images_updated_at' AND tgrelid = 'gallery_images'::regclass
    ) THEN
        CREATE TRIGGER update_gallery_images_updated_at
        BEFORE UPDATE ON gallery_images
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END;
$$;

-- Seed the page_sections table with default values
-- This will only insert if the section_type doesn't already exist.
INSERT INTO page_sections (section_type, title, is_visible, sort_order) VALUES
('hero', 'Hero', true, 10),
('accommodation', 'Accommodation', true, 20),
('amenities', 'Amenities', true, 30),
('facilities', 'Facilities', true, 40),
('activities', 'Activities', true, 50),
('gallery', 'Gallery', true, 60),
('specials', 'Specials', true, 65),
('booking', 'Rates & Booking', true, 70),
('reviews', 'Reviews', true, 80),
('host', 'Host Profile', true, 85),
('faq', 'FAQ', true, 88),
('video', 'Video', false, 89),
('cta', 'Call To Action', true, 90),
('location', 'Location', true, 100)
ON CONFLICT (section_type) DO NOTHING;
