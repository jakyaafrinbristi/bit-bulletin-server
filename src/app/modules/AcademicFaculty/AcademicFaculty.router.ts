import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyValidation } from './AcademicFaculty.validation';
import { AcademicFacultyControllers } from './AcademicFaculty.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/create-academic-faculty',
  auth(USER_ROLE.superAdmin ,USER_ROLE.admin)
  ,
  validateRequest(
    AcademicFacultyValidation.createAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.createAcademicFaculty,
);

router.get('/:facultyId', AcademicFacultyControllers.getSingleAcademicFaculty);

router.patch(
  '/:facultyId',
  validateRequest(
    AcademicFacultyValidation.updateAcademicFacultyValidationSchema,
  ),
  AcademicFacultyControllers.updateAcademicFaculty,
);

router.get('/', auth(USER_ROLE.superAdmin ,USER_ROLE.admin), AcademicFacultyControllers.getAllAcademicFaculties);
// router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
