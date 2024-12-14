import mongoose from 'mongoose';
import config from '../../config';
import httpStatus from 'http-status';

import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genareteStudentId } from './user.utils';

import AppError from '../../errors/AppError';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};

  //if password is not given,use deafault password

  //without if-else ,use this method

  userData.password = password || (config.default_pass as string);

  //alternative if-else diye

  // if(!password){
  //    user.password=config.default_pass as string;
  // }
  // else{
  //     user.password = password;
  // }

  //set student role

  userData.role = 'student';

  //find Academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );
  // console.log(admissionSemester)
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set  generated id
    userData.id = await genareteStudentId(admissionSemester);

    //create a user(transaction-1)
    const newUser = await User.create([userData], { session });

    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id; //ref _id

    //create a student(transaction-1)
    const newStudent = await Student.create([payload], { session });

    if (!newStudent.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    }
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }

  //set manually generate is
  // userData.id = '123456';//eita manually aache eitak dynamically kora lagbe

  //set generated id

  // userData.id =await genareteStudentId(admissionSemester)

  // //create a user
  // const newUser = await User.create(userData);

  // //create a student
  // if (Object.keys(newUser).length) {
  //   payload.id = newUser.id;
  //   payload.user = newUser._id; //ref _id

  //   const newStudent = await Student.create(payload);
  //   return newStudent;
  // }
};
export const UserServices = {
  createStudentIntoDB,
};
