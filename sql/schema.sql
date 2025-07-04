-- Ida Olive Shepherd's Cottage - PostgreSQL Schema
-- This script sets up all the necessary tables and default data for the website.
-- To use: Copy and paste the entire script into the Neon SQL Editor and run it.

-- Drop existing tables (optional, useful for a clean reset)
DROP TABLE IF EXISTS "page_content", "amenities", "facilities", "activities", "gallery_images", "reviews", "inquiries", "faq", "page_sections";

-- Table: page_sections
-- Manages the visibility and order of sections on the homepage.
CREATE TABLE "page_sections" (
  "id" SERIAL PRIMARY KEY,
  "section_type" VARCHAR(50) UNIQUE NOT NULL,
  "title" VARCHAR(100) NOT NULL,
  "is_visible" BOOLEAN DEFAULT true,
  "sort_order" INTEGER DEFAULT 0
);

-- Table: page_content
-- Stores all the editable text content for the website.
CREATE TABLE "page_content" (
  "id" SERIAL PRIMARY KEY,
  "section" VARCHAR(50) NOT NULL,
  "content_key" VARCHAR(50) NOT NULL,
  "content_value" TEXT,
  UNIQUE("section", "content_key")
);

-- Table: amenities
-- Stores the list of amenities with icons.
CREATE TABLE "amenities" (
  "id" SERIAL PRIMARY KEY,
  "icon" VARCHAR(50) NOT NULL,
  "text" VARCHAR(255) NOT NULL,
  "sort_order" INTEGER DEFAULT 0
);

-- Table: facilities
-- Stores the categorized list of facilities.
CREATE TABLE "facilities" (
  "id" SERIAL PRIMARY KEY,
  "icon" VARCHAR(50) NOT NULL,
  "category" VARCHAR(100) NOT NULL,
  "items" TEXT,
  "sort_order" INTEGER DEFAULT 0
);

-- Table: activities
-- Stores nearby activities with descriptions and images.
CREATE TABLE "activities" (
  "id" SERIAL PRIMARY KEY,
  "icon" VARCHAR(50) NOT NULL,
  "title" VARCHAR(255) NOT NULL,
  "description" TEXT,
  "image_src" TEXT,
  "sort_order" INTEGER DEFAULT 0
);

-- Table: gallery_images
-- Stores all images used across the site, identified by a section key.
CREATE TABLE "gallery_images" (
  "id" SERIAL PRIMARY KEY,
  "src" TEXT NOT NULL,
  "alt" VARCHAR(255) NOT NULL,
  "section" VARCHAR(50) NOT NULL,
  "sort_order" INTEGER DEFAULT 0
);

-- Table: reviews
-- Stores guest reviews and ratings.
CREATE TABLE "reviews" (
  "id" SERIAL PRIMARY KEY,
  "quote" TEXT NOT NULL,
  "author" VARCHAR(100) NOT NULL,
  "rating" NUMERIC(2,1) NOT NULL,
  "source" VARCHAR(50),
  "sort_order" INTEGER DEFAULT 0
);

-- Table: inquiries
-- Stores messages submitted through the contact/booking form.
CREATE TABLE "inquiries" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(255) NOT NULL,
  "email" VARCHAR(255) NOT NULL,
  "phone" VARCHAR(50),
  "check_in" DATE,
  "check_out" DATE,
  "guests" INTEGER,
  "message" TEXT,
  "created_at" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Table: faq
-- Stores frequently asked questions and answers.
CREATE TABLE "faq" (
  "id" SERIAL PRIMARY KEY,
  "question" TEXT NOT NULL,
  "answer" TEXT NOT NULL,
  "sort_order" INTEGER DEFAULT 0
);

-- --- DEFAULT DATA INSERTION ---

-- Insert default page section layout
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
('cta', 'Call To Action', true, 120),
('video', 'Video', true, 130);

-- Insert default page content
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

-- Insert default amenities
INSERT INTO "amenities" ("icon", "text", "sort_order") VALUES
('BedDouble', '2 Bedrooms (King & Queen)', 1),
('Bath', 'Indoor & Outdoor Showers', 3),
('FlameKindling', 'Cozy Indoor Fireplace', 4),
('UtensilsCrossed', 'Gas Stove & Fridge', 5),
('Wind', 'Boma & Gas Braai Areas', 6),
('Waves', 'Plunge Pool', 7),
('ZapOff', 'Completely Off-the-Grid', 8);

