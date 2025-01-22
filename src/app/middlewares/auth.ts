import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  // console.log(requiredRoles,"role")

  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    //  console.log(token);
    //if the token is sent from the client

    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized 1');
    }

    //  check if the token is valid when  i am using backend
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    console.log(decoded);

    const { role, userId, iat } = decoded;

    //  const role = decoded.jwtPayload.role;
    //  const id = decoded.jwtPayload.id;
    const user = await User.isUserExistsByCustomId(userId);
    //  console.log(user,"user ashtesena")

    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'This user is not Found'); //static method
    }

    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }
    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
      throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    console.log(role);

    if (
      user.passwordChangedAt &&
      User.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'you are not authorized 3');
    }
    //decoded undefined

    req.user = decoded as JwtPayload & { role };
    next();
  });
};
export default auth;
