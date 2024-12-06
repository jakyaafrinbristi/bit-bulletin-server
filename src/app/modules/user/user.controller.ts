import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createStudent = async (req: Request, res: Response ,next : NextFunction) => {
  try {
    //creating a schema validation using zod

    const { password, student: studentData } = req.body;

    //data validation using zod
    //   const zodparsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: 'Something Went Wrong',
    //     error: error.details,
    //   });
    // }

    // res.status(200).json({
    //   success: true,
    //   message: 'Student is created successfully',
    //   data: result,
    // });

    sendResponse(res,{
        statusCode: httpStatus.Ok,
        success: true,
        message: "Student Created SuccessFully",
        data: result
    });
  } catch (err) {
   next(err)
  }
};

export const  UserControllers ={
    createStudent
}