import config from '../../config';
import { TAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { AcademicSemester } from '../AcademicSemester/AcademicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { genareteStudentId } from './user.utils';

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

  const admissionSemester = await AcademicSemester.findById(payload.admissionSemester)





  
  //set manually generate is
  // userData.id = '123456';//eita manually aache eitak dynamically kora lagbe

  //set generated id 

  userData.id =await genareteStudentId(admissionSemester)



  


  //create a user
  const newUser = await User.create(userData);

  //create a student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id; //ref _id

    const newStudent = await Student.create(payload);
    return newStudent;
  }
};
export const UserServices = {
  createStudentIntoDB,
};
