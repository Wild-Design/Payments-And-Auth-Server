import { Router } from 'express';
import authLogin from '../handlers/auth/authLogin.js';


const router = Router();

router.post('/login',authLogin);

export default router;
