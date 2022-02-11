import { Response } from 'express';

export interface IResponse extends Response {
  json: any;
  cookie: any;
  clearCookie: any;
  send: any;
}
