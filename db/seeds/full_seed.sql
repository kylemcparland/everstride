INSERT INTO users (name, email, distance_travelled_today, total_distance_travelled, last_total_distance, gold, colour, accumulated_distance)

VALUES 
    ('Kyle McParland', 'k@k.com', 0, 8000, 0, 400, 'blue', 0),
    ('Ben Hallam', 'b@b.com', 300, 2000, 0, 0, 'red', 0),
    ('Jon Hiebert', 'j@j.com', 0, 4000, 0, 0, 'green', 0),
    ('Leeroy Walker', 'j@l.com', 324, 0, 0, 324, 'pink', 0),
    ('Jenna Johnson', 'y@j.com', 44, 6000, 0, 44, 'purple', 0),
    ('Jimmy Jenkins', 'y@q.com', 440, 10000, 0, 440, 'turquoise', 0);

INSERT INTO items (name, type, description, price, image) VALUES 
    ('Hat of Wisdom', 'hat', 'Increases wisdom by 5.', 300, 'hat1.png'),
    ('Cap of Agility', 'hat', 'A lightweight cap that boosts agility by 3.', 200, 'hat2.png'),
    ('Helm of Endurance', 'hat', 'A sturdy helm that increases endurance by 7.', 600, 'hat3.png'),
    ('Crown of Mystics', 'hat', 'An ornate crown that enhances magic power by 10.', 1000, 'hat4.png'),
    ('Adventurer Tunic', 'shirt', 'A basic tunic that increases dexterity by 1.', 300, 'shirt1.png'),
    ('Robe of the Magi', 'shirt', 'A flowing robe that increases magic resistance by 8.', 700, 'shirt2.png'),
    ('Vest of Vigor', 'shirt', 'A leather vest that boosts health by 15.', 600, 'shirt3.png'),
    ('Chainmail Shirt', 'shirt', 'A shirt made of chainmail that adds armor by 10.', 800, 'shirt4.png'),
    ('Leggings of Speed', 'pants', 'Light leggings that increase speed by 5.', 400, 'pants1.png'),
    ('Pants of Might', 'pants', 'Durable pants that increase strength by 4.', 500, 'pants2.png'),
    ('Fortitude Greaves', 'pants', 'Metal greaves that boost armor by 7.', 700, 'pants3.png'),
    ('Trousers of Luck', 'pants', 'Comfortable trousers that improve critical chance by 2%.', 300, 'pants4.png'),
    ('Boots of Swiftness', 'boots', 'Sturdy boots that increase movement speed by 3.', 400, 'boots1.png'),
    ('Sandals of Serenity', 'boots', 'Simple sandals that improve focus and mana regeneration.', 300, 'boots2.png'),
    ('Basic Sword', 'weapon', 'A sharp blade that increases strength by 5.', 500, 'sword1.png'),
    ('Sword of Might', 'weapon', 'A royal blade that increases strength by 10.', 1000, 'sword2.png'),
    ('Staff of Fire', 'weapon', 'A magical staff that enables fire spells.', 1000, 'staff1.png'),
    ('Bow of Precision', 'weapon', 'A fine-crafted bow that increases critical hit chance.', 700, 'bow1.png');

INSERT INTO user_items (user_id, item_id) VALUES 
    (1, 1), (1, 2), (1, 5), (1, 6), (1, 12), (1, 13), (1, 14), (1, 16), (1, 17),
    (2, 2), (2, 3), (2, 6), (2, 7), (2, 11), (2, 13), (2, 15), (2, 17), (2, 18),
    (3, 1), (3, 2), (3, 3), (3, 5), (3, 7), (3, 8), (3, 10), (3, 12), (3, 16), (3, 17);

