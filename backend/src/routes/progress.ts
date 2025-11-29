import { Router } from 'express';
import { pool } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Get detailed progress
router.get('/detailed', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;

        // Get total ayahs memorized
        const totalResult = await pool.query(
            'SELECT COUNT(*) as count FROM memorization_entries WHERE user_id = $1',
            [userId]
        );

        // Get breakdown by mastery level
        const masteryResult = await pool.query(
            'SELECT mastery_level as level, COUNT(*) as count FROM memorization_entries WHERE user_id = $1 GROUP BY mastery_level ORDER BY mastery_level',
            [userId]
        );

        res.json({
            totalAyahs: parseInt(totalResult.rows[0].count),
            byMastery: masteryResult.rows,
            recentActivity: [],
        });
    } catch (error) {
        console.error('Error fetching detailed progress:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

export default router;
