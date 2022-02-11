import { IRequest, IResponse, INextFunction } from '@interfaces/vendors';
import { AuthDto } from '@dtos/auth/auth.dto';
import UserModel from '@models/users.model';
import AuthService from '@services/auth.service';
import jwt from 'jsonwebtoken';
import { User } from "@interfaces/users.interface";
import { logger, stream } from '@utils/logger';
import AuthConstant from '@constant/auth.constant'
import hashSytem from '@utils/brcrypt';

class AuthController {
  public authService = new AuthService();

  public async logIn(req: IRequest, res: IResponse, next: INextFunction) {
    try {
      const userBody: AuthDto = req.body;
      let user = await UserModel.findOne({ email: userBody.email }).lean()
      if (!user) {
        return res.json({
          s: 400,
          msg: 'User not found'
        })
      }
      if (!hashSytem.compare(userBody.password, user.password)) {
        return res.json({
          s: 400,
          msg: 'Password not match'
        })
      }
      let userData: User = {
        _id: user._id,
        email: user.email,
      }
      const token = jwt.sign({ user: userData }, `redoak.secret`)
      res.cookie('Authorization', token, {
        httpOnly: true,
        sameSite: false,
        maxAge: AuthConstant.MAX_TIME
      })
      let email = (user.email) ? user.email : user.userName
      this.authService.storeTokenInRedis(email, `${token}`).catch(error => logger.info(`doLogin store token error ${error.track}`))
      return res.json({
        s: 200,
        data: {
          token: token,
          user: userData,
        }
      })
    } catch (error) {
      next(error);
    }
  }

  public async logOut(req: IRequest, res: IResponse, next: INextFunction) {
    res.clearCookie('Authorization')
    this.authService.storeTokenInRedis(req.user.email, '').catch(error => logger.info(`doLogout clear token error ${error.track}`))
    res.send('Bye bye')
  }
  public refreshToken(req: IRequest, res: IResponse, next: INextFunction) {
    return res.json({
      s: 200,
      msg: 'Success'
    })
  }
}

export default AuthController;
