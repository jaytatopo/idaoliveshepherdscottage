-- This script sets up the database schema for the Ida Olive Shepherd's Cottage website.
-- It's designed for PostgreSQL and is idempotent, meaning it can be run multiple times
-- without causing errors, as it drops existing tables before recreating them.

-- To use this script:
-- 1. Connect to your PostgreSQL database (e.g., a Neon serverless database).
-- 2. Copy and paste the entire contents of this file into a SQL editor.
-- 3. Run the script. This will create all necessary tables and populate them with default content.

-- Table for storing general page content (headings, paragraphs, etc.)
DROP TABLE IF EXISTS "page_content";
CREATE TABLE "page_content" (
  "id" serial PRIMARY KEY,
  "section" varchar(100) NOT NULL,
  "content_key" varchar(100) NOT NULL,
  "content_value" text,
  "created_at" timestamp DEFAULT now(),
  UNIQUE ("section", "content_key")
);

-- Table for amenities (e.g., Wi-Fi, Fireplace)
DROP TABLE IF EXISTS "amenities";
CREATE TABLE "amenities" (
  "id" serial PRIMARY KEY,
  "icon" varchar(50) NOT NULL,
  "text" varchar(255) NOT NULL,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Table for facilities (e.g., Kitchen, Outdoor)
DROP TABLE IF EXISTS "facilities";
CREATE TABLE "facilities" (
  "id" serial PRIMARY KEY,
  "icon" varchar(50) NOT NULL,
  "category" varchar(255) NOT NULL,
  "items" text,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Table for nearby activities
DROP TABLE IF EXISTS "activities";
CREATE TABLE "activities" (
  "id" serial PRIMARY KEY,
  "icon" varchar(50) NOT NULL,
  "title" varchar(255) NOT NULL,
  "description" text,
  "image_src" text,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Table for gallery images. The `src` column stores the image as a base64 data URI.
DROP TABLE IF EXISTS "gallery_images";
CREATE TABLE "gallery_images" (
  "id" serial PRIMARY KEY,
  "src" text NOT NULL, -- Changed from varchar(255) to text to accommodate base64 URIs
  "alt" text,
  "section" varchar(100),
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Table for guest reviews
DROP TABLE IF EXISTS "reviews";
CREATE TABLE "reviews" (
  "id" serial PRIMARY KEY,
  "quote" text NOT NULL,
  "author" varchar(255) NOT NULL,
  "rating" decimal(2,1) NOT NULL,
  "source" varchar(100),
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);

-- Table for contact form inquiries
DROP TABLE IF EXISTS "inquiries";
CREATE TABLE "inquiries" (
  "id" serial PRIMARY KEY,
  "name" varchar(255) NOT NULL,
  "email" varchar(255) NOT NULL,
  "phone" varchar(50),
  "check_in" date,
  "check_out" date,
  "guests" integer,
  "message" text,
  "created_at" timestamp DEFAULT now()
);

-- Table to control the order and visibility of page sections
DROP TABLE IF EXISTS "page_sections";
CREATE TABLE "page_sections" (
  "id" serial PRIMARY KEY,
  "section_type" varchar(50) NOT NULL UNIQUE,
  "title" varchar(100) NOT NULL,
  "is_visible" boolean DEFAULT true,
  "sort_order" integer DEFAULT 0
);

-- Table for Frequently Asked Questions
DROP TABLE IF EXISTS "faq";
CREATE TABLE "faq" (
  "id" serial PRIMARY KEY,
  "question" text NOT NULL,
  "answer" text NOT NULL,
  "sort_order" integer DEFAULT 0,
  "created_at" timestamp DEFAULT now()
);


--
-- INSERT DEFAULT DATA
-- This data provides a starting point for the website content.
-- It can be edited later through the admin dashboard.
--

-- Default Page Content
INSERT INTO "page_content" ("section", "content_key", "content_value") VALUES
('hero', 'heading', 'Ida Olive Shepherd’s Cottage'),
('hero', 'subheading', 'A rustic, off-the-grid, self-catering retreat for adults seeking a peaceful and romantic Karoo escape.'),
('accommodation', 'heading', 'The Cottage: Rustic Luxe Meets Off-Grid Charm'),
('accommodation', 'subheading', 'Experience the authentic Karoo in a beautifully restored shepherd''s cottage, blending original character with modern comforts.'),
('accommodation', 'main_text', 'Ida Olive Shepherd''s Cottage is a sanctuary on the Giddy Goat Farm—a working dairy goat farm and wildlife sanctuary. It features beautifully restored stone and timber architecture, offering a unique "rustic-luxe" feel.\n\nThe property is completely off-grid, making it ideal for nature lovers wanting to disconnect and reconnect with the serene surroundings of the endangered Robertson Succulent Karoo.'),
('accommodation', 'secondary_text', 'The cottage accommodates a maximum of 4 adults, perfect for a romantic getaway or a quiet retreat with friends. It includes two bedrooms (one king, one queen) and a main bathroom with a bath, walk-in indoor shower, and a separate outdoor shower for a truly immersive nature experience.'),
('amenities', 'heading', 'Amenities'),
('amenities', 'subheading', 'Curated comforts for an unforgettable off-grid experience.'),
('facilities', 'heading', 'Facilities'),
('facilities', 'subheading', 'Details about what the cottage includes.'),
('activities', 'heading', 'Explore & Experience'),
('activities', 'subheading', 'Enjoy on-site hiking, birdwatching, and unique "goat experiences." The lack of light pollution makes for exceptional stargazing. Nearby, explore McGregor''s wineries, restaurants, and the Vrolijkheid Nature Reserve.'),
('booking', 'heading', 'Rates & Availability'),
('booking', 'subheading', 'Ready for your peaceful escape? Check availability below or send us an enquiry.'),
('booking', 'rules_items', 'Strictly for adults only. No children or infants.\nNo pets allowed.\nNo parties or events.\nSmoking is not permitted on the property.'),
('booking', 'checkin_items', 'Check-in is from 14:00. Closing times vary by booking site (17:00-20:00). Please confirm your arrival time.\nCheck-out is between 10:00 and 11:00.\nDaily cleaning is not included but can be arranged for longer stays.'),
('booking', 'practical_items', 'Guests are advised to bring their own drinking water.\nWe are off-grid: there is no Wi-Fi and limited mobile signal.\nPlease bring cash for any on-site extras like farm produce.'),
('reviews', 'heading', 'What Our Guests Say'),
('reviews', 'subheading', 'Heartfelt words from those who have experienced the magic of Ida Olive.'),
('location', 'heading', 'Find Your Way to Paradise'),
('location', 'subheading', 'We''re nestled in a remote wildlife sanctuary on Rheeboks Kraal Farm, just 6km outside the historic village of McGregor. Access is via a gravel road.'),
('location', 'address', 'Rheeboks Kraal Farm, McGregor, 6708, Western Cape'),
('location', 'email', 'reservations@idaolivecottagemcgregor.co.za'),
('location', 'phone', '+27 12 345 6789'),
('location', 'facebook_url', ''),
('location', 'instagram_url', ''),
('faq', 'heading', 'Frequently Asked Questions'),
('faq', 'subheading', 'Your questions, answered.'),
('host', 'heading', 'Meet Your Hosts'),
('host', 'subheading', 'We''re delighted to welcome you to our little piece of paradise.'),
('host', 'name', 'Tina & The Giddy Goats'),
('host', 'bio', 'As your hosts, we are passionate about sustainable living, conservation, and sharing the unique beauty of the Karoo. We live on the farm and are available to assist with anything you need, from farm-fresh goat milk for your coffee to recommendations for local activities. Our goal is to make your stay unforgettable.'),
('cta', 'heading', 'Ready for a Digital Detox?'),
('cta', 'subheading', 'Escape the noise. Reconnect with nature. Find your peace at Ida Olive.'),
('cta', 'button_text', 'Book Your Escape Now'),
('cta', 'button_url', '#booking'),
('video', 'heading', 'A Glimpse of Ida Olive'),
('video', 'subheading', 'Press play and transport yourself to the tranquility of the Karoo.'),
('video', 'url', 'https://www.youtube.com/embed/dQw4w9WgXcQ');

-- Default Amenities
INSERT INTO "amenities" ("icon", "text", "sort_order") VALUES
('BedDouble', '2 Bedrooms (King & Queen)', 1),
('BedDouble', 'Twin beds on request', 2),
('Bath', 'Indoor & Outdoor Showers', 3),
('FlameKindling', 'Cozy Indoor Fireplace', 4),
('UtensilsCrossed', 'Gas Stove & Fridge', 5),
('Star', 'Boma & Gas Braai Areas', 6),
('Waves', 'Water Tank Plunge Pool', 7),
('WifiOff', 'Completely Off-the-Grid', 8),
('Trees', 'Endangered Succulent Karoo', 9);

-- Default Facilities
INSERT INTO "facilities" ("category", "icon", "items", "sort_order") VALUES
('Power & Tech', 'ZapOff', 'Completely off-grid (no mains electricity).\nSolar lamps, candles, and fairy lights for ambiance.\nMini solar panel for phones & USB devices.\nNo Wi-Fi, limited mobile signal in spots.', 10),
('Kitchen & Living', 'UtensilsCrossed', 'Fully-equipped open-plan kitchen.\nGas stove and gas refrigerator.\nAll necessary kitchenware provided.\nCozy lounge with indoor fireplace.', 20),
('Outdoor Living', 'Sun', 'Private plunge pool.\nShaded patio (stoep) with dining area.\nBoma-style braai for cooking under the stars.\nConvenient gas braai on the verandah.', 30),
('Parking & Access', 'Car', 'Free, secure private parking on-site.\nAccessed via a gravel road (suitable for most vehicles).\nLocated on a remote, working farm.', 40);

-- Default Activities
INSERT INTO "activities" ("icon", "title", "description", "sort_order") VALUES
('Mountain', 'Hiking Trails', 'Explore the scenic beauty of the Karoo on foot with our on-site trails.', 1),
('Milk', 'Goat Experiences', 'Meet our dairy goats and enjoy a unique cheese tasting session on the farm.', 2),
('Star', 'Stargazing', 'With no light pollution, the night sky offers a breathtaking celestial display.', 3),
('Bird', 'Birdwatching', 'A haven for bird lovers, with diverse species to spot in their natural habitat.', 4),
('Wine', 'Wine Tasting', 'The McGregor and Robertson valleys offer world-class wineries just a short drive away.', 5),
('Bike', 'Mountain Biking', 'Challenge yourself on the numerous MTB routes available in the surrounding area.', 6),
('Fish', 'Fishing', 'Cast a line in nearby dams and rivers for a relaxing day by the water.', 7),
('BookOpen', 'Visit McGregor', 'Explore the charming village with its craft shops, restaurants, and theatre.', 8);

-- Default Reviews
INSERT INTO "reviews" ("quote", "author", "rating", "source", "sort_order") VALUES
('Adventure, relaxing, secluded, peaceful. We had a truly wonderful stay...', 'Jacques V.', 5.0, 'Lekkerslaap', 1),
('We absolutely loved this place! Beautiful peaceful location, clean, comfortable and so well thought out. Tina was a great host! We really hope to come back one day.', 'Francisca', 5.0, 'Airbnb', 2),
('Perfect spot for a weekend getaway! We had a wonderful weekend at Ida Olive Shepherd''s Cottage. The location is peaceful and perfect for a relaxing getaway, with easy access to McGregor and Robertson. The night skies were stunning, and Tina was a fantastic host—thoughtful and attentive to every detail. It was everything we hoped for. Highly recommended!', 'Matthew K.', 5.0, 'Lekkerslaap', 3);

-- Default Page Section Order
INSERT INTO "page_sections" ("section_type", "title", "is_visible", "sort_order") VALUES
('hero', 'Hero', true, 10),
('accommodation', 'Accommodation', true, 20),
('amenities', 'Amenities', true, 30),
('facilities', 'Facilities', true, 40),
('activities', 'Activities', true, 50),
('gallery', 'Gallery', true, 60),
('booking', 'Rates & Booking', true, 70),
('reviews', 'Reviews', true, 80),
('location', 'Location', true, 90),
('host', 'Host Profile', true, 100),
('faq', 'FAQ', true, 110),
('video', 'Video', false, 120),
('cta', 'Call To Action', true, 130);

-- Default FAQs
INSERT INTO "faq" ("question", "answer", "sort_order") VALUES
('Is the cottage suitable for children?', 'To maintain a tranquil environment for all our guests, Ida Olive is strictly an adults-only retreat. We cannot accommodate children or infants.', 10),
('Can I bring my pet?', 'Unfortunately, as we are on a working farm with our own animals and abundant wildlife, we cannot allow any pets.', 20),
('Is there electricity and Wi-Fi?', 'The cottage is completely off-grid. There is no mains electricity or Wi-Fi. We provide solar lights, candles, and a small solar charger for USB devices. It''s the perfect opportunity to unplug!', 30),
('What should I bring?', 'We recommend bringing your own drinking water, sturdy walking shoes, a good book, and a sense of adventure. Don''t forget your camera for the incredible views and stars!', 40);
