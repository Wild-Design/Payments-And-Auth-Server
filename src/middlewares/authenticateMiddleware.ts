import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
const { verify } = jwt;
const { SECRET_AUTH } = process.env;
import { AuthenticatedRequest, DecodedToken } from '../interfaces/auth.js';

/*Este middleware lo uso para saber si un usuario esta autenticado: En mi caso en el momento
en el que un usuario se loguea le mando la cookie con las credenciales que son
simplemente el id del usuario. Yo asumo con este middleware que me llega esa cookie
Entonces lo usaria en cada endpoint que nececite autenticación y a su ves seteo
una nueva propiedad user en el req para pasar el id del usuario a el siguiente handler*/

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
