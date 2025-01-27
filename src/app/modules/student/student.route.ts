import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();
// router.get('/:studentId', StudentControllers.getSingleStudent);
// router.patch(
//   '/:studentId',
//   validateRequest(updateStudentValidationSchema),
//   StudentControllers.updateStudent,
// );

// router.delete('/:studentId', StudentControllers.getDeleteStudent);
router.get(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin,USER_ROLE.faculty),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  auth(USER_ROLE.superAdmin,USER_ROLE.admin),
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id',auth(USER_ROLE.superAdmin,USER_ROLE.admin), StudentControllers.getDeleteStudent);

router.get('/',auth(USER_ROLE.superAdmin,USER_ROLE.admin), StudentControllers.getAllStudents);

export const StudentRoutes = router;
