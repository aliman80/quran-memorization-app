-- Seed Data: Top 5 Reciters

INSERT INTO reciters (id, name, name_ar, bio, audio_quality, is_active) VALUES
(
  '550e8400-e29b-41d4-a716-446655440001',
  'Mishary Rashid Alafasy',
  'مشاري راشد العفاسي',
  'One of the most popular Quran reciters worldwide, known for his beautiful voice and precise tajweed.',
  '320kbps',
  true
),
(
  '550e8400-e29b-41d4-a716-446655440002',
  'Sheikh Saood Al-Shuraim',
  'سعود الشريم',
  'Imam of Masjid al-Haram in Makkah, renowned for his emotional recitation.',
  '320kbps',
  true
),
(
  '550e8400-e29b-41d4-a716-446655440003',
  'Sheikh Abdul Rahman Al-Sudais',
  'عبد الرحمن السديس',
  'Chief Imam of Masjid al-Haram, famous for his melodious voice.',
  '320kbps',
  true
),
(
  '550e8400-e29b-41d4-a716-446655440004',
  'Sheikh Saad Al-Ghamdi',
  'سعد الغامدي',
  'Popular reciter known for his clear and beautiful recitation.',
  '320kbps',
  true
),
(
  '550e8400-e29b-41d4-a716-446655440005',
  'Sheikh Maher Al-Muaiqly',
  'ماهر المعيقلي',
  'Imam of Masjid al-Haram, known for his powerful and moving recitation.',
  '320kbps',
  true
);

-- Seed Data: Sample Surahs
INSERT INTO surahs (number, name, name_ar, name_transliteration, revelation_place, ayah_count) VALUES
(1, 'Al-Fatihah', 'الفاتحة', 'Al-Faatiha', 'Makkah', 7),
(2, 'Al-Baqarah', 'البقرة', 'Al-Baqara', 'Madinah', 286),
(112, 'Al-Ikhlas', 'الإخلاص', 'Al-Ikhlaas', 'Makkah', 4),
(113, 'Al-Falaq', 'الفلق', 'Al-Falaq', 'Makkah', 5),
(114, 'An-Nas', 'الناس', 'An-Naas', 'Makkah', 6);

-- Seed Data: Al-Fatihah Ayahs
INSERT INTO ayahs (surah_id, ayah_number, text_ar, text_transliteration, text_translation_en) VALUES
(1, 1, 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ', 'Bismillahir Rahmanir Raheem', 'In the name of Allah, the Entirely Merciful, the Especially Merciful.'),
(1, 2, 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', 'Alhamdu lillahi rabbil aalameen', 'All praise is due to Allah, Lord of the worlds.'),
(1, 3, 'الرَّحْمَٰنِ الرَّحِيمِ', 'Ar-Rahmanir-Raheem', 'The Entirely Merciful, the Especially Merciful,'),
(1, 4, 'مَالِكِ يَوْمِ الدِّينِ', 'Maliki yawmid-deen', 'Sovereign of the Day of Recompense.'),
(1, 5, 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ', 'Iyyaka nabudu wa iyyaka nastaeen', 'It is You we worship and You we ask for help.'),
(1, 6, 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ', 'Ihdinas-siratal-mustaqeem', 'Guide us to the straight path -'),
(1, 7, 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ', 'Siratal-lazeena anamta alayhim ghayril-maghdubi alayhim wa lad-dalleen', 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.');

-- Note: Audio file URLs are placeholders
-- Replace with actual licensed audio file URLs
INSERT INTO audio_files (reciter_id, ayah_id, file_url, duration_ms) VALUES
('550e8400-e29b-41d4-a716-446655440001', 1, 'https://placeholder.com/audio/mishary/001/001.mp3', 8000),
('550e8400-e29b-41d4-a716-446655440001', 2, 'https://placeholder.com/audio/mishary/001/002.mp3', 7500),
('550e8400-e29b-41d4-a716-446655440001', 3, 'https://placeholder.com/audio/mishary/001/003.mp3', 4000);
