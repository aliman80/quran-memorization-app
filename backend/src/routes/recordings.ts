import { Router } from 'express';
import { authMiddleware } from '../middleware/auth';

const router = Router();

router.use(authMiddleware);

// Placeholder routes
router.post('/upload', (req, res) => {
    res.status(501).json({ error: { message: 'Not implemented yet' } });
});

router.get('/', (req, res) => {
    res.status(501).json({ error: { message: 'Not implemented yet' } });
});

router.get('/:id/compare', (req, res) => {
    res.status(501).json({ error: { message: 'Not implemented yet' } });
});

router.delete('/:id', (req, res) => {
    res.status(501).json({ error: { message: 'Not implemented yet' } });
});

export default router;
