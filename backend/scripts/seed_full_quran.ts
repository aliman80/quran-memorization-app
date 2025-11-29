import { Pool } from 'pg';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

async function seedFullQuran() {
    const client = await pool.connect();

    try {
        console.log('🚀 Starting full Quran seeding...');

        // 1. Fetch Quran Data (Arabic and Translation)
        console.log('📥 Fetching Quran data...');
        const [arabicResponse, translationResponse, surahResponse] = await Promise.all([
            axios.get('http://api.alquran.cloud/v1/quran/quran-uthmani'),
            axios.get('http://api.alquran.cloud/v1/quran/en.sahih'),
            axios.get('http://api.alquran.cloud/v1/surah')
        ]);

        const arabicQuran = arabicResponse.data.data;
        const translationQuran = translationResponse.data.data;
        const surahsMeta = surahResponse.data.data;

        await client.query('BEGIN');

        // 2. Clear existing data (optional, but good for clean slate)
        console.log('🧹 Clearing existing data...');
        await client.query('TRUNCATE TABLE audio_files CASCADE');
        await client.query('TRUNCATE TABLE memorization_entries CASCADE');
        await client.query('TRUNCATE TABLE ayahs CASCADE');
        await client.query('TRUNCATE TABLE surahs CASCADE');

        // 3. Insert Surahs
        console.log('📖 Inserting 114 Surahs...');
        for (const surah of surahsMeta) {
            await client.query(
                `INSERT INTO surahs (id, number, name, name_ar, name_transliteration, revelation_place, ayah_count)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
                [
                    surah.number, // Using number as ID for simplicity and relation
                    surah.number,
                    surah.englishName,
                    surah.name,
                    surah.englishName, // API doesn't have separate transliteration field often, using englishName
                    surah.revelationType,
                    surah.numberOfAyahs
                ]
            );
        }

        // 4. Insert Ayahs
        console.log('✍️ Inserting 6236 Ayahs...');
        let ayahCount = 0;

        // Get Mishary Alafasy ID for audio
        const reciterRes = await client.query("SELECT id FROM reciters WHERE name = 'Mishary Alafasy' LIMIT 1");
        let alafasyId = reciterRes.rows[0]?.id;

        if (!alafasyId) {
            // Create reciter if not exists
            const newReciter = await client.query(
                "INSERT INTO reciters (name, name_ar) VALUES ('Mishary Alafasy', 'مشاري العفاسي') RETURNING id"
            );
            alafasyId = newReciter.rows[0].id;
        }

        for (let i = 0; i < 114; i++) {
            const surahArabic = arabicQuran.surahs[i];
            const surahTranslation = translationQuran.surahs[i];
            const surahNumber = surahArabic.number;

            for (let j = 0; j < surahArabic.ayahs.length; j++) {
                const ayahArabic = surahArabic.ayahs[j];
                const ayahTranslation = surahTranslation.ayahs[j];

                // Insert Ayah
                const ayahRes = await client.query(
                    `INSERT INTO ayahs (surah_id, ayah_number, text_ar, text_transliteration, text_translation_en)
           VALUES ($1, $2, $3, $4, $5)
           RETURNING id`,
                    [
                        surahNumber,
                        ayahArabic.numberInSurah,
                        ayahArabic.text,
                        '', // Transliteration is heavy to fetch, leaving empty for now
                        ayahTranslation.text
                    ]
                );

                const ayahId = ayahRes.rows[0].id;

                // 5. Insert Audio URL immediately
                const surahPad = String(surahNumber).padStart(3, '0');
                const ayahPad = String(ayahArabic.numberInSurah).padStart(3, '0');
                const audioUrl = `https://everyayah.com/data/Alafasy_128kbps/${surahPad}${ayahPad}.mp3`;

                await client.query(
                    `INSERT INTO audio_files (reciter_id, ayah_id, file_url) VALUES ($1, $2, $3)`,
                    [alafasyId, ayahId, audioUrl]
                );

                ayahCount++;
                if (ayahCount % 100 === 0) process.stdout.write('.');
            }
        }

        await client.query('COMMIT');
        console.log('\n✅ Successfully seeded full Quran with audio!');

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('❌ Error seeding database:', error);
    } finally {
        client.release();
        await pool.end();
    }
}

seedFullQuran();
