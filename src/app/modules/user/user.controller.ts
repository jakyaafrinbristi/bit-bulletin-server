import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserService } from './user.service';


const registerUser = catchAsynch(async (req, res) => {
  const payload = req.body;
  const result = await UserService.registerUserIntoDB(req.file, payload);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User register is successfully',
    data: result,
  });
});

const getAllUser = catchAsynch(async (req, res) => {
  const result = await UserService.getAllUserFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'User retrieved is successfully',
    data: result,
  });
});

export const UserController = {
  registerUser,
  getAllUser,
};
