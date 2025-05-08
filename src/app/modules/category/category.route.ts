import { Router } from 'express';

import { categoryZodSchema } from './category.validation';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import validationRequest from '../../middlewares/validateRequest';

const router = Router();

router.post(
  '/create-category',
  auth(User_Role.admin, User_Role.editor),
  validationRequest(categoryZodSchema),
  CategoryController.createCategory
);

router.get(
  '/',
  auth(User_Role.admin, User_Role.editor),
  CategoryController.getAllCategory
);

export const categoryRouter = router;
