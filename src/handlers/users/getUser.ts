import { Request, Response } from 'express';
import { User } from '../../db/index.js';

export default async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).send(users);
  } catch (error: any) {
    res.status(500).send(`Error in the server getUser: ${error.message}`);
  }
};
