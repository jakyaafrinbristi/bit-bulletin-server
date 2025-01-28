// import mongoose, { Query } from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';
import QueryBuilder from '../../builder/QueryBuilder';
import { studentSearchableFields } from './student.constant';
import mongoose from 'mongoose';

// static method
// const createStudentIntoDB = async (studentData: TStudent) => {
//   if (await Student.isUserExists(studentData.id)) {
//     throw new Error('User already exists!');
//   }
//   const result = await Student.create(studentData); //built in static method
//   //  const result = await StudentModel.create(student); //built in static method

//   //static method

//   //instance method

//   // const student = new Student(studentData); //create an instance

//   // if (await student.isUserExists(studentData.id)) {
//   //   throw new Error('User already exists!');
//   // }
//   // const result = await student.save(); //built in instance method

//   return result;
// };

const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query)
  // const queryObj ={...query}; // copy
  // const studentSearchableFields = ['email','name.firstName',"presentAddress"]
  // let searchTerm ='';
  // if(query?.searchTerm){
  //   searchTerm = query?.searchTerm as string;
  // }
  // const searchQuery = Student.find({
  //   $or : studentSearchableFields.map((field)=>({
  //     [field] :{$regex :searchTerm, $options:"i"}
  //   }))
  // })

  //filtering

  // const  excludeFields = ['searchTerm','sort','limit','page','fields']

  // excludeFields.forEach((el) => delete queryObj[el]);

  // console.log ({query},{queryObj})
  //   // const result = await searchQuery
  //   const filterQuery =  searchQuery
  //   .find(queryObj)
  // .populate('admissionSemester')
  // .populate({
  //   path:'academicDepartment',

  //   populate:{
  //     path:'academicFaculty'
  //   }
  // })

  // //sorting
  // let sort ="-createdAt"

  // if(query.sort){
  //   sort = query.sort as string;
  // }
  // // const sortQUery =await filterQuery.sort(sort)
  // //limit
  // const sortQUery = filterQuery.sort(sort)

  // let page =1;
  // let limit =1;
  // let skip =0;

  // if(query.limit){
  //   limit =Number(query.limit)
  // }

  // if(query.page){
  //   page =Number(query.page)
  //   skip = (page-1) * limit
  // }
  // const paginateQuery =sortQUery.skip(skip)

  // // const limitQuery = await sortQUery.limit(limit);
  // //   return limitQuery;
  // // const limitQuery = await paginateQuery.limit(limit);
  // const limitQuery = paginateQuery.limit(limit);
  // //field limiting

  // let fields = '-__v';
  // if(query.fields){
  //   fields=(query.fields as string).split(',').join(' ')
  //   console.log(fields)
  // }
  // const fieldQuery =await limitQuery.select(fields);

  //   // return limitQuery;
  //   return fieldQuery ;

  const studentQuery = new QueryBuilder(
    Student.find()
      .populate('user')
      .populate('admissionSemester')
      .populate('academicDepartment academicFaculty')
      // .populate({
      //   path: 'academicDepartment',

      //   populate: {
      //     path: 'academicFaculty',
      //   },
      // }),
      ,
    query,
  )
    .search(studentSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await studentQuery.modelQuery;
  const meta =await studentQuery.countTotal()
  return { result,meta };
};

const getSingleStudentFromDB = async (id: string) => {
  // const result = await Student.aggregate
  // ([{ $match: { id: id } }]);
  const result = await Student.findById(id) //when we use mongoose id ,we will use this
    // const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  return result;
};
const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  // const result = await Student.findOneAndUpdate({ id },
  const result = await Student.findByIdAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    // const deletedStudent = await Student.findOneAndUpdate(
    //   { id },

    const deletedStudent = await Student.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }

    // const deletedUser = await User.findOneAndUpdate(
    //   { id },
    //   { isDeleted: true },
    //   { new: true, session },
    // );

    // get user _id from deletedStudent
    const userId = deletedStudent.user;

    const deletedUser = await User.findByIdAndUpdate(
      userId,
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
  updateStudentIntoDB,
};
