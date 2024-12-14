import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

import { AcademicFacultyValidation } from './AcademicFaculty.validation';
import { AcademicFacultyControllers } from './AcademicFaculty.controllers';

const router = express.Router();

router.post(
  '/create-academic-faculty',
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

router.get('/', AcademicFacultyControllers.getAllAcademicFaculties);

export const AcademicFacultyRoutes = router;