-- Insert default FAQs
INSERT INTO "faq" ("question", "answer", "sort_order") VALUES
('Is the cottage suitable for children?', 'To maintain a tranquil environment for all our guests, Ida Olive is strictly an adults-only retreat. We cannot accommodate children or infants.', 10),
('Can I bring my pet?', 'Unfortunately, as we are on a working farm with our own animals and abundant wildlife, we cannot allow any pets.', 20),
('Is there electricity and Wi-Fi?', 'The cottage is completely off-grid. There is no mains electricity or Wi-Fi. We provide solar lights, candles, and a small solar charger for USB devices. It''s the perfect opportunity to unplug!', 30),
('What should I bring?', 'We recommend bringing your own drinking water, sturdy walking shoes, a good book, and a sense of adventure. Don''t forget your camera for the incredible views and stars!', 40);

-- Insert default reviews
INSERT INTO "reviews" ("quote", "author", "rating", "source", "sort_order") VALUES
('Adventure, relaxing, secluded, peaceful. We had a truly wonderful stay at Ida Olive Cottage. The cottage is perfectly secluded, surrounded by the stunning natural beauty of the Karoo... The peacefulness and tranquility were exactly what we needed.', 'Jacques V.', 5.0, 'Lekkerslaap', 1),
('We absolutely loved this place! Beautiful peaceful location, clean, comfortable and so well thought out. Tina was a great host! We really hope to come back one day.', 'Francisca', 5.0, 'Airbnb', 2),
('Perfect spot for a weekend getaway! We had a wonderful weekend... The night skies were stunning, and Tina was a fantastic host—thoughtful and attentive to every detail. It was everything we hoped for. Highly recommended!', 'Matthew K.', 5.0, 'Lekkerslaap', 3),
('We had a truly unforgettable stay at this charming cabin... If you’re looking to disconnect from the hustle and immerse yourself in a beautiful, tranquil setting, this cabin is a gem. We left feeling refreshed and reconnected.', 'Eugene', 5.0, 'Airbnb', 4);

-- Insert default facilities
INSERT INTO "facilities" ("icon", "category", "items", "sort_order") VALUES
('ZapOff', 'Power & Tech', 'Completely off-grid (no mains electricity).\nSolar lamps, candles, and fairy lights for ambiance.\nMini solar panel for phones & USB devices.\nNo Wi-Fi, limited mobile signal in spots.', 10),
('UtensilsCrossed', 'Kitchen & Living', 'Fully-equipped open-plan kitchen.\nGas stove and gas refrigerator.\nAll necessary kitchenware provided.\nCozy lounge with indoor fireplace.', 20),
('Sun', 'Outdoor Living', 'Private plunge pool.\nShaded patio (stoep) with dining area.\nBoma-style braai for cooking under the stars.\nConvenient gas braai on the verandah.', 30),
('Car', 'Parking & Access', 'Free, secure private parking on-site.\nAccessed via a gravel road (suitable for most vehicles).\nLocated on a remote, working farm.', 40);

-- Insert default activities
INSERT INTO "activities" ("icon", "title", "description", "sort_order") VALUES
('Mountain', 'Hiking Trails', 'Explore the scenic beauty of the Karoo on foot with our on-site trails.', 1),
('Milk', 'Goat Experiences', 'Meet our dairy goats and enjoy a unique cheese tasting session on the farm.', 2),
('Star', 'Stargazing', 'With no light pollution, the night sky offers a breathtaking celestial display.', 3),
('Bird', 'Birdwatching', 'A haven for bird lovers, with diverse species to spot in their natural habitat.', 4),
('Wine', 'Wine Tasting', 'The McGregor and Robertson valleys offer world-class wineries just a short drive away.', 5),
('Bike', 'Mountain Biking', 'Challenge yourself on the numerous MTB routes available in the surrounding area.', 6);


-- Example placeholder image. Add your own images through the admin panel.
INSERT INTO "gallery_images" ("src", "alt", "section", "sort_order") VALUES
('https://placehold.co/800x600.png', 'Placeholder hero image', 'hero', 0);


-- --- END OF SCRIPT ---
SELECT 'Database schema and default data created successfully.';
