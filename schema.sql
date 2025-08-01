-- Property Management System Database Schema
-- Drop existing tables to start fresh
DROP TABLE IF EXISTS `maintenance_requests`, `financial_transactions`, `leases`, `tenants`, `properties`, `owners`, `admin_users`, `inquiries`;

-- Property Owners
CREATE TABLE `owners` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` text,
  `tax_id` varchar(255) DEFAULT NULL,
  `bank_account` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Properties
CREATE TABLE `properties` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` text NOT NULL,
  `city` varchar(255) NOT NULL,
  `state` varchar(255) NOT NULL,
  `zip_code` varchar(20) NOT NULL,
  `property_type` enum('single_family', 'multi_family', 'condo', 'townhouse', 'commercial') NOT NULL,
  `bedrooms` int DEFAULT NULL,
  `bathrooms` decimal(3,1) DEFAULT NULL,
  `square_feet` int DEFAULT NULL,
  `year_built` int DEFAULT NULL,
  `rent_amount` decimal(10,2) DEFAULT NULL,
  `deposit_amount` decimal(10,2) DEFAULT NULL,
  `status` enum('available', 'occupied', 'maintenance', 'off_market') DEFAULT 'available',
  `description` text,
  `amenities` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `properties_owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Tenants
CREATE TABLE `tenants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `emergency_contact` varchar(255) DEFAULT NULL,
  `emergency_phone` varchar(255) DEFAULT NULL,
  `date_of_birth` date DEFAULT NULL,
  `ssn` varchar(255) DEFAULT NULL,
  `income` decimal(10,2) DEFAULT NULL,
  `employment` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Leases
CREATE TABLE `leases` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `tenant_id` int NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `rent_amount` decimal(10,2) NOT NULL,
  `deposit_amount` decimal(10,2) NOT NULL,
  `late_fee` decimal(10,2) DEFAULT NULL,
  `pet_deposit` decimal(10,2) DEFAULT NULL,
  `status` enum('active', 'expired', 'terminated', 'pending') DEFAULT 'pending',
  `lease_document_url` varchar(500) DEFAULT NULL,
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `leases_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `leases_tenant_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Maintenance Requests
CREATE TABLE `maintenance_requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `tenant_id` int DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `priority` enum('low', 'medium', 'high', 'emergency') DEFAULT 'medium',
  `status` enum('open', 'in_progress', 'completed', 'cancelled') DEFAULT 'open',
  `category` enum('plumbing', 'electrical', 'hvac', 'appliance', 'structural', 'pest_control', 'cleaning', 'other') DEFAULT 'other',
  `estimated_cost` decimal(10,2) DEFAULT NULL,
  `actual_cost` decimal(10,2) DEFAULT NULL,
  `vendor_name` varchar(255) DEFAULT NULL,
  `vendor_phone` varchar(255) DEFAULT NULL,
  `scheduled_date` datetime DEFAULT NULL,
  `completed_date` datetime DEFAULT NULL,
  `photos` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `tenant_id` (`tenant_id`),
  CONSTRAINT `maintenance_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `maintenance_tenant_id_fk` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Financial Transactions
CREATE TABLE `financial_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `lease_id` int DEFAULT NULL,
  `transaction_type` enum('rent_payment', 'deposit', 'late_fee', 'maintenance', 'utility', 'insurance', 'tax', 'management_fee', 'other') NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `description` varchar(255) NOT NULL,
  `transaction_date` date NOT NULL,
  `payment_method` enum('check', 'bank_transfer', 'credit_card', 'cash', 'other') DEFAULT NULL,
  `reference_number` varchar(255) DEFAULT NULL,
  `status` enum('pending', 'completed', 'failed', 'cancelled') DEFAULT 'pending',
  `notes` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  KEY `lease_id` (`lease_id`),
  CONSTRAINT `transactions_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE,
  CONSTRAINT `transactions_lease_id_fk` FOREIGN KEY (`lease_id`) REFERENCES `leases` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Admin Users (for property management staff)
CREATE TABLE `admin_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` enum('admin', 'manager', 'assistant') DEFAULT 'assistant',
  `is_active` boolean DEFAULT true,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Property Images
