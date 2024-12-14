import { Schema, model } from 'mongoose';
import { TAcademicDepartment } from './AcademicDepartment.interface';
import AppError from '../../errors/AppError';

const academicDepartmentSchema = new Schema<TAcademicDepartment>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
  },
);

//pre middleware hook-create validation
// academicDepartmentSchema.pre('save',async function (next){
//     const isDepartmentExists = await AcademicDepartment.findOne({

//   name:this.name,
// })
// if(isDepartmentExists){
//   throw new AppError(httpStatus.NOT_FOUND,'This Department is already exists')
// }

//   next()
// });

//update validatiion
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExists = await AcademicDepartment.findOne(query);
  if (!isDepartmentExists) {
    throw new AppError(httpStatus.NOT_FOUND, 'This department doesnot exist');
  }
  next();
});

export const AcademicDepartment = model<TAcademicDepartment>(
  'AcademicDepartment',
  academicDepartmentSchema,
);
