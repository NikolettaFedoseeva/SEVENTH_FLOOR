-- Seed data for Seventh Floor Real Estate
-- This script adds various properties to test all types and fields

INSERT INTO properties (
    title, address, district, price, image_url, area, rooms, type, description, 
    rent_period, floor, total_floors, heating, building_type, building_status, 
    parking, source, verified, currency, images, video_url, city, house_number, 
    living_area, kitchen_area, ceiling_height, layout, room_type, bathroom, 
    balcony, `condition`, amenities, is_remove, wall_material, 
    position_in_building, apartment_series, construction_type, 
    land_area, sewerage, gas, water, electricity, heating_sources, 
    has_buildings, commercial_types, land_type, road_type
) VALUES 
-- 1. Apartment (Sale) - Premium
(
    'Пентхаус с видом на Днестр', 'наб. Набережная, 1', 'Центр', 150000.00, 
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800', 
    142.00, 4, 'apartment', 
    'Эксклюзивное предложение. Пентхаус в новом доме. Панорамное остекление, огромная терраса, дизайнерский ремонт.', 
    'sale', 10, 10, 'autonomous_apt', 'monolith', 'commissioned', 'underground', 'internet', true, 'usd', 
    '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800", "https://images.unsplash.com/photo-1600607687940-47de34b6933c?auto=format&fit=crop&w=800"]', 
    null, 'Tiraspol', '1', 95.00, 22.00, 3.20, 'separate', 'separate', 'multiple', '4+', 'euro', 
    '["ac", "furniture", "appliances", "warm_floor", "security", "intercom", "cctv"]', false, 'monolith', 'middle', 'individual', 'commissioned',
    null, null, null, null, null, null, null, null, null, null
),

-- 2. House (Sale) - Family Estate
(
    'Загородный дом с садом', 'ул. Вишневая, 22', 'Западный', 85000.00, 
    'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800', 
    180.00, 5, 'house', 
    'Продается уютный дом для большой семьи. На участке есть гараж, летняя кухня, молодой сад. Дом утеплен.', 
    'sale', 1, 2, 'autonomous_house', 'brick', 'commissioned', 'garage', 'newspaper', false, 'usd', 
    '["https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Bender', '22', 110.00, 18.00, 2.90, null, null, 'separate', '1', 'excellent', 
    '["garage", "cellar", "terrace", "furniture"]', false, 'brick', null, null, null,
    12.00, 'central', 'connected', '["central"]', true, '["gas", "fireplace"]', 'capital', null, null, null
),

-- 3. Apartment (Rent) - Modern Studio
(
    'Современная студия в центре', 'ул. 25 Октября, 100', 'Центр', 450.00, 
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800', 
    35.00, 1, 'apartment', 
    'Стильная студия со всем необходимым. Идеально для одного человека или пары. Рядом парк, супермаркеты.', 
    'monthly', 4, 9, 'autonomous_apt', 'monolith', 'commissioned', 'open', 'internet', true, 'usd', 
    '["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800", "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '100', 25.00, 0.00, 2.80, 'studio', 'separate', 'combined', '1', 'euro', 
    '["ac", "furniture", "appliances", "internet", "cctv"]', false, 'monolith', 'middle', 'individual', 'new',
    null, null, null, null, null, null, null, null, null, null
),

-- 4. Land (Sale) - Plot for Building
(
    'Участок под строительство дома', 'ул. Озерная, 5', null, 15000.00, 
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', 
    0.00, 0, 'land', 
    'Отличный ровный участок в развивающемся районе. Все центральные коммуникации проходят по границе.', 
    'sale', null, null, null, null, null, 'none', 'internet', false, 'usd', 
    '["https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Sukleia', '5', null, null, null, null, null, null, null, null, 
    null, false, null, null, null, null,
    8.00, 'none', 'possible', '["central"]', true, null, 'none', null, 'construction', '["asphalt"]'
),