CREATE TABLE `property_images` (
  `id` int NOT NULL AUTO_INCREMENT,
  `property_id` int NOT NULL,
  `image_url` varchar(500) NOT NULL,
  `alt_text` varchar(255) DEFAULT NULL,
  `is_primary` boolean DEFAULT false,
  `sort_order` int DEFAULT 0,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `property_id` (`property_id`),
  CONSTRAINT `images_property_id_fk` FOREIGN KEY (`property_id`) REFERENCES `properties` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Owner Portal Users
CREATE TABLE `owner_portal_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `owner_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `is_active` boolean DEFAULT true,
  `last_login` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  KEY `owner_id` (`owner_id`),
  CONSTRAINT `portal_owner_id_fk` FOREIGN KEY (`owner_id`) REFERENCES `owners` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Lead Inquiries (for marketing website)
CREATE TABLE `inquiries` (
  `id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `property_count` int DEFAULT NULL,
  `property_value` enum('under_100k', '100k_250k', '250k_500k', '500k_1m', 'over_1m') DEFAULT NULL,
  `message` text,
  `source` varchar(255) DEFAULT 'website',
  `status` enum('new', 'contacted', 'qualified', 'converted', 'lost') DEFAULT 'new',
  `assigned_to` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `assigned_to` (`assigned_to`),
  CONSTRAINT `inquiries_assigned_to_fk` FOREIGN KEY (`assigned_to`) REFERENCES `admin_users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Insert sample data for testing
INSERT INTO `admin_users` (`first_name`, `last_name`, `email`, `password_hash`, `role`) VALUES
('Admin', 'User', 'admin@propertymanagement.com', 'admin', 'admin'),
('Manager', 'User', 'manager@propertymanagement.com', 'manager', 'manager');

INSERT INTO `owners` (`first_name`, `last_name`, `email`, `phone`, `address`) VALUES
('John', 'Smith', 'john.smith@email.com', '+1-555-0123', '123 Main St, Anytown, USA'),
('Sarah', 'Johnson', 'sarah.johnson@email.com', '+1-555-0456', '456 Oak Ave, Somewhere, USA');

INSERT INTO `properties` (`owner_id`, `name`, `address`, `city`, `state`, `zip_code`, `property_type`, `bedrooms`, `bathrooms`, `rent_amount`, `deposit_amount`, `status`) VALUES
(1, 'Sunset Apartments', '123 Sunset Blvd', 'Los Angeles', 'CA', '90210', 'multi_family', 2, 1.5, 2500.00, 2500.00, 'available'),
(1, 'Downtown Loft', '456 Main St', 'Los Angeles', 'CA', '90211', 'condo', 1, 1.0, 1800.00, 1800.00, 'occupied'),
(2, 'Family Home', '789 Pine St', 'San Francisco', 'CA', '94102', 'single_family', 3, 2.0, 3500.00, 3500.00, 'available');

INSERT INTO `tenants` (`first_name`, `last_name`, `email`, `phone`) VALUES
('Mike', 'Davis', 'mike.davis@email.com', '+1-555-0789'),
('Lisa', 'Wilson', 'lisa.wilson@email.com', '+1-555-0120');

INSERT INTO `leases` (`property_id`, `tenant_id`, `start_date`, `end_date`, `rent_amount`, `deposit_amount`, `status`) VALUES
(2, 1, '2024-01-01', '2024-12-31', 1800.00, 1800.00, 'active');

INSERT INTO `maintenance_requests` (`property_id`, `tenant_id`, `title`, `description`, `priority`, `status`, `category`) VALUES
(2, 1, 'Leaky Faucet', 'Kitchen faucet is dripping constantly', 'medium', 'open', 'plumbing'),
(1, NULL, 'HVAC Maintenance', 'Annual HVAC system check and filter replacement', 'low', 'completed', 'hvac');

INSERT INTO `financial_transactions` (`property_id`, `lease_id`, `transaction_type`, `amount`, `description`, `transaction_date`, `status`) VALUES
(2, 1, 'rent_payment', 1800.00, 'Monthly rent payment', '2024-01-01', 'completed'),
(2, 1, 'rent_payment', 1800.00, 'Monthly rent payment', '2024-02-01', 'completed'),
(1, NULL, 'maintenance', 150.00, 'HVAC filter replacement', '2024-01-15', 'completed');
