import { Request, Response } from 'express';
import { serialize } from 'cookie';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { SECRET_AUTH } = process.env;

export default (req: Request, res: Response) => {
  try {
    const { AuthToken } = req.cookies;
    if (!AuthToken) {
      //Primero me fijo si el cliente tiene su token
      return res.status(401).send('Error: No Token');
    }
    const isValidToken = verify(AuthToken, `${SECRET_AUTH}`);
    console.log(isValidToken);
    const serialized = serialize('AuthToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
      maxAge: 0,
      path: '/',
    });
    res.setHeader('Set-Cookie', serialized);
    res.status(200).send('Logout succesfully');
  } catch (error: any) {
    res.status(401).send('Invalid or expired Token');
  }
};
