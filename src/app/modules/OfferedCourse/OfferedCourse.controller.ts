import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import httpStatus from 'http-status';
import { OfferedCourseServices } from "./OfferedCourse.service";
import sendResponse from "../../utils/sendResponse";

const createOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const result = await OfferedCourseServices.createOfferedCourseIntoDb(
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Offered Course is created successfully !',
      data: result,
    });
  });

  const updateOfferedCourse = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
  
    const result = await OfferedCourseServices.updateOfferedCourseIntoDb(
      id,
      req.body,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'OfferedCourse updated successfully',
      data: result,
    });
  });
  const deleteOfferedCourseFromDb = catchAsync(
    async (req: Request, res: Response) => {
      const { id } = req.params;
      const result = await OfferedCourseServices.deleteOfferedCourseFromDb(id);
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'OfferedCourse deleted successfully',
        data: result,
      });
    },
  );
  


  export const OfferedCourseControllers = {
    createOfferedCourse,
    updateOfferedCourse,
    deleteOfferedCourseFromDb
  }