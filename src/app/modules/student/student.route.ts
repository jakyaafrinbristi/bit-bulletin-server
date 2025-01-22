import express from 'express';
import { StudentControllers } from './student.controller';
import validateRequest from '../../middlewares/validateRequest';
import { updateStudentValidationSchema } from './student.validation';
import auth from '../../middlewares/auth';

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
  auth('admin', 'faculty'),
  StudentControllers.getSingleStudent,
);
router.patch(
  '/:id',
  validateRequest(updateStudentValidationSchema),
  StudentControllers.updateStudent,
);

router.delete('/:id', StudentControllers.getDeleteStudent);

router.get('/', StudentControllers.getAllStudents);

export const StudentRoutes = router;
