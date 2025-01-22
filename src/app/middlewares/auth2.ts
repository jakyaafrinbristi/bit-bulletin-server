import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';

const auth2 = (...requiredRoles: TUserRole[]) => {
  //   console.log(requiredRoles,"role")

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //  console.log(token);
    //if the token is sent from the client

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized 1');
    }

    //  check if the token is valid

    jwt.verify(
      token,
      config.jwt_access_secret as string,
      function (err, decoded) {
        //err
        if (err) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'You are not authorized 2',
          );
        }
        // console.log(decoded)
        const role = (decoded as JwtPayload).jwtPayload.role;

        // console.log(role)
        if (requiredRoles && !requiredRoles.includes(role)) {
          throw new AppError(
            httpStatus.UNAUTHORIZED,
            'you are not authorized 3',
          );
        }
        //decoded undefined

        req.user = decoded as JwtPayload;
        next();

        // console.log(decoded)
      },
    );
  });
};
export default auth2;
