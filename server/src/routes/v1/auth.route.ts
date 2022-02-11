import {Router} from 'express';
import AuthController from '@controllers/auth.controller';
import {AuthDto} from '@dtos/auth/auth.dto';
import {Routes} from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import validationMiddleware from '@middlewares/validation.middleware';

class AuthRoute implements Routes {
  public path = '/';
  public authController = new AuthController();
  public router: any = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //if pass reference to express, it will be lost `this`, so must use arrow function to handler of express
    this.router.post(`${this.path}login`, validationMiddleware(AuthDto, 'body'), (req, res, next) => this.authController.logIn(req, res, next));
    this.router.get(`${this.path}logout`, authMiddleware, (req, res, next) => this.authController.logOut(req, res, next));
    this.router.post(`${this.path}refresh-token`, (req, res, next) => this.authController.refreshToken(req, res, next));
  }
}

export default AuthRoute;
