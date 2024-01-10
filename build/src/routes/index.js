import { Router } from 'express';
import userRoutes from './user.routes.js';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
const router = Router();
router.get('/', (_req, res) => {
    console.log('Welcome');
    res.status(200).send('Welcome');
});
//----------------------------------
router.post('/auth/login', (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    try {
        if (email === 'admin_admin@gmail.com' && password === 123456) {
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + 60 * 68 * 24 * 30, //tiempo valido del token
                email, //le envio los datos que quiero(la idea que sean los de la DB) ahora solo envio lo que llega en el body
                password,
            }, 'secret' //ahora es harcodeada pero la idea es que sea una variable de entorno con otro nombre claro
            );
            const serialized = serialize('myTokenName', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production' ? true : false,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                maxAge: 1000 * 60 * 60 * 24 * 30,
                path: '/',
            });
            res.setHeader('Set-Cookie', serialized);
            return res.status(200).send('Login succesfully');
        }
        return res.status(403).send('unautenticated');
    }
    catch (error) {
        res.status(500).send(error.messaje);
    }
});
router.get('/profile', (req, res) => {
    try {
        console.log({ cookies: req.cookies });
        res.status(200).send('getProfile Ok!');
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});
//----------------------------------
router.use('/user', userRoutes);
export default router;
