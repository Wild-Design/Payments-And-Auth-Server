import { Request, Response } from 'express';

export const getUser = (_req: Request, res: Response) => {
  try {
    res.status(200).send('getUser OK');
  } catch (error: any) {
    res.status(500).send(`Error en el server getUser: ${error.message}`);
  }
};
