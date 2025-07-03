-- Drop tables if they exist to start clean
DROP TABLE IF EXISTS `inquiries`, `admin_users`, `page_content`, `gallery_images`, `activities`, `amenities`, `reviews`;

-- Inquiries from the contact form
CREATE TABLE `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Admin users for the portal
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- For simplicity, adding a default admin user. 
-- In a real app, use a secure password hashing library like bcrypt.
-- The password here is 'admin'.
INSERT INTO `admin_users` (`email`, `password_hash`) VALUES ('admin@example.com', 'admin');

-- Generic key-value store for text content across the site
CREATE TABLE `page_content` (
  `id` int NOT NULL AUTO_INCREMENT,
  `section` varchar(255) NOT NULL,
  `content_key` varchar(255) NOT NULL,
  `content_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `section_key` (`section`,`content_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Pre-populate with current website content
INSERT INTO `page_content` (`section`, `content_key`, `content_value`) VALUES
('hero', 'heading', 'Your Serene, Off-Grid Karoo Escape'),
('hero', 'subheading', 'Discover tranquility at Ida Olive Shepherd’s Cottage, a nature lover’s haven on a working dairy goat farm.'),
('accommodation', 'heading', 'A Cozy, Off-Grid Retreat'),
('accommodation', 'subheading', 'Experience the charm of shepherd’s cottage living, thoughtfully equipped for a comfortable and memorable stay in nature.'),
('accommodation', 'main_text', 'Ida Olive Shepherd’s Cottage is a self-catering sanctuary on the remote Giddy Goat Farm. Surrounded by the endangered Robertson Succulent Karoo, large glass sliding doors and windows seamlessly connect you to the natural beauty outside, where indigenous vegetation and wildlife thrive.'),
('accommodation', 'secondary_text', 'Completely off the grid, the cottage has no electricity. The open-plan lounge and kitchen feature a gas stove and refrigerator, while an indoor fireplace keeps the space warm on cooler nights. Solar lamps, candles, and fairy lights provide a magical ambiance.'),
('activities', 'heading', 'Reconnect with Nature & Adventure'),
('activities', 'subheading', 'From serene on-site activities to exciting local excursions, there''s something for every nature enthusiast.'),
('reviews', 'heading', 'What Our Guests Say'),
('reviews', 'subheading', 'Heartfelt words from those who have experienced the magic of Ida Olive.'),
('location', 'heading', 'Find Your Way to Paradise'),
('location', 'subheading', 'We''re nestled in the heart of the Karoo, just a few kilometers outside the charming village of McGregor.'),
('location', 'address', 'Giddy Goat Farm, 6km outside McGregor, Western Cape, South Africa'),
('location', 'email', 'reservations@idaolivecottagemcgregor.co.za'),
('location', 'phone', '+27 12 345 6789 (Sample)'),
('booking', 'heading', 'Rates & Availability'),
('booking', 'subheading', 'Ready for your peaceful escape? Check our availability or send us an enquiry.');

-- Gallery images
CREATE TABLE `gallery_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `src` varchar(255) NOT NULL,
  `alt` varchar(255) NOT NULL,
  `section` varchar(255) NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `gallery_images` (`src`, `alt`, `section`, `sort_order`) VALUES
('/Main Bedroom.jpg', 'Cozy main bedroom with a king-size bed', 'accommodation', 1),
('/Kitchen.jpg', 'Well-equipped kitchen with a gas stove', 'accommodation', 2),
('/Bathroom.jpg', 'Bathroom with a bathtub and view', 'accommodation', 3),
('/Outdoor Shower.jpg', 'An invigorating outdoor shower experience', 'accommodation', 4),
('/Fire place.jpg', 'Cozy indoor fireplace for cool nights', 'accommodation', 5),
('/Stoep.jpg', 'Relaxing stoep with a view', 'accommodation', 6);

-- Activities list
CREATE TABLE `activities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `activities` (`icon`, `title`, `description`, `sort_order`) VALUES
('Mountain', 'Hiking Trails', 'Explore the scenic beauty of the Karoo on foot with our on-site trails.', 1),
('Milk', 'Goat Experiences', 'Meet our dairy goats and enjoy a unique cheese tasting session on the farm.', 2),
('Star', 'Stargazing', 'With no light pollution, the night sky offers a breathtaking celestial display.', 3),
('Bird', 'Birdwatching', 'A haven for bird lovers, with diverse species to spot in their natural habitat.', 4),
('Wine', 'Wine Tasting', 'The McGregor and Robertson valleys offer world-class wineries just a short drive away.', 5),
('Bike', 'Mountain Biking', 'Challenge yourself on the numerous MTB routes available in the surrounding area.', 6),
('Fish', 'Fishing', 'Cast a line in nearby dams and rivers for a relaxing day by the water.', 7),
('BookOpen', 'Visit McGregor', 'Explore the charming village with its craft shops, restaurants, and theatre.', 8);

-- Amenities list
CREATE TABLE `amenities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `icon` varchar(255) NOT NULL,
  `text` varchar(255) NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `amenities` (`icon`, `text`, `sort_order`) VALUES
('BedDouble', '2 Bedrooms (King & Queen)', 1),
('BedDouble', 'Twin beds on request', 2),
('Bath', 'Indoor & Outdoor Showers', 3),
('FlameKindling', 'Cozy Indoor Fireplace', 4),
('UtensilsCrossed', 'Gas Stove & Fridge', 5),
('Star', 'Boma & Gas Braai Areas', 6),
('Waves', 'Water Tank Plunge Pool', 7),
('WifiOff', 'Completely Off-the-Grid', 8),
('Trees', 'Endangered Succulent Karoo', 9);

-- Guest Reviews
CREATE TABLE `reviews` (
  `id` int NOT NULL AUTO_INCREMENT,
  `quote` text NOT NULL,
  `author` varchar(255) NOT NULL,
  `rating` float NOT NULL,
  `sort_order` int DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `reviews` (`quote`, `author`, `rating`, `sort_order`) VALUES
('The cottage was an absolute dream! So peaceful and quiet, we felt a million miles away. The outdoor shower is a must-try.', 'Sarah L.', 5, 1),
('A perfect romantic getaway. The stars at night are unbelievable. The hosts were lovely and the goat cheese was delicious.', 'Michael B.', 5, 2),
('Great base for hiking and exploring the McGregor area. The cottage had everything we needed for a comfortable stay.', 'The van der Merwe Family', 4.5, 3),
('Waking up to the sounds of nature was the best part. A truly special place to disconnect and recharge.', 'Chloe T.', 5, 4);
