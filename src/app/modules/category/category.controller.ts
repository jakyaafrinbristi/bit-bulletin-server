import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsynch(async (req, res) => {
  const result = await CategoryService.createCategoryIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Category created successfully',
    data: result,
  });
});

const getAllCategory = catchAsynch(async (req, res) => {
  const result = await CategoryService.getAllCategoryFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Category is retrieved successfully',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
