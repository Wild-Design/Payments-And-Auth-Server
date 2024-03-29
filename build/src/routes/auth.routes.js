import { Router } from 'express';
import authLogin from '../handlers/auth/authLogin.js';
import authLogout from '../handlers/auth/authLogout.js';
const router = Router();
router.post('/login', authLogin);
router.get('/logout', authLogout);
export default router;
