INSERT INTO users (name, email, distance_travelled, gold, colour)
VALUES 
    ('Kyle McParland', 'k@k.com', 100, 5, 'GREY'),
    ('Ben Hallam', 'b@b.com', 700, 10, 'RED'),
    ('Jon Hiebert', 'j@j.com', 900, 3, 'GREEN');


INSERT INTO items (name, description, price) 
VALUES
('Hat of Wisdom', 'Increases wisdom by 5.', 3),
('Sword of Valor', 'A sharp blade that increases strength by 10.', 5);

INSERT INTO user_items (user_id, item_id) 
VALUES
    (3, 1), -- Jon owns the Hat of Wisdom
    (2, 2); -- Ben owns the Sword of Valor

INSERT INTO user_friends (user_id_1, user_id_2) 
VALUES
    (2, 1), -- Ben is friends with Kyle
    (2, 3); -- Ben is friends with Jon