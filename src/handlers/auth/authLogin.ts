import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';
import { Request, Response } from 'express';
import verifyUser from '../../controllers/authControllers/verifyUser.js';
import getUserCredentials from '../../controllers/authControllers/getUserCredentials.js';

export default async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('email and password are required');
  }

  try {
    const verify = await verifyUser(email, password);
    const userCredentials = await getUserCredentials(email);
    if (verify && userCredentials) {
      const token = jwt.sign(
        {
          exp: Math.floor(Date.now() / 1000) + 60 * 68 * 24 * 30, //tiempo valido del token
          userCredentials,
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
      return res.status(200).send('Autentication failed');
    }
    return res.status(403).send('unautenticated');
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
