import { Router } from 'express';
import userRoutes from '../routes/users.js';
const router = Router();

router.get('/', (_req, res) => {
  console.log('Welcome');

  res.status(200).send('Welcome');
});

router.use(userRoutes);

export default router;
