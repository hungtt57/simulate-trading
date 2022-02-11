import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@interfaces/routes.interface';

class IndexRoute implements Routes {
  public path = '/';
  public router = Router();
  public indexController = new IndexController();

  constructor() {

    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}ping`, (req, res, next) => {
      return res.send('ping')
    });
    this.router.get(`${this.path}get-data-sell`, (req, res, next) => this.indexController.getData(req, res, next))
  }
}

export default IndexRoute;
