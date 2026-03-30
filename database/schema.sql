CREATE DATABASE IF NOT EXISTS primestream_plus;
USE primestream_plus;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(80) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS content_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(160) NOT NULL,
    type ENUM('movie', 'tv_show', 'cartoon') NOT NULL,
    genre VARCHAR(80) NOT NULL,
    description TEXT NOT NULL,
    poster_url VARCHAR(255) NOT NULL,
    trailer_url VARCHAR(255) NOT NULL,
    runtime_minutes INT NOT NULL,
    age_rating VARCHAR(16) NOT NULL,
    release_year INT NOT NULL,
    exclusive_feature_tag VARCHAR(100) DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS watchlist_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    status ENUM('watchlist', 'watching', 'completed') DEFAULT 'watchlist',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_watchlist (user_id, content_id),
    CONSTRAINT fk_watchlist_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_watchlist_content FOREIGN KEY (content_id) REFERENCES content_items(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS ratings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    content_id INT NOT NULL,
    rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uniq_user_rating (user_id, content_id),
    CONSTRAINT fk_rating_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_rating_content FOREIGN KEY (content_id) REFERENCES content_items(id) ON DELETE CASCADE
);

INSERT INTO content_items
    (title, type, genre, description, poster_url, trailer_url, runtime_minutes, age_rating, release_year, exclusive_feature_tag)
VALUES
    ('Skyline Cipher', 'movie', 'Sci-Fi Thriller', 'A data scientist uncovers a quantum code hidden inside city surveillance streams.', 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/embed/6ZfuNTqbHE8', 128, 'PG-13', 2025, 'AI Mood Match'),
    ('Echoes of Yesterday', 'tv_show', 'Drama Mystery', 'An investigative journalist relives memory fragments through immersive archive footage.', 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/embed/3VZFpwlXKpg', 44, '16+', 2024, 'Storyline Switch'),
    ('Pixel Rangers', 'cartoon', 'Adventure Comedy', 'Four kids enter retro game worlds to recover lost artifacts and save their city.', 'https://images.unsplash.com/photo-1517602302552-471fe67acf66?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/embed/bLvqoHBptjg', 24, 'U/A 7+', 2023, 'Family Quest Mode'),
    ('Monsoon Protocol', 'movie', 'Action', 'A rescue team races against a superstorm to evacuate a floating research station.', 'https://images.unsplash.com/photo-1460881680858-30d872d5b530?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/embed/TcMBFSGVi1c', 115, 'PG-13', 2026, 'Live Trivia Overlay'),
    ('Code & Clover', 'tv_show', 'Rom-Com', 'A startup engineer and a botanist accidentally swap project prototypes and priorities.', 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80', 'https://www.youtube.com/embed/Z1BCujX3pw8', 38, '13+', 2025, 'Smart Recap');
