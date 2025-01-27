import express from 'express';
import { AcademicSemesterControllers } from './AcademicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidations } from './AcademicSemester.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

//post
router.post(
  '/create-academic-semester',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,),
  validateRequest(
    AcademicSemesterValidations.createAcademicSemisterValidationSchema,
  ),
  AcademicSemesterControllers.createAcademicSemester,
);

//single
router.get(
  '/:semesterId',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  AcademicSemesterControllers.getSingleAcademicSemester,
);

//patch
router.patch(
  '/:semesterId',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,),
  validateRequest(
    AcademicSemesterValidations.updateAcademicSemesterValidationSchema,
  ),
  AcademicSemesterControllers.updateAcademicSemester,
);

router.get(
  '/',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty,USER_ROLE.student),
  AcademicSemesterControllers.getAllAcademicSemesters,
);

export const AcademicSemesterRoutes = router;
