import { Request } from 'express';

export interface DecodedToken {
  userCredentials: {
    id: string;
  };
}

export interface AuthenticatedRequest extends Request {
  user?: DecodedToken['userCredentials'];
}
