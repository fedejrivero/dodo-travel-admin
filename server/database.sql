-- Create database
CREATE DATABASE IF NOT EXISTS dodo_travel;
USE dodo_travel;

-- Create trips table
CREATE TABLE IF NOT EXISTS trips (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  destination VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insert sample data
INSERT INTO trips (title, description, destination, start_date, end_date, price) VALUES
('Beach Paradise', 'Relax on beautiful beaches', 'Maldives', '2024-01-15', '2024-01-22', 2500.00),
('Mountain Adventure', 'Hiking and nature exploration', 'Swiss Alps', '2024-02-10', '2024-02-20', 3200.00),
('City Break', 'Explore the city life', 'New York', '2024-03-05', '2024-03-12', 1800.00);
