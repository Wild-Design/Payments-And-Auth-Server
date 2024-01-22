import { Router, Request, Response } from 'express';
import userRoutes from './user.routes.js';
import authRoutes from './auth.routes.js';
// import { serialize } from 'cookie';
import { hashPassword, comparePassword } from '../utils/passwordEncrypted.js';
// import jwt from 'jsonwebtoken';
// const { verify } = jwt;
// const { SECRET_AUTH } = process.env;
import { isAutenticated } from '../middlewares/authenticateMiddleware.js';
import { AuthenticatedRequest } from '../interfaces/auth.js';
import mercadopago from 'mercadopago';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model.js'; /*Esta forma de importar los tipos esta mal pero no encontre el modulo */

import { User } from '../db/index.js';

const { ACCESS_TOKEN_MERCADOPAGO } = process.env;

mercadopago.configure({
  access_token: ACCESS_TOKEN_MERCADOPAGO || '',
});

const router = Router();

router.get('/', (_req: Request, res: Response) => {
  res.status(200).send('Welcome to Payments and Auth Server');
});

router.get('/test', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }
  const hash = hashPassword('123{}{}dfdfee45**ss456789');
  const compare = comparePassword('123{}{}dfdfee45**ss456789', hash);
  res.status(200).send(compare);
});

//----------------------------------
router.post('/mercadopago', async (_req: Request, res: Response) => {
  try {
    const preferenceData: CreatePreferencePayload = {
      items: [
        {
          title: 'Computadora',
          description: 'Compu pa juga a lo jueguito',
          picture_url: 'https://fotodeComputadora.com.ar',
          unit_price: 200,
          quantity: 3,
          currency_id: 'ARS',
        },
        {
          title: 'Tostadora',
          description: 'Tostadora para tostar 👀',
          picture_url: 'https://fotodeTostadora.com.ar',
          unit_price: 1000,
          quantity: 1,
          currency_id: 'ARS',
        },
        {
          title: 'Sapo',
          description: 'Sapo para combatir el dengue y el sika',
          picture_url: 'https://fotodeSapo.com.ar',
          unit_price: 500,
          quantity: 3,
          currency_id: 'ARS',
        },
      ],
      back_urls: {
        success: 'http://localhost:5173/exitosa',
        failure: 'http://localhost:5173/fallo',
      },
      auto_return: 'approved',
    };
    const response = await mercadopago.preferences.create(preferenceData);
    res.status(200).send(response);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
});
//----------------------------------

//----------------------------------
// router.post('/auth/login', (req, res) => {
//   const { email, password } = req.body;

//   try {
//     if (email === 'admin_admin@gmail.com' && password === 123456) {
//       const token = jwt.sign(
//         {
//           exp: Math.floor(Date.now() / 1000) + 60 * 68 * 24 * 30, //tiempo valido del token
//           email, //le envio los datos que quiero(la idea que sean los de la DB) ahora solo envio lo que llega en el body
//           password,
//         },
//         'secret' //ahora es harcodeada pero la idea es que sea una variable de entorno con otro nombre claro
//       );
//       const serialized = serialize('myTokenName', token, {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production' ? true : false,
//         sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
//         maxAge: 1000 * 60 * 60 * 24 * 30,
//         path: '/',
//       });

//       res.setHeader('Set-Cookie', serialized);
//       return res.status(200).send('Login succesfully');
//     }
//     return res.status(403).send('unautenticated');
//   } catch (error: any) {
//     res.status(500).send(error.messaje);
//   }
// });

router.get(
  '/profile',
  isAutenticated,
  async (req: AuthenticatedRequest, res) => {
    try {
      // const { AuthToken } = req.cookies;
      // if (!AuthToken) {
      //   return res.status(401).send('Error: No Token');
      // }
      // const isValidToken = verify(AuthToken, `${SECRET_AUTH}`); //si este codigo no es valido lanza un (ERROR por eso hay que manejarlo con try catch)
      // console.log(isValidToken);
      const id = req.user?.id;
      const user = await User.findByPk(id);
      res.status(200).send(user);
    } catch (error: any) {
      res.status(401).send('Invalid Token');
    }
  }
);

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
