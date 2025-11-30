-- Quick seed for deployment
-- Insert Mishary Alafasy reciter
INSERT INTO reciters (id, name, name_ar) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'Mishary Rashid Alafasy', 'مشاري بن راشد العفاسي')
ON CONFLICT DO NOTHING;

-- Insert Al-Fatiha (Surah 1)
INSERT INTO surahs (number, name, name_ar, revelation_place, ayah_count) VALUES
(1, 'Al-Fatihah', 'الفاتحة', 'Makkah', 7)
ON CONFLICT (number) DO NOTHING;

-- Insert ayahs for Al-Fatiha
INSERT INTO ayahs (surah_id, ayah_number, text_ar, text_translation_en) VALUES
(1, 1, 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'),
(1, 2, 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'All praise is due to Allah, Lord of the worlds -'),
(1, 3, 'الرَّحْمَٰنِ الرَّحِيمِ', 'The Entirely Merciful, the Especially Merciful,'),
(1, 4, 'مَالِكِ يَوْمِ الدِّينِ', 'Sovereign of the Day of Recompense.'),
(1, 5, 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 'It is You we worship and You we ask for help.'),
(1, 6, 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 'Guide us to the straight path -'),
(1, 7, 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 'The path of those upon whom You have bestowed favor, not of those who have evoked Your anger or of those who are astray.')
ON CONFLICT (surah_id, ayah_number) DO NOTHING;

-- Insert audio URLs for Al-Fatiha
INSERT INTO audio_files (reciter_id, ayah_id, file_url)
SELECT 
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    a.id,
    'https://everyayah.com/data/Alafasy_128kbps/001' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
FROM ayahs a
WHERE a.surah_id = 1
ON CONFLICT (reciter_id, ayah_id) DO NOTHING;

-- Insert Al-Ikhlas (Surah 112)
INSERT INTO surahs (number, name, name_ar, revelation_place, ayah_count) VALUES
(112, 'Al-Ikhlas', 'الإخلاص', 'Makkah', 4)
ON CONFLICT (number) DO NOTHING;

-- Insert ayahs for Al-Ikhlas
INSERT INTO ayahs (surah_id, ayah_number, text_ar, text_translation_en) VALUES
(112, 1, 'قُلْ هُوَ اللَّهُ أَحَدٌ', 'Say, "He is Allah, [who is] One,'),
(112, 2, 'اللَّهُ الصَّمَدُ', 'Allah, the Eternal Refuge.'),
(112, 3, 'لَمْ يَلِدْ وَلَمْ يُولَدْ', 'He neither begets nor is born,'),
(112, 4, 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ', 'Nor is there to Him any equivalent."')
ON CONFLICT (surah_id, ayah_number) DO NOTHING;

-- Insert audio URLs for Al-Ikhlas
INSERT INTO audio_files (reciter_id, ayah_id, file_url)
SELECT 
    '550e8400-e29b-41d4-a716-446655440001'::uuid,
    a.id,
    'https://everyayah.com/data/Alafasy_128kbps/112' || LPAD(a.ayah_number::text, 3, '0') || '.mp3'
FROM ayahs a
WHERE a.surah_id = 112
ON CONFLICT (reciter_id, ayah_id) DO NOTHING;
