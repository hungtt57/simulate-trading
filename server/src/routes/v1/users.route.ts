import {Router} from 'express';
import {Routes} from '@interfaces/routes.interface';
import authMiddleware from '@middlewares/auth.middleware';
import UserController from '@controllers/user.controller';
class UserRoute implements Routes {
  public path = '/users';
  public userController = new UserController();
  public router: any = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    //if pass reference to express, it will be lost `this`, so must use arrow function to handler of express
    this.router.get(`${this.path}`, authMiddleware, (req, res, next) => this.userController.getAll(req, res, next));
    this.router.get(`${this.path}/test`, (req, res, next) => this.userController.getAll(req, res, next));
  }
}

export default UserRoute;
