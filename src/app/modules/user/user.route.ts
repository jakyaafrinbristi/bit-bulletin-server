import express, { NextFunction, Request, Response } from 'express';
import { UserControllers } from './user.controller';

import { createStudentValidationSchema } from '../student/student.validation';
import validateRequest from '../../middlewares/validateRequest';
import { createFacultyValidationSchema } from '../Faculty/faculty.validation';
import { createAdminValidationSchema } from '../Admin/admin.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';
import { UserValidation } from './user.validation';
import { upload } from '../../utils/sendImage';

const router = express.Router();

router.post(
  '/create-student',
  auth(USER_ROLE.admin),
  upload.single('file'),
  (req:Request, res:Response ,next:NextFunction)=>{
    req.body = JSON.parse(req.body.data)
next()
  },
  validateRequest(createStudentValidationSchema),
  UserControllers.createStudent,
);
;
router.post(
  '/create-faculty',
  auth(USER_ROLE.admin),

  validateRequest(createFacultyValidationSchema),
  UserControllers.createFaculty,
);

router.post(
  '/create-admin',

  validateRequest(createAdminValidationSchema),
  UserControllers.createAdmin,
);
router.post(
  '/change-status/:id',
  auth('admin'),
  validateRequest(UserValidation.changeStatusValidationSchema),
  UserControllers.changeStatus,
);
router.get(
  '/me',
  auth('student', 'faculty', 'admin'),

  UserControllers.getMe,
)

export const UserRoutes = router;
