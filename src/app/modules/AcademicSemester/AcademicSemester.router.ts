import express from 'express';
import { AcademicSemesterControllers } from './AcademicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';

const router = express.Router()


//post
router.post('/create-academic-semester',
    validateRequest(
     AcademicSemesterValidations.createAcademicSemisterValidationSchema,

    ),
    AcademicSemesterControllers.createAcademicSemester);

    //single
    router.get(
        '/:semesterId',
        AcademicSemesterControllers.getSingleAcademicSemester,
      );

      //patch
      router.patch(
        '/:semesterId',
        validateRequest(
          AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
        ),
        AcademicSemesterControllers.updateAcademicSemester,
      );

      router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);



export const AcademicSemesterRoutes =router;