//year semesterCode 4 digit number

import { TAcademicSemester } from '../AcademicSemester/AcademicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  //return lastStudent?.id ? lastStudent.id.substring(6) : undefined //prothom 4ta pawar jonno
  return lastStudent?.id ? lastStudent.id : undefined; //sob kichu data
};

export const genareteStudentId = async (payload: TAcademicSemester) => {
  //first time 0000
  //const currentId =await  findLastStudentId() ||(0).toString();

  let currentId = (0).toString(); //0000 by default

  const lastStudentId = await findLastStudentId();

  const lastStudentSemesterCode = lastStudentId?.substring(4, 6);
  const lastStudentYear = lastStudentId?.substring(0, 4);

  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};
