import { StatusCodes } from 'http-status-codes';

import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { sendEmail } from '../../utils/sendEmail';
import bcrypt from 'bcrypt';
import config from '../../config';
import AppError from '../../errors/AppError';

const userloginIntoDB = async (payload: ILoginUser) => {
  //find by user with email
  const user = await User.isUserExitsByEmail(payload.email);
  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }
  //checking user password is matched
  if (!(await User.isPasswordMatched(payload?.password, user?.password))) {
    throw new AppError(StatusCodes.FORBIDDEN, 'Password do not matched');
  }
  // create access token
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });
  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: '30d',
    },
  );

  return { accessToken, refreshToken };
};

//user create refresh token access
const refreshToken = async (token: string) => {
  // if the token sent from the client
  if (!token) {
    throw new AppError(
      StatusCodes.UNAUTHORIZED,
      'Access token missing or invalid',
    );
  }
  //check if the token is the valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string,
  ) as JwtPayload;

  const { email } = decoded;
  //find by user with email
  const user = await User.isUserExitsByEmail(email);
  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  // create access token
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
  };
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '7d',
  });

  return { accessToken };
};

//user forget password
const forgetPassword = async (email: string) => {
  //find by user with email
  const user = await User.isUserExitsByEmail(email);
  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }

  // create access token
  const jwtPayload = {
    name: user?.name,
    email: user?.email,
    role: user?.role,
  };
  const resetToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: '5min',
  });
  const resetUILink = `${config.reset_pass_ui_link}?email=${user.email}&token=${resetToken}`;

  sendEmail(user.email, resetUILink);
};

const resetPassword = async (
  payload: { email: string; newPassword: string },
  token: string | undefined,
) => {
  //find by user with email
  const user = await User.isUserExitsByEmail(payload.email);
  //checking user is exists
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is not found!');
  }
  //check if the token is the valid
  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  if (payload.email !== decoded.email) {
    throw new AppError(StatusCodes.FORBIDDEN, 'You are forbidden!');
  }
  //new hashed password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  await User.findOneAndUpdate(
    { email: decoded.email, role: decoded.role },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );
};

export const AuthService = {
  userloginIntoDB,
  forgetPassword,
  resetPassword,
  refreshToken,
};
