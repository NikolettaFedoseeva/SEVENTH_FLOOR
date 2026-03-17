-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    district VARCHAR(255),
    price DECIMAL(15, 2) NOT NULL,
    image_url TEXT NOT NULL,
    area DECIMAL(10, 2) NOT NULL,
    rooms INT NOT NULL,
    type VARCHAR(50) NOT NULL, -- 'apartment', 'house', 'commercial', 'land'
    description TEXT,
    
    -- Common optional fields
    rent_period VARCHAR(50),
    floor INT,
    total_floors INT,
    heating VARCHAR(255),
    building_type VARCHAR(255),
    building_status VARCHAR(255),
    parking VARCHAR(255),
    source VARCHAR(255),
    verified BOOLEAN DEFAULT FALSE,
    currency VARCHAR(10),
    images JSON, -- JSON array of strings
    video_url TEXT,
    city VARCHAR(255),
    house_number VARCHAR(50),
    living_area DECIMAL(10, 2),
    kitchen_area DECIMAL(10, 2),
    ceiling_height DECIMAL(5, 2),
    layout VARCHAR(255),
    bathroom VARCHAR(255),
    balcony VARCHAR(255),
    `condition` VARCHAR(255),
    amenities JSON, -- JSON array of strings
    is_remove BOOLEAN DEFAULT FALSE,

    -- Apartment specific
    wall_material VARCHAR(255),
    position_in_building VARCHAR(255),
    apartment_series VARCHAR(255),

    -- House specific
    land_area DECIMAL(15, 2),
    sewerage VARCHAR(255),
    gas VARCHAR(255),
    water JSON, -- JSON array
    electricity BOOLEAN,
    heating_sources JSON, -- JSON array
    has_buildings VARCHAR(255),

    -- Commercial specific
    commercial_types JSON, -- JSON array

    -- Land specific
    land_type VARCHAR(255),
    road_type JSON, -- JSON array

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table for basic auth
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    full_name VARCHAR(255),
    token VARCHAR(255),
    token_expires_at DATETIME,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
