import { Router } from 'express';
import { pool } from '../db';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Get user profile
router.get('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;

        const result = await pool.query(
            'SELECT id, email, name, preferred_reciter_id, language, timezone FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: { message: 'User not found' } });
        }

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Update user profile
router.put('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;
        const { name, preferred_reciter_id, language, timezone } = req.body;

        const result = await pool.query(
            `UPDATE users 
       SET name = COALESCE($1, name),
           preferred_reciter_id = COALESCE($2, preferred_reciter_id),
           language = COALESCE($3, language),
           timezone = COALESCE($4, timezone),
           updated_at = NOW()
       WHERE id = $5
       RETURNING id, email, name, preferred_reciter_id, language, timezone`,
            [name, preferred_reciter_id, language, timezone, userId]
        );

        res.json({ user: result.rows[0] });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

// Delete user account
router.delete('/', async (req: AuthRequest, res) => {
    try {
        const userId = req.userId;

        await pool.query('DELETE FROM users WHERE id = $1', [userId]);

        res.json({ message: 'Account deleted successfully' });
    } catch (error) {
        console.error('Error deleting account:', error);
        res.status(500).json({ error: { message: 'Internal server error' } });
    }
});

export default router;
