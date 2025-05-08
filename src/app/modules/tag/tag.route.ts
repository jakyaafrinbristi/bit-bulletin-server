import { Router } from 'express';

import { tagZodSchema, updateTagZodSchema } from './tag.validation';
import { TagController } from './tag.controller';
import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import validationRequest from '../../middlewares/validateRequest';

const router = Router();
// create tag route
router.post(
  '/',
  auth(User_Role.admin, User_Role.editor),
  validationRequest(tagZodSchema),
  TagController.createTag
);
// get all tag route
router.get('/', TagController.getAllTag);
// get single tag route
router.get('/:_id', TagController.getSingleTag);
//update tag route
router.put(
  '/:_id',
  auth(User_Role.admin, User_Role.editor),
  validationRequest(updateTagZodSchema),
  TagController.updateTag
);
router.delete(
  '/:_id',
  auth(User_Role.admin, User_Role.editor),
  TagController.deleteTag
);

export const tagRouter = router;
