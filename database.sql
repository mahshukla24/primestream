CREATE DATABASE IF NOT EXISTS primestream CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE primestream;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(190) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    avatar_path VARCHAR(255) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS titles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(180) NOT NULL,
    genre VARCHAR(120) NOT NULL,
    mood ENUM('chill', 'thrill', 'focus', 'family', 'romance') NOT NULL DEFAULT 'chill',
    release_year INT NOT NULL,
    duration_min INT NOT NULL,
    imdb_rating DECIMAL(3,1) NOT NULL,
    trailer_url VARCHAR(255) NOT NULL,
    thumbnail_url VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title_id INT NOT NULL,
    rating DECIMAL(2,1) NOT NULL,
    review_text TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_reviews_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_reviews_title FOREIGN KEY (title_id) REFERENCES titles(id) ON DELETE CASCADE,
    CONSTRAINT uq_reviews_user_title UNIQUE (user_id, title_id)
);

CREATE TABLE IF NOT EXISTS watchlist (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_watchlist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_watchlist_title FOREIGN KEY (title_id) REFERENCES titles(id) ON DELETE CASCADE,
    CONSTRAINT uq_watchlist_user_title UNIQUE (user_id, title_id)
);

CREATE TABLE IF NOT EXISTS mood_journal (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    mood ENUM('chill', 'thrill', 'focus', 'family', 'romance') NOT NULL,
    note VARCHAR(280) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_mood_journal_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

INSERT INTO titles (title, genre, mood, release_year, duration_min, imdb_rating, trailer_url, thumbnail_url, description)
VALUES
('Skyline Drift', 'Sci-Fi Adventure', 'thrill', 2025, 131, 8.1, 'https://www.youtube.com/embed/aqz-KE-bpKQ', 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=900&q=80', 'A former drone racer discovers a corporate conspiracy hidden in the clouds over Neo Mumbai.'),
('Monsoon Letters', 'Drama Romance', 'romance', 2024, 112, 7.6, 'https://www.youtube.com/embed/ScMzIvxBSi4', 'https://images.unsplash.com/photo-1511988617509-a57c8a288659?auto=format&fit=crop&w=900&q=80', 'Two strangers exchange voice notes through a wrong delivery and build an impossible long-distance bond.'),
('Circuit & Spice', 'Family Comedy', 'family', 2023, 104, 7.9, 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80', 'A robotics student and her grandmother launch a food truck run by an emotional AI.'),
('Silent Altitude', 'Mystery Thriller', 'focus', 2022, 97, 8.4, 'https://www.youtube.com/embed/tgbNymZ7vqY', 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=900&q=80', 'A pilot survives an impossible crash and starts decoding an audio signal that predicts future disasters.'),
('Afterlight Protocol', 'Action', 'thrill', 2026, 138, 8.7, 'https://www.youtube.com/embed/oUFJJNQGwhk', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=900&q=80', 'An undercover analyst enters a synthetic memory black market to recover stolen national secrets.'),
('Paper Boat Club', 'Coming-of-age', 'chill', 2021, 95, 7.3, 'https://www.youtube.com/embed/wTcNtgA6gHs', 'https://images.unsplash.com/photo-1512427691650-1e16df2f5eab?auto=format&fit=crop&w=900&q=80', 'A small-town teen podcast unites five classmates who turn their fears into stories on water.')
ON DUPLICATE KEY UPDATE title = VALUES(title);
