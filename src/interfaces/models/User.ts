import { Model } from 'sequelize';
import { IUser } from '../User.js';

export interface IUserInstance extends Model<IUser>, IUser {}
