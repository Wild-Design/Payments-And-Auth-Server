import { Request, Response } from 'express';
import { User } from '../../db/index.js';
import { hashPassword } from '../../utils/passwordEncrypted.js';

export default async (req: Request, res: Response) => {
  try {
    req.body.password = hashPassword(req.body.password);
    const createUser = await User.create(req.body);
    res.status(200).send(createUser);
  } catch (error: any) {
    res.status(500).send(error.message);
  }
};