INSERT INTO quests (name, description, goal_steps, result_description, option_1, option_2, option_1_odds, option_2_odds, success_message, failure_message)
VALUES
    ('The Trail of the Everstride', 
    'Brave Adventurer, journey through the Plains of Perpetual Motion and conquer the Glade of Nimble Steps. Achieve 1,000 steps to reach the Sanctuary of Vitality and claim the title of Everstride Champion!',
    1000, 'With the final step, you enter the Sanctuary of Vitality, your body brimming with energy as the title of Everstride Champion is bestowed upon you. Suddenly, a rustle from the nearby trees catches your attention. From the shadows, a group of bandits emerges, eyes glinting with greed.',
    'Flee from the bandits', 'Draw your weapon', 50, 75, 'You escape the bandits!', 'You escape with your life, but are no richer.'),
    ('The Path of Thunderstride', 
    'Intrepid Traveler, embark on a journey through the Stormy Highlands. Traverse the Thunder Pass and outpace the Lightning Trails. Walk or run 1,500 steps to reach the Peak of Resilience and claim the title of Thunderstride Conqueror!', 
    1500, 'As you near the summit, a thunderous roar shakes the earth, and a mysterious figure emerges from the mist, blocking your path.',
    'Calm the storm', 'Draw your weapon', 75, 50, 'The figure dissolves into thin air!', 'The mist blinds you and you are forced to flee.'),
    ('The Journey to Windwalker Ridge', 
    'Embark on a trek through the Whispering Valleys, ascend the rocky trails of Windwalker Ridge, and conquer the heights to earn the title of Windwalker Traveler. Traverse 2000 steps and face the challenges of the ridge!',
    2000, 'As you climb higher, a gust of wind knocks you off balance, and a whirlwind forms before you, swirling violently.',
    'Draw your weapon', 'Take shelter and wait for calm', 70, 40, 'You fight against the winds and reach the summit!', 'The storm is too fierce, and you are forced to wait, losing valuable time.'),
    ('The Crossing of Mirage Desert', 
    'Venture across the scorching sands of Mirage Desert, navigating treacherous dunes and avoiding illusions. Reach the Oasis of Serenity after walking 2,500 steps to gain the title of Desert Wanderer!',
    2500, 'Just as the heat becomes unbearable, a mirage of an oasis shimmers ahead, but you must decide if it is real or a trick.',
    'Approach the oasis cautiously', 'Ignore it and continue walking', 80, 60, 'The oasis is real, providing shelter!', 'The mirage disappears, leaving you lost and parched.'),
    ('The Dance of the Emberflame', 
    'Prepare yourself for the fiery trials within the Ashen Peaks. Perform the sacred dance of the Emberflame, completing 3,000 steps through volcanic terrain to reach the Heart of the Firestorm and become the Emberflame Dancer!',
    3000, 'After your final step, the fire surrounding you subsides, revealing a glowing emberstone at the peak. Before you can approach, a fiery guardian appears, its molten eyes staring you down.',
    'Submit to the guardian', 'Defeat the guardian', 80, 60, 'The guardian grants you the Emberstone, leaving you with newfound wisdom.', 'The battle is hard-fought, but you succumb to the flames, your dance unfinished.'),
    ('The Quest for the Frostbound Crown', 
    'Brave Frostwanderer, traverse the frozen wastes of the Glacial Expanse. Complete 3,500 steps through icy tundras and blizzards to reach the Throne of the Frost King and claim the legendary Frostbound Crown!',
    3500, 'As you arrive at the throne, a shimmering figure appears. The Frost King himself, guarding the crown, rises from the ice with a cold glare.',
    'Speak with the Frost King', 'Challenge the Frost King to a duel', 70, 50, 'The Frost King offers you the crown and a blessing of the frozen north!', 'Your duel ends in defeat, but the king allows you to return with your life, though the crown remains untouched.'),
    ('The March of the Ironfoot', 
    'Warrior of the Forge, march across the Metal Plains, where the ground hums with the power of ancient forges. Walk 4,000 steps to reach the Iron Citadel and claim the title of Ironfoot Conqueror!',
    4000, 'Upon reaching the Iron Citadel, a massive gate opens, revealing a blacksmith guardian who questions your resolve. Before you can respond, an army of iron golems approaches!',
    'Stand your ground', 'Bargain with the golems', 65, 70, 'You stand strong, and the golems, impressed by your courage, allow you entry!', 'The golems overwhelm you, but you escape with your life, only to find yourself further from your goal than before.');

INSERT INTO user_quests (user_id, quest_id)
VALUES
    (1, 1),
    (2, 2),
    (3, 1),
    (4, 1),
    (5, 2);

UPDATE users
SET 
    equipped_hat = 1, 
    equipped_shirt = 5, 
    equipped_pants = 12, 
    equipped_boots = 13, 
    equipped_weapon = 16
WHERE name = 'Leeroy Walker';

UPDATE users
SET 
    equipped_hat = 2, 
    equipped_shirt = 6, 
    equipped_pants = 11, 
    equipped_boots = 13, 
    equipped_weapon = 17
WHERE name = 'Jenna Johnson';

UPDATE users
SET 
    equipped_hat = 3, 
    equipped_shirt = 7, 
    equipped_pants = 10, 
    equipped_boots = 13, 
    equipped_weapon = 18
WHERE name = 'Jimmy Jenkins';