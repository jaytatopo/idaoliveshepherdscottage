-- SQL Schema for Ida Olive Shepherd's Cottage Website
-- This script creates the necessary tables for managing inquiries, admin users,
-- website content, and photo galleries in a MySQL database.

--
-- Table structure for table `inquiries`
-- Stores booking inquiries submitted through the contact form.
--
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `check_in` date NOT NULL,
  `check_out` date NOT NULL,
  `guests` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Table structure for table `users`
-- Stores admin user credentials for accessing the admin portal.
--
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL COMMENT 'Store hashed passwords, not plaintext!',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Add a default admin user. 
-- IMPORTANT: Replace 'your_secure_password_hash_here' with a real, securely generated password hash.
-- In a real application, you would generate this hash using a library like bcrypt.
INSERT INTO `users` (`email`, `password_hash`) VALUES
('admin@example.com', 'your_secure_password_hash_here')
ON DUPLICATE KEY UPDATE email=email; -- Do nothing if the user already exists

--
-- Table structure for table `site_content`
-- A key-value store for editable text content on the website.
--
CREATE TABLE IF NOT EXISTS `site_content` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content_key` varchar(255) NOT NULL,
  `content_value` text NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `content_key` (`content_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Populate with some default content values
INSERT INTO `site_content` (`content_key`, `content_value`) VALUES
('hero_title', 'Your Serene, Off-Grid Karoo Escape'),
('hero_subtitle', 'Discover tranquility at Ida Olive Shepherd’s Cottage, a nature lover’s haven on a working dairy goat farm.'),
('accommodation_title', 'A Cozy, Off-Grid Retreat'),
('accommodation_subtitle', 'Experience the charm of shepherd’s cottage living, thoughtfully equipped for a comfortable and memorable stay in nature.')
ON DUPLICATE KEY UPDATE content_key=content_key; -- Do nothing if keys exist


--
-- Table structure for table `gallery_images`
-- Stores information about images for the website's photo galleries.
--
CREATE TABLE IF NOT EXISTS `gallery_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2048) NOT NULL,
  `alt_text` varchar(255) NOT NULL,
  `gallery_section` varchar(100) NOT NULL COMMENT 'e.g., ''accommodation'', ''hero''',
  `sort_order` int(11) NOT NULL DEFAULT '0',
  `uploaded_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Populate with some default gallery images
INSERT INTO `gallery_images` (`image_url`, `alt_text`, `gallery_section`, `sort_order`) VALUES
('https://placehold.co/1600x900.png', 'Panoramic view of Ida Olive Shepherds Cottage and surrounding nature', 'hero', 0),
('https://placehold.co/600x400.png', 'Cozy bedroom with a king-size bed', 'accommodation', 1),
('https://placehold.co/600x400.png', 'Open-plan living area with fireplace', 'accommodation', 2),
('https://placehold.co/600x400.png', 'Bathroom with a view of the Karoo', 'accommodation', 3),
('https://placehold.co/600x400.png', 'Outdoor shower surrounded by nature', 'accommodation', 4)
ON DUPLICATE KEY UPDATE image_url=image_url; -- Do nothing if images exist
