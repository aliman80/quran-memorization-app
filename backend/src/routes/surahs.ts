import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Get all surahs
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, number, name, name_ar, name_transliteration, revelation_place, ayah_count FROM surahs ORDER BY number'
        );

        res.json({ surahs: result.rows });
    } catch (error) {
        console.error('Error fetching surahs:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Get ayahs for a surah
router.get('/:id/ayahs', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT id, ayah_number, text_ar, text_transliteration, text_translation_en FROM ayahs WHERE surah_id = $1 ORDER BY ayah_number',
            [id]
        );

        res.json({ ayahs: result.rows });
    } catch (error) {
        console.error('Error fetching ayahs:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

export default router;
