import config from '../../config';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import {  TUser } from './user.interface';
import { User } from './user.model';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData : Partial<TUser>= {};

  //if password is not given,use deafault password
  
  //without if-else ,use this method

  userData.password = password || (config.default_pass as string)

  
  
  //alternative if-else diye


  // if(!password){
  //    user.password=config.default_pass as string;
  // }
  // else{
  //     user.password = password;
  // }

  //set student role

  userData.role = 'student';

  //set manually generate is
  userData.id ='123456'

//create a user
  const newUser = await User.create(userData);

  //create a student
  if(Object.keys(newUser).length){
    studentData.id = newUser.id;
    studentData.user= newUser._id //ref _id

    const newStudent =await Student.create(studentData);
    return newStudent; 
  }


};
export const UserServices = {
  createStudentIntoDB,
};
