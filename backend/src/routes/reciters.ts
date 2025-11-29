import { Router } from 'express';
import { pool } from '../db';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all reciters
router.get('/', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT id, name, name_ar, bio, audio_quality FROM reciters WHERE is_active = true ORDER BY name'
        );

        res.json({ reciters: result.rows });
    } catch (error) {
        console.error('Error fetching reciters:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Get reciter by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await pool.query(
            'SELECT id, name, name_ar, bio, audio_quality FROM reciters WHERE id = $1 AND is_active = true',
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: { message: 'Reciter not found' } });
        }

        res.json({ reciter: result.rows[0] });
    } catch (error) {
        console.error('Error fetching reciter:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

export default router;
