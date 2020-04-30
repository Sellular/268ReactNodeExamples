DROP TABLE IF EXISTS memory;

CREATE TABLE memory(
    id SERIAL PRIMARY KEY,
    year INT,
    month INT,
    day INT,
    message TEXT,
    is_deleted INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);