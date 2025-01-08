DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS user_items CASCADE;
DROP TABLE IF EXISTS user_friends CASCADE;
DROP TABLE IF EXISTS quests CASCADE;
DROP TABLE IF EXISTS user_quests CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    distance_travelled_today INT DEFAULT 0,
    total_distance_travelled INT DEFAULT 0,
    last_total_distance INT DEFAULT 0,
    gold INT DEFAULT 0,
    colour VARCHAR(12)
);


CREATE TABLE items (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT NOT NULL DEFAULT 1,
    image VARCHAR(255) NOT NULL
);

CREATE TABLE user_items (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES items(id) ON DELETE CASCADE
);

CREATE TABLE user_friends (
    id SERIAL PRIMARY KEY NOT NULL,

    user_id_1 INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    user_id_2 INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE quests (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(800) NOT NULL,
    goal_steps INTEGER NOT NULL,
    result_description VARCHAR(800) NOT NULL,
    option_1 VARCHAR(255) NOT NULL,
    option_2 VARCHAR(255) NOT NULL
);

CREATE TABLE user_quests (
    id SERIAL PRIMARY KEY NOT NULL,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    quest_id INTEGER NOT NULL REFERENCES quests(id) ON DELETE CASCADE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    completed BOOLEAN DEFAULT FALSE
);

ALTER TABLE users
    ADD COLUMN equipped_hat INTEGER REFERENCES items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_shirt INTEGER REFERENCES items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_pants INTEGER REFERENCES items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_boots INTEGER REFERENCES items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_weapon INTEGER REFERENCES items(id) ON DELETE SET NULL;