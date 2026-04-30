insert into product (id, article, article_normalized, brand, name, line_text, rating, reviews_count, image) values
('oe31601', 'OE31601', 'OE31601', 'AZUMI', 'Фильтр масляный', 'Сервисный интервал — по регламенту производителя', 4.7, 128, 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?auto=format&fit=crop&w=720&q=80'),
('4144109100', '4144109100', '4144109100', 'SSANGYONG', 'Ступица передняя в сборе (пример из каталога)', 'Оригинальная позиция по схеме FRT HUB & DISC', 4.9, 42, 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80');

insert into product_badge (product_id, badge) values
('oe31601', 'В наличии на складе'),
('oe31601', 'Подбор по VIN'),
('4144109100', 'Оригинал'),
('4144109100', 'Проверка по VIN');

insert into recommended_offer (id, product_id, title, price, currency, delivery, highlight) values
('r1', 'oe31601', 'Наш склад · под заказ 1 день', 612, '₽', 'Завтра', true),
('r2', 'oe31601', 'Партнёр · Москва', 589, '₽', '2–3 дня', false),
('r3', 'oe31601', 'Партнёр · регион', 540, '₽', '4–6 дней', false),
('y1', '4144109100', 'Alliance · оригинал', 18490, '₽', '3 дня', true),
('y2', '4144109100', 'Аналог премиум', 13250, '₽', '1 день', false);

insert into product_offer (id, product_id, supplier, price, stock_text, city) values
('o1', 'oe31601', 'Alliance Север', 612, '12 шт.', 'СПб'),
('o2', 'oe31601', 'Alliance Юг', 598, '8 шт.', 'Краснодар'),
('o3', 'oe31601', 'Партнёр A', 575, 'Под заказ', 'Москва'),
('yo1', '4144109100', 'Центральный склад', 18490, '2 шт.', 'Москва');

insert into product_analog (id, product_id, brand, article, name) values
('a1', 'oe31601', 'PARTRA', 'FO7028', 'Фильтр масляный'),
('a2', 'oe31601', 'LECAR', 'LECAR000162501', 'Фильтр масляный'),
('ya1', '4144109100', 'PARTS MALL', 'PXHB-001', 'Ступица в сборе');

insert into analog_offer (analog_id, supplier, price) values
('a1', 'Склад East', 499),
('a2', 'Склад West', 512),
('ya1', 'Партнёр', 11990);

insert into garage_car (id, label, subtitle, vin, catalog_hint) values
('g1', 'SSANGYONG Kyron', '2.0 Xdi 4x4 · D20DT · 2007', '—', 'Узлы: CHASSIS → FRT HUB & DISC'),
('g2', 'PEUGEOT 3008', 'P84E · 1.6 THP · 2016', 'VF3MJAHXVGS314095', 'Оригинальный каталог: тормозной диск задний');

insert into catalog_group (id, title, count_text) values
('maint', 'ТО и расходники', '24 675'),
('brake', 'Тормозная система', '18 392'),
('susp', 'Подвеска', '16 834'),
('body', 'Кузов и оптика', '22 106');

insert into vehicle_lookup (vin, brand, model, generation, model_year, engine) values
('VF3MJAHXVGS314095', 'PEUGEOT', '3008', 'II (P84E)', '2016', '1.6 THP');
