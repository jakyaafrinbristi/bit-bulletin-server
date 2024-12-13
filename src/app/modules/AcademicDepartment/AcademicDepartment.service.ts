import { TAcademicDepartment } from "./AcademicDepartment.interface";
import { AcademicDepartment } from "./AcademicDepartment.model";


const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {

  //static vabe handle kora
  // const isDepartmentExists = await AcademicDepartment.findOne({
  
  //   name:payload.name,
  // })
  // if(isDepartmentExists){
  //   throw new Error('This Department is already exists')
  // }

  const result = await AcademicDepartment.create(payload);
  return result;
};

const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find().populate('academicFaculty')
  return result;
};

const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = 
    await AcademicDepartment.findById(id).populate('academicFaculty')
  return result;
};

const updateAcademicDepartmentIntoDB = async (
  id: string,
  payload: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentServices = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentIntoDB,
};