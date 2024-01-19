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

router.get('/profile', isAutenticated, (req: AuthenticatedRequest, res) => {
  try {
    // const { AuthToken } = req.cookies;
    // if (!AuthToken) {
    //   return res.status(401).send('Error: No Token');
    // }
    // const isValidToken = verify(AuthToken, `${SECRET_AUTH}`); //si este codigo no es valido lanza un (ERROR por eso hay que manejarlo con try catch)
    // console.log(isValidToken);

    res.status(200).send(req.user?.id);
  } catch (error: any) {
    res.status(401).send('Invalid Token');
  }
});

router.use('/auth', authRoutes);
router.use('/user', userRoutes);

export default router;
