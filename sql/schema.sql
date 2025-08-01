
-- This script initializes the database schema for the Ida Olive Cottage website.

-- Drop existing tables to start fresh (optional, use with caution in development)
-- DROP TABLE IF EXISTS page_content, gallery_images, inquiries, amenities, activities, reviews, facilities, faq, page_sections, specials CASCADE;

-- Create page_content table to store all text content for the website
CREATE TABLE IF NOT EXISTS page_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(100) NOT NULL,
    content_key VARCHAR(100) NOT NULL,
    content_value TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, content_key)
);

-- Create gallery_images table for image galleries and single-image sections
CREATE TABLE IF NOT EXISTS gallery_images (
    id SERIAL PRIMARY KEY,
    src TEXT NOT NULL, -- Storing as base64 data URI
    alt VARCHAR(255) NOT NULL,
    section VARCHAR(100) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create inquiries table to store messages from the contact/enquiry form
CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    guests INTEGER NOT NULL,
    message TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create amenities table
CREATE TABLE IF NOT EXISTS amenities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    text VARCHAR(255) NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create facilities table
CREATE TABLE IF NOT EXISTS facilities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    category VARCHAR(255) NOT NULL,
    items TEXT NOT NULL, -- Store as newline-separated list
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create activities table
CREATE TABLE IF NOT EXISTS activities (
    id SERIAL PRIMARY KEY,
    icon VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_src TEXT, -- Storing as base64 data URI
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create reviews table
CREATE TABLE IF NOT EXISTS reviews (
    id SERIAL PRIMARY KEY,
    quote TEXT NOT NULL,
    author VARCHAR(255) NOT NULL,
    rating NUMERIC(2, 1) NOT NULL,
    source VARCHAR(100),
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create faq table
CREATE TABLE IF NOT EXISTS faq (
    id SERIAL PRIMARY KEY,
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create page_sections table to manage homepage layout
CREATE TABLE IF NOT EXISTS page_sections (
    id SERIAL PRIMARY KEY,
    section_type VARCHAR(50) UNIQUE NOT NULL,
    title VARCHAR(100) NOT NULL,
    is_visible BOOLEAN DEFAULT TRUE,
    sort_order INTEGER NOT NULL
);

-- Create specials table for promotional offers
CREATE TABLE IF NOT EXISTS specials (
    id SERIAL PRIMARY KEY,
    headline VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    duration VARCHAR(255),
    normal_price NUMERIC(10, 2),
    special_price NUMERIC(10, 2),
    image_src TEXT, -- Storing as base64 data URI
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);


-- Insert initial data for page_sections if the table is empty
INSERT INTO page_sections (section_type, title, is_visible, sort_order) VALUES
('hero', 'Hero', TRUE, 10),
('accommodation', 'Accommodation', TRUE, 20),
('amenities', 'Amenities', TRUE, 30),
('facilities', 'Facilities', TRUE, 40),
('activities', 'Activities', TRUE, 50),
('gallery', 'Gallery', TRUE, 60),
('specials', 'Specials', TRUE, 65),
('booking', 'Rates & Booking', TRUE, 70),
('reviews', 'Reviews', TRUE, 80),
('location', 'Location', TRUE, 90),
('host', 'Host Profile', FALSE, 100),
('faq', 'FAQ', FALSE, 110),
('video', 'Video', FALSE, 120),
('cta', 'Call to Action', FALSE, 130)
ON CONFLICT (section_type) DO NOTHING;

-- Insert initial data for amenities if the table is empty
INSERT INTO amenities (icon, text, sort_order) VALUES
('Wifi', 'Wi-Fi (Satellite)', 10),
('Wind', 'Ceiling Fans', 20),
('Heater', 'Indoor Fireplace', 30),
('Bed', 'Quality Linen & Towels', 40),
('Car', 'Secure Parking', 50),
('Coffee', 'Coffee & Tea Facilities', 60),
('Bath', 'Indoor & Outdoor Showers', 70),
('ZapOff', 'Off-The-Grid (Solar)', 80)
ON CONFLICT DO NOTHING;

-- Insert initial data for facilities if the table is empty
INSERT INTO facilities (icon, category, items, sort_order) VALUES
('ChefHat', 'Kitchen', 'Fully equipped\nGas stove\nFridge/freezer\nMicrowave', 10),
('Flame', 'Braai/BBQ Area', 'Covered braai area\nGrid and tools provided', 20),
('Armchair', 'Living Area', 'Comfortable lounge\nIndoor wood-burning stove', 30),
('Sun', 'Outdoor Area', 'Furnished stoep (veranda)\nPlunge pool\nUninterrupted mountain views', 40)
ON CONFLICT DO NOTHING;

-- Insert initial data for a sample review if the table is empty
INSERT INTO reviews (quote, author, rating, source, sort_order) VALUES
('An absolutely magical escape. The cottage is beautifully appointed and the tranquility is unparalleled. We left feeling completely recharged.', 'Sarah J.', 5.0, 'Airbnb', 10)
ON CONFLICT DO NOTHING;

-- Insert initial data for a sample FAQ if the table is empty
INSERT INTO faq (question, answer, sort_order) VALUES
('Is the cottage suitable for children?', 'To maintain the tranquil atmosphere for all our guests, the cottage is strictly for adults only. We do not accommodate children or infants.', 10),
('Can I bring my pet?', 'Unfortunately, as we are on a working farm with our own animals and free-roaming wildlife, we cannot allow any pets.', 20)
ON CONFLICT DO NOTHING;
