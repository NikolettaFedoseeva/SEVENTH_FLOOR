-- Очистка таблицы перед вставкой (необязательно, удалите комментарий если нужно очистить)
-- TRUNCATE TABLE properties;

-- Вставка тестовых данных
INSERT INTO properties (
    title, address, district, price, image_url, area, rooms, type, description,
    floor, total_floors, heating, parking, building_type, building_status, source, verified, currency
) VALUES 
(
    'Penthouse in Moscow City', 'Presnenskaya nab., 12', NULL, 125000000.00, 
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
    240.00, 5, 'apartment', 'Эксклюзивный пентхаус с панорамным видом на всю Москву. Дизайнерский ремонт, терраса, консьерж-сервис.', 
    65, 70, 'central', 'underground', 'new', 'delivered', 'internet', TRUE, 'usd'
),
(
    'Modern Loft Studio', 'Artplay Design Center', NULL, 18500000.00, 
    'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
    55.00, 1, 'apartment', 'Стильная студия в лофт-квартале. Высокие потолки, кирпичные стены, развитая инфраструктура.', 
    3, 5, 'autonomous', 'open', 'historic', NULL, 'newspaper', FALSE, 'usd'
),
(
    'Eco-House with Forest View', 'Barvikha Luxury Village', NULL, 45000000.00, 
    'https://images.unsplash.com/photo-1600596542815-60c37c65b567?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
    320.00, 6, 'house', 'Современный эко-дом в окружении леса. Панорамные окна, спа-зона, умный дом.', 
    NULL, NULL, 'autonomous_house', 'garage', 'new', 'under_construction', 'internet', TRUE, 'usd'
),
(
    'Business Center Office', 'White Square Business District', NULL, 22000000.00, 
    'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
    110.00, 3, 'commercial', 'Офис класса А в деловом центре столицы. Готовая отделка, подземный паркинг.', 
    4, 12, 'central', 'underground', 'standard', NULL, 'internet', FALSE, 'usd'
),
(
    'Family Apartment near Park', 'Gorky Park Area', NULL, 35000000.00, 
    'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80', 
    120.00, 4, 'apartment', 'Просторная квартира для большой семьи. Рядом парк, школы и детские сады.', 
    5, 9, 'central', 'open', 'standard', NULL, 'newspaper', TRUE, 'usd'
);
