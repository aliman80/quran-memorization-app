import { Router } from 'express';
import { pool } from '../db';

const router = Router();

// Get audio URL for a specific ayah and reciter
router.get('/ayah/:ayahId/reciter/:reciterId', async (req, res) => {
    try {
        const { ayahId, reciterId } = req.params;

        const result = await pool.query(
            `SELECT af.file_url as audio_url, af.duration_seconds, r.name as reciter_name
       FROM audio_files af
       JOIN reciters r ON af.reciter_id = r.id
       WHERE af.ayah_id = $1 AND af.reciter_id = $2`,
            [ayahId, reciterId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: { message: 'Audio file not found' } });
        }

        res.json({ audio: result.rows[0] });
    } catch (error) {
        console.error('Error fetching audio:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Get all audio files for a surah with a specific reciter
router.get('/surah/:surahId/reciter/:reciterId', async (req, res) => {
    try {
        const { surahId, reciterId } = req.params;

        const result = await pool.query(
            `SELECT af.file_url as audio_url, af.duration_seconds, a.ayah_number, a.text_ar
       FROM audio_files af
       JOIN ayahs a ON af.ayah_id = a.id
       WHERE a.surah_id = $1 AND af.reciter_id = $2
       ORDER BY a.ayah_number`,
            [surahId, reciterId]
        );

        res.json({ audioFiles: result.rows });
    } catch (error) {
        console.error('Error fetching audio files:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

export default router;
