-- Update audio_files table with EveryAyah.com URLs
-- Using Mishary Alafasy (reciter code: Alafasy_128kbps)

-- Clear existing placeholder data
TRUNCATE TABLE audio_files;

-- Get Mishary Alafasy's UUID
DO $$
DECLARE
    alafasy_id UUID;
BEGIN
    SELECT id INTO alafasy_id FROM reciters WHERE name = 'Mishary Alafasy' LIMIT 1;

    -- Insert audio file URLs for Al-Fatiha (Surah 1)
    INSERT INTO audio_files (reciter_id, ayah_id, file_url) 
    SELECT 
        alafasy_id,
        a.id,
        'https://everyayah.com/data/Alafasy_128kbps/001' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
    FROM ayahs a
    WHERE a.surah_id = 1;

    -- Insert audio file URLs for Al-Baqarah (Surah 2)
    INSERT INTO audio_files (reciter_id, ayah_id, file_url) 
    SELECT 
        alafasy_id,
        a.id,
        'https://everyayah.com/data/Alafasy_128kbps/002' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
    FROM ayahs a
    WHERE a.surah_id = 2;

    -- Insert audio file URLs for Al-Ikhlas (Surah 112)
    INSERT INTO audio_files (reciter_id, ayah_id, file_url) 
    SELECT 
        alafasy_id,
        a.id,
        'https://everyayah.com/data/Alafasy_128kbps/112' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
    FROM ayahs a
    WHERE a.surah_id = 112;

    -- Insert audio file URLs for Al-Falaq (Surah 113)
    INSERT INTO audio_files (reciter_id, ayah_id, file_url) 
    SELECT 
        alafasy_id,
        a.id,
        'https://everyayah.com/data/Alafasy_128kbps/113' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
    FROM ayahs a
    WHERE a.surah_id = 113;

    -- Insert audio file URLs for An-Nas (Surah 114)
    INSERT INTO audio_files (reciter_id, ayah_id, file_url) 
    SELECT 
        alafasy_id,
        a.id,
        'https://everyayah.com/data/Alafasy_128kbps/114' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
    FROM ayahs a
    WHERE a.surah_id = 114;
END $$;
