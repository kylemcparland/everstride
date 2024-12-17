DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    distance_travelled_today INT DEFAULT 0,
    gold INT DEFAULT 0,
    colour VARCHAR(12)
);

-- No password stored for dev/demo purposes.