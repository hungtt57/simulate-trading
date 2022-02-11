import { NextFunction, Request, Response } from 'express';
import IndexService from '../services/index.service'

class IndexController {
  public getData = async (req: Request, res: Response, next: NextFunction) => {
    try {
      let data = await IndexService.getData();
      return res.json({
        s: 200,
        data: data
      })
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
