import {NextFunction, Response} from 'express';
import jwt from 'jsonwebtoken';
import {HttpException} from '@exceptions/HttpException';
import {DataStoredInToken, RequestWithUser} from '@interfaces/auth.interface';
import AuthService from '@services/auth.service';
import AuthConstant from '@constant/auth.constant';
import {logger} from '@utils/logger';

const authMiddleware = async (req: RequestWithUser, res: Response, next: NextFunction) => {
  try {
    const Authorization = req.cookies['Authorization'] || req.header('Authorization').split('Bearer ')[1] || null;
    if (!Authorization) {
      return next(new HttpException(404, 'Authentication token missing'));
    }
    const authService = new AuthService();
    const secretKey: string = 'redoak.secret';
    const verificationResponse = (await jwt.verify(Authorization, secretKey)) as DataStoredInToken;
    req.user = verificationResponse.user
    let token = await authService.receiveTokenInRedis(verificationResponse.user.email)
    if (token && token === Authorization) {
      authService.storeTokenInRedis(verificationResponse.user.email, token).catch(error => logger.info(`verifyLogin store token error ${error.track}`))
      res.cookie('Authorization', token, { maxAge: AuthConstant.MAX_TIME, sameSite: false })
      req.user = verificationResponse.user // assign user data for all request
      return next()
    } else {
      next(new HttpException(401, 'Wrong authentication token'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

export default authMiddleware;
