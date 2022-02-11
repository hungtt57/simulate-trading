import {Request} from 'express';
import {User} from '@interfaces/users.interface'

export interface IRequest extends Request {
  user: User | undefined;
  body: any;
  query: any;
}
