INSERT INTO users (name, email, distance_travelled_today, total_distance_travelled, last_total_distance, gold, colour)
VALUES 
    ('Kyle McParland', 'k@k.com', 1000, 0, 0, 6, 'blue'),
    ('Ben Hallam', 'b@b.com', 300, 0, 0, 20, 'red'),
    ('Jon Hiebert', 'j@j.com', 0, 0, 0, 15, 'green'),
    ('Leeroy Walker', 'j@l.com', 324, 0, 99, 15, 'pink'),
    ('Jenna Johnson', 'y@j.com', 44, 0, 0, 431, 'purple');

INSERT INTO items (name, type, description, price, image) VALUES 
    ('Hat of Wisdom', 'hat', 'Increases wisdom by 5.', 3, 'hat1.png'),
    ('Cap of Agility', 'hat', 'A lightweight cap that boosts agility by 3.', 2, 'hat2.png'),
    ('Helm of Endurance', 'hat', 'A sturdy helm that increases endurance by 7.', 6, 'hat3.png'),
    ('Crown of Mystics', 'hat', 'An ornate crown that enhances magic power by 10.', 10, 'hat4.png'),
    ('Tunic of the Adventurer', 'shirt', 'A basic tunic that increases dexterity by 1.', 3, 'shirt1.png'),
    ('Robe of the Magi', 'shirt', 'A flowing robe that increases magic resistance by 8.', 7, 'shirt2.png'),
    ('Vest of Vigor', 'shirt', 'A leather vest that boosts health by 15.', 6, 'shirt3.png'),
    ('Chainmail Shirt', 'shirt', 'A shirt made of chainmail that adds armor by 10.', 8, 'shirt4.png'),
    ('Leggings of Speed', 'pants', 'Light leggings that increase speed by 5.', 4, 'pants1.png'),
    ('Pants of Might', 'pants', 'Durable pants that increase strength by 4.', 5, 'pants2.png'),
    ('Greaves of Fortitude', 'pants', 'Metal greaves that boost armor by 7.', 7, 'pants3.png'),
    ('Trousers of Luck', 'pants', 'Comfortable trousers that improve critical chance by 2%.', 3, 'pants4.png'),
    ('Boots of Swiftness', 'boots', 'Sturdy boots that increase movement speed by 3.', 4, 'boots1.png'),
    ('Sandals of Serenity', 'boots', 'Simple sandals that improve focus and mana regeneration.', 3, 'boots2.png'),
    ('Basic Sword', 'weapon', 'A sharp blade that increases strength by 5.', 5, 'sword1.png'),
    ('Sword of Might', 'weapon', 'A royal blade that increases strength by 10.', 10, 'sword2.png'),
    ('Staff of Fire', 'weapon', 'A magical staff that enables fire spells.', 10, 'staff1.png'),
    ('Bow of Precision', 'weapon', 'A fine-crafted bow that increases critical hit chance.', 7, 'bow1.png');

INSERT INTO user_items (user_id, item_id) VALUES 
    (1, 1), (1, 2), (1, 5), (1, 6), (1, 12), (1, 13), (1, 14), (1, 16), (1, 17),
    (2, 2), (2, 3), (2, 6), (2, 7), (2, 11), (2, 13), (2, 15), (2, 17), (2, 18),
    (3, 1), (3, 2), (3, 3), (3, 5), (3, 7), (3, 8), (3, 10), (3, 12), (3, 16), (3, 17);

INSERT INTO quests (name, description, goal_steps, result_description, option_1, option_2, option_1_odds, option_2_odds)
VALUES
    ('The Trail of the Everstride', 
    'Brave Adventurer, journey through the Plains of Perpetual Motion and conquer the Glade of Nimble Steps. Achieve 30,000 steps to reach the Sanctuary of Vitality and claim the title of Everstride Champion!',
    1000, 'With the final step, you enter the Sanctuary of Vitality, your body brimming with energy as the title of Everstride Champion is bestowed upon you. Just as you begin to bask in your victory, a rustle from the nearby trees catches your attention. From the shadows, a group of bandits emerges, eyes glinting with greed.',
    'Flee from the bandits', 'Draw your weapon', 50, 75),
    ('The Path of Thunderstride', 
    'Intrepid Traveler, embark on a journey through the Stormy Highlands. Traverse the Thunder Pass and outpace the Lightning Trails. Walk or run 2,000 steps to reach the Peak of Resilience and claim the title of Thunderstride Conqueror!', 
    2000, 'Test completed quest description',
    'Option 1', 'Option 2', 50, 75);

INSERT INTO user_quests (user_id, quest_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 2),
    (4, 1),
    (5, 2);

-- INSERT INTO user_friends (user_id_1, user_id_2) VALUES 
--     (2, 3),
--     (3, 1);