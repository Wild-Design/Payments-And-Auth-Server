import { Router } from 'express';
const router = Router();
router.get('/', (_req, res) => {
    console.log('Welcome');
    res.status(200).send('Welcome');
});
export default router;
