import { Router } from 'express';
import userRoutes from './user.routes.js';
import { serialize } from 'cookie';

import jwt from 'jsonwebtoken';
const { verify } = jwt;

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
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 68 * 24 * 30, //tiempo valido del token
          email, //le envio los datos que quiero(la idea que sean los de la DB) ahora solo envio lo que llega en el body
          password,
        },
        'secret' //ahora es harcodeada pero la idea es que sea una variable de entorno con otro nombre claro
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
  } catch (error: any) {
    res.status(500).send(error.messaje);
  }
});

router.get('/profile', (req, res) => {
  try {
    const { myTokenName } = req.cookies;
    if (!myTokenName) {
      return res.status(401).send('Error: No Token');
    }
    const parseToken = verify(myTokenName, 'secret'); //si este codigo no es valido lanza un error en el servidor aclaro!!
    console.log(parseToken);

    res.status(200).send('getProfile Ok!');
  } catch (error: any) {
    res.status(401).send('Invalid Token');
  }
});

router.get('/auth/logout', (req, res) => {
  try {
    const { myTokenName } = req.cookies;
    if (!myTokenName) {
      //Primero me fijo si el cliente tiene su token
      return res.status(401).send('Error: No Token');
    }
    verify(myTokenName, 'secret');
    const serialized = serialize('myTokenName', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 0,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(200).send('Logout succesfully');
  } catch (error: any) {
    res.status(401).send('Invalid Token');
  }
});
//----------------------------------

router.use('/user', userRoutes);

export default router;
