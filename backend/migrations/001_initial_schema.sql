-- Migration: Initial Schema
-- Created: 2024-11-29

-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  name VARCHAR(255) NOT NULL,
  preferred_reciter_id UUID,
  target_plan JSONB,
  timezone VARCHAR(50) DEFAULT 'UTC',
  language VARCHAR(10) DEFAULT 'en',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Reciters table
CREATE TABLE reciters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255),
  bio TEXT,
  audio_quality VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Surahs table
CREATE TABLE surahs (
  id SERIAL PRIMARY KEY,
  number INT UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  name_ar VARCHAR(255) NOT NULL,
  name_transliteration VARCHAR(255),
  revelation_place VARCHAR(50),
  ayah_count INT NOT NULL
);

-- Ayahs table
CREATE TABLE ayahs (
  id SERIAL PRIMARY KEY,
  surah_id INT REFERENCES surahs(id),
  ayah_number INT NOT NULL,
  text_ar TEXT NOT NULL,
  text_transliteration TEXT,
  text_translation_en TEXT,
  text_translation_ur TEXT,
  UNIQUE(surah_id, ayah_number)
);

-- Audio files table
CREATE TABLE audio_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reciter_id UUID REFERENCES reciters(id),
  ayah_id INT REFERENCES ayahs(id),
  file_url VARCHAR(500) NOT NULL,
  duration_ms INT,
  file_size_bytes BIGINT,
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(reciter_id, ayah_id)
);

-- Memorization entries table
CREATE TABLE memorization_entries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ayah_id INT REFERENCES ayahs(id),
  mastery_level INT DEFAULT 0,
  next_review_at TIMESTAMP,
  review_count INT DEFAULT 0,
  last_reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, ayah_id)
);

-- User recordings table
CREATE TABLE recordings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  ayah_id INT REFERENCES ayahs(id),
  file_url VARCHAR(500) NOT NULL,
  duration_ms INT,
  similarity_score FLOAT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Progress snapshots table
CREATE TABLE progress_snapshots (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  ayahs_memorized INT DEFAULT 0,
  time_spent_minutes INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  UNIQUE(user_id, date)
);

-- Indexes
CREATE INDEX idx_memorization_user_next_review ON memorization_entries(user_id, next_review_at);
CREATE INDEX idx_audio_files_reciter_ayah ON audio_files(reciter_id, ayah_id);
CREATE INDEX idx_ayahs_surah ON ayahs(surah_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_recordings_user ON recordings(user_id);

-- Add foreign key constraint for preferred_reciter_id
ALTER TABLE users ADD CONSTRAINT fk_users_preferred_reciter 
  FOREIGN KEY (preferred_reciter_id) REFERENCES reciters(id);
