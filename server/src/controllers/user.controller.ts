import { IRequest, IResponse, INextFunction } from '@interfaces/vendors';
import {ListFilterEmrUserDto} from '@dtos/emrUser/emrUser.dto';
import UserService from '@services/users.service';

class UserController {
  public userService = new UserService();

  public async getAll(req: IRequest, res: IResponse, next: INextFunction) {
    try {
      let dataFilter: ListFilterEmrUserDto = req.query;
      let data = await this.userService.getAll(dataFilter);
      return res.json({
        s: 200,
        data: data
      })
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
