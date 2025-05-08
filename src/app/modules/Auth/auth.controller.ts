import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import config from '../../config';
import { AuthService } from './auth.service';

const userLogin = catchAsynch(async (req, res) => {
  const result = await AuthService.userloginIntoDB(req.body);
  const { refreshToken, accessToken } = result;
  res.cookie('refreshToken', refreshToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  });
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User login is successfully',
    data: {
      accessToken,
    },
  });
});

const refreshToken = catchAsynch(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Access token is retrieved successfully',
    data: result,
  });
});

const forgetPassword = catchAsynch(async (req, res) => {
  const userEmail = req.body.email;
  const result = await AuthService.forgetPassword(userEmail);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset link is generated successfully',
    data: result,
  });
});

const resetPassword = catchAsynch(async (req, res) => {
  const token = req.headers.authorization;
  const result = await AuthService.resetPassword(req.body, token);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Reset link is generated successfully',
    data: result,
  });
});

export const AuthController = {
  userLogin,
  forgetPassword,
  refreshToken,
  resetPassword,
};
