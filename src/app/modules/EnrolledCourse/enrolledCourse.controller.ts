import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { EnrolledCourseServices } from "./enrolledCourse.service";
import httpStatus from 'http-status';

const createEnrolledCourse = catchAsync(async (req, res) => {
    const userId = req.user.userId;
    const result = await EnrolledCourseServices.createEnrolledCourseIntoDB(userId,req.body);
    

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Student is enrolled succesfully',
        data: result,
      });
    });

    const updateEnrolledCourseMarks = catchAsync(async (req, res) => {
      // console.log(req.user)
      const facultyId = req.user.userId;//req.user means token
      const result = await EnrolledCourseServices.updateEnrolledCourseMarksIntoDB(
        facultyId,
        req.body,
      );
    
      sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Marks is updated succesfully',
        data: result,
      });
    });
    export const EnrolledCourseControllers = {
        createEnrolledCourse,
        updateEnrolledCourseMarks,
      
      };