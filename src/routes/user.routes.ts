import { Router } from 'express';
import { getUser } from '../handlers/users/getUser.js';

const router = Router();

router.use('/', getUser);

export default router;
