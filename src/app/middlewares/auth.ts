import { NextFunction, Request, Response } from 'express';
import catchAsynch from '../utils/catchAsync';

import jwt, { JwtPayload } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { TUserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';
import config from '../config';
import AppError from '../errors/AppError';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsynch(
    async (req: Request, res: Response, next: NextFunction) => {
      const token = req.headers.authorization;
      // if the token sent from the client
      if (!token) {
        throw new AppError(
          StatusCodes.UNAUTHORIZED,
          'Access token missing or invalid'
        );
      }
      //check if the token is the valid
      let decoded;
      try {
        decoded = jwt.verify(
          token,
          config.jwt_access_secret as string
        ) as JwtPayload;
      } catch (err) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized');
        console.log(err);
      }

      const { role, email } = decoded;
      //find by user with email
      const user = await User.isUserExitsByEmail(email);
      //checking user is exists
      if (!user) {
        throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
      }
      //set the user role in required role
      if (requiredRole && !requiredRole.includes(role)) {
        throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized!');
      }
      req.user = user;
      next();
    }
  );
};

export default auth;