-- 5. Commercial Office (Sale)
(
    'Офисное помещение в бизнес-центре', 'ул. Свердлова, 25', 'Центр', 65000.00, 
    'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800', 
    55.00, 2, 'commercial_office', 
    'Готовое офисное помещение. 2 кабинета + приемная. Свежий офисный ремонт, кондиционеры, оптоволокно.', 
    'sale', 3, 5, 'central', 'monolith', 'commissioned', 'open', 'internet', true, 'usd', 
    '["https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '25', null, null, 3.00, 'separate', null, 'combined', 'none', 'no_repair', 
    '["ac", "security", "internet", "cctv"]', false, 'monolith', 'middle', 'individual', 'commissioned',
    null, 'central', 'connected', '["central"]', true, null, null, '["office"]', null, '["asphalt"]'
),

-- 6. Room (Sale)
(
    'Комната в 102 серии', 'ул. Юности, 34', 'Октябрьский', 9200.00, 
    'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800', 
    16.50, 1, 'room', 
    'Продается уютная комната. В блоке чисто, адекватные соседи. Стеклопакеты, новая дверь.', 
    'sale', 2, 5, 'central', 'limestone', 'commissioned', 'none', 'newspaper', false, 'usd', 
    '["https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '34', 16.50, null, 265, 'separate', 'separate', 'separate', 'none', 'after_cosmetic', 
    '["windows", "armored_door", "internet"]', false, 'limestone', 'middle', '102', 'standard',
    null, null, null, null, null, null, null, null, null, null
),

-- 7. Dacha (Sale)
(
    'Дача на берегу реки', 'СОТ Дружба', null, 18500.00, 
    'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800', 
    50.00, 3, 'dacha', 
    'Домик в 2 этажа (мансарда). Кирпичный, сухой. Плодоносящие деревья, виноградник, выход к воде.', 
    'sale', 1, 2, 'none', 'brick', 'commissioned', 'open', 'internet', false, 'usd', 
    '["https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Ternovka', null, 35.00, 8.00, 250, null, null, 'combined', '1', 'cosmetic_repair', 
    '["cellar", "terrace", "attic"]', false, 'brick', null, null, null,
    6.00, 'autonomous', 'none', '["well"]', true, '["fireplace"]', 'started', null, 'dacha', '["dirt"]'
),

-- 8. Garage (Sale)
(
    'Гараж в подземном паркинге', 'ул. Шевченко, 50', 'Колкотовый рынок', 11500.00, 
    'https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800', 
    18.00, 0, 'garage', 
    'Продам машиноместо в теплом охраняемом паркинге. Удобный въезд, круглосуточное видеонаблюдение.', 
    'sale', null, null, 'none', null, null, 'underground', 'internet', true, 'usd', 
    '["https://images.unsplash.com/photo-1595113316349-9fa4ee24f884?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '50', null, null, 400, null, null, null, null, null, 
    '["security", "cctv"]', false, 'monolith', null, null, null,
    null, null, null, null, true, null, null, null, null, '["asphalt"]'
),

-- 9. Commercial Warehouse (Rent)
(
    'Складское помещение + рампа', 'ул. Шутова, 10', 'Промышленный', 250.00, 
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800', 
    350.00, 0, 'commercial_warehouse', 
    'Сдается склад. Высокие потолки (6м), бетонный пол, большие ворота под фуру. Есть санузел и бытовка.', 
    'monthly', 1, 1, 'none', 'block', null, 'open', 'internet', false, 'usd', 
    '["https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '10', null, null, 600, null, null, 'separate', null, 'no_repair', 
    '["security", "cctv"]', false, 'block', null, null, null,
    null, 'central', 'none', '["central"]', true, null, null, '["warehouse"]', null, '["asphalt"]'
),

-- 10. Apartment (Exchange)
(
    'Обмен 3-комнатной на 1-комнатную + доплата', 'ул. Каховская, 15', 'Октябрьский', 0.00, 
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800', 
    72.00, 3, 'apartment', 
    'Меняю просторную 3-комнатную квартиру на 1-комнатную в этом же районе с вашей доплатой. Рассмотрим варианты.', 
    'sale', 5, 9, 'central', 'panel', 'commissioned', 'open', 'newspaper', false, 'usd', 
    '["https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&q=80&w=800"]', 
    null, 'Tiraspol', '15', 45.00, 9.00, 265, 'separate', 'separate', 'separate', '2', 'cosmetic_repair', 
    '["intercom", "internet", "phone"]', false, 'panel', 'middle', '143', 'standard',
    null, null, null, null, null, null, null, null, null, null
);
