ALTER TABLE users
    ADD COLUMN equipped_hat INTEGER REFERENCES user_items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_shirt INTEGER REFERENCES user_items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_pants INTEGER REFERENCES user_items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_shoes INTEGER REFERENCES user_items(id) ON DELETE SET NULL,
    ADD COLUMN equipped_weapon INTEGER REFERENCES user_items(id) ON DELETE SET NULL;
