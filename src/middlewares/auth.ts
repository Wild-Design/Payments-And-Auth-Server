import { Request, Response, NextFunction } from 'express';

export const AuthLogin = (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
  } catch (error: any) {
    res.status(500).send(error.messaje);
  }
};
