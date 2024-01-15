import { Router } from 'express';
import getUser from '../handlers/users/getUser.js';
import createUser from '../handlers/users/createUser.js';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);

export default router;
