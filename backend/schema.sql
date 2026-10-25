CREATE DATABASE IF NOT EXISTS shiva_shakti;
USE shiva_shakti;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS settings (
  id INT AUTO_INCREMENT PRIMARY KEY,
  company_name VARCHAR(100) DEFAULT 'INDORE INFRA CONSTRUCTION',
  owner_name VARCHAR(100) DEFAULT 'Roopnarayan Shukla',
  phone VARCHAR(20) DEFAULT '+91 96691 71255',
  whatsapp VARCHAR(20) DEFAULT '+91 96691 71255',
  address TEXT,
  google_maps_url TEXT,
  instagram_url TEXT,
  logo_url TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  description TEXT,
  cover_image VARCHAR(255),
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS project_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  project_id INT,
  image_url VARCHAR(255) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS services (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  icon_image VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS gallery (
  id INT AUTO_INCREMENT PRIMARY KEY,
  image_url VARCHAR(255) NOT NULL,
  category VARCHAR(50),
  caption VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS before_after (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  before_image VARCHAR(255) NOT NULL,
  after_image VARCHAR(255) NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS testimonials (
  id INT AUTO_INCREMENT PRIMARY KEY,
  client_name VARCHAR(100) NOT NULL,
  review TEXT NOT NULL,
  published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS enquiries (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100),
  project_type VARCHAR(50) NOT NULL,
  location VARCHAR(100),
  budget VARCHAR(50),
  description TEXT NOT NULL,
  status VARCHAR(20) DEFAULT 'New',
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default settings
INSERT INTO settings (company_name, owner_name, phone, whatsapp, address, google_maps_url)
SELECT * FROM (SELECT 'INDORE INFRA CONSTRUCTION', 'Roopnarayan Shukla', '+91 96691 71255', '+91 96691 71255', 'F-17, Ahinsa Tower, 7 MG Road, Near Indraprastha Tower, South Tukoganj, Indore, Madhya Pradesh, India', 'https://maps.app.goo.gl/Lk3QTTaH4tMeMPNo8') AS tmp
WHERE NOT EXISTS (
    SELECT id FROM settings WHERE id = 1
) LIMIT 1;
