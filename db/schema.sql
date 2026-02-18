-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    address TEXT NOT NULL,
    district TEXT,
    price NUMERIC NOT NULL,
    image_url TEXT NOT NULL,
    area NUMERIC NOT NULL,
    rooms INTEGER NOT NULL,
    type TEXT NOT NULL, -- 'apartment', 'house', 'commercial', 'land'
    description TEXT,
    
    -- Common optional fields
    rent_period TEXT,
    floor INTEGER,
    total_floors INTEGER,
    heating TEXT,
    building_type TEXT,
    building_status TEXT,
    parking TEXT,
    source TEXT,
    verified BOOLEAN DEFAULT FALSE,
    currency TEXT,
    images TEXT[], -- Array of strings
    video_url TEXT,
    city TEXT,
    house_number TEXT,
    living_area NUMERIC,
    kitchen_area NUMERIC,
    ceiling_height NUMERIC,
    layout TEXT,
    bathroom TEXT,
    balcony TEXT,
    condition TEXT,
    amenities TEXT[],

    -- Apartment specific
    wall_material TEXT,
    position_in_building TEXT,
    apartment_series TEXT,

    -- House specific
    land_area NUMERIC,
    sewerage TEXT,
    gas TEXT,
    water TEXT[],
    electricity BOOLEAN,
    heating_sources TEXT[],
    has_buildings BOOLEAN,

    -- Commercial specific
    commercial_types TEXT[],

    -- Land specific
    land_type TEXT,
    road_type TEXT[],

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
