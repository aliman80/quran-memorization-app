import { Router } from 'express';
import { pool } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Create or update memorization entry
router.post('/entries', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;
        const { ayah_id, mastery_level, correctness } = req.body;

        // Check if entry exists
        const existing = await pool.query(
            'SELECT id, mastery_level FROM memorization_entries WHERE user_id = $1 AND ayah_id = $2',
            [userId, ayah_id]
        );

        let result;
        if (existing.rows.length > 0) {
            // Update existing entry
            const newMastery = Math.min(5, Math.max(0, mastery_level || existing.rows[0].mastery_level));
            const nextReview = calculateNextReview(newMastery);

            result = await pool.query(
                `UPDATE memorization_entries 
         SET mastery_level = $1, 
             next_review_at = $2,
             review_count = review_count + 1,
             last_reviewed_at = NOW(),
             updated_at = NOW()
         WHERE id = $3
         RETURNING *`,
                [newMastery, nextReview, existing.rows[0].id]
            );
        } else {
            // Create new entry
            const nextReview = calculateNextReview(mastery_level || 1);

            result = await pool.query(
                `INSERT INTO memorization_entries 
         (user_id, ayah_id, mastery_level, next_review_at, review_count, last_reviewed_at)
         VALUES ($1, $2, $3, $4, 1, NOW())
         RETURNING *`,
                [userId, ayah_id, mastery_level || 1, nextReview]
            );
        }

        res.json({ entry: result.rows[0] });
    } catch (error) {
        console.error('Error creating/updating entry:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Get review queue
router.get('/review-queue', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;

        const result = await pool.query(
            `SELECT me.*, a.text_ar, a.ayah_number, s.name as surah_name, s.number as surah_number
       FROM memorization_entries me
       JOIN ayahs a ON me.ayah_id = a.id
       JOIN surahs s ON a.surah_id = s.id
       WHERE me.user_id = $1 
       AND me.next_review_at <= NOW()
       ORDER BY me.next_review_at ASC
       LIMIT 20`,
            [userId]
        );

        res.json({ queue: result.rows });
    } catch (error) {
        console.error('Error fetching review queue:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Helper function to calculate next review date
function calculateNextReview(masteryLevel: number): Date {
    const intervals = [1, 3, 7, 14, 30, 60]; // days
    const days = intervals[Math.min(masteryLevel, intervals.length - 1)];

    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + days);

    return nextReview;
}

export default router;
