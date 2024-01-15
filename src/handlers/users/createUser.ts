import { Request, Response } from 'express';
import { User } from '../../db/index.js';

export default async (req: Request, res: Response) => {
  try {
    const createUser = await User.create(req.body);
    res.status(200).send(createUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
