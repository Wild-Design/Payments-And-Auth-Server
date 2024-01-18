import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { SECRET_AUTH } = process.env;
import { AuthenticatedRequest, DecodedToken } from '../interfaces/auth.js';

export const isAutenticated = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { AuthToken } = req.cookies;
    if (!AuthToken) {
      return res.status(401).send('Error: No Token');
    }
    const decodedToken = verify(AuthToken, `${SECRET_AUTH}`) as DecodedToken; //si este codigo no es valido lanza un (ERROR por eso hay que manejarlo con try catch)

    req.user = decodedToken.userCredentials;
    next();
  } catch (error: any) {
    res.status(401).send('Invalid Token');
  }
};
