import { StatusCodes } from 'http-status-codes';
import catchAsynch from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { TagService } from './tag.service';

const createTag = catchAsynch(async (req, res) => {
  const result = await TagService.createTagIntoDB(req.body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Tag created is successfully',
    data: result,
  });
});

const getAllTag = catchAsynch(async (req, res) => {
  const result = await TagService.getAllTagFromDB();
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag is retrieved successfully',
    data: result,
  });
});

const getSingleTag = catchAsynch(async (req, res) => {
  // get id from bicycle route
  const { _id } = req.params;
  const result = await TagService.getSingleTagFromDB(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag is retrieved successfully',
    data: result,
  });
});

const updateTag = catchAsynch(async (req, res) => {
  // get id from bicycle route
  const { _id } = req.params;
  const result = await TagService.updateTagIntoDB(_id, req.body);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag update is successfully',
    data: result,
  });
});

const deleteTag = catchAsynch(async (req, res) => {
  // get id from bicycle route
  const { _id } = req.params;
  const result = await TagService.deleteTagFromDB(_id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Tag is deleted successfully',
    data: result,
  });
});

export const TagController = {
  createTag,
  getAllTag,
  getSingleTag,
  updateTag,
  deleteTag,
};
