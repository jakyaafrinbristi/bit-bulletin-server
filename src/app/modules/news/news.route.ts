import { NextFunction, Request, Response, Router } from 'express';

import { createNewsZodSchema, updateNewsZodSchema } from './news.validation';

import auth from '../../middlewares/auth';
import { User_Role } from '../user/user.constant';
import { upload } from '../../utils/fileUpload';
import validationRequest from '../../middlewares/validateRequest';
import { NewsController } from './news.controller';


const router = Router();
router.post(
  '/',
  auth(User_Role.admin, User_Role.editor, User_Role.reporter),
  upload.single('file'),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next();
  },
  validationRequest(createNewsZodSchema),
  NewsController.createNews
);

router.get('/', NewsController.getAllNews);

router.get('/:_id', NewsController.getSingleNews);

router.patch(
  '/:_id',
  auth(User_Role.admin, User_Role.editor, User_Role.reporter),
  validationRequest(updateNewsZodSchema),
  NewsController.updateNews
);
router.delete(
  '/:_id',
  auth(User_Role.admin, User_Role.editor, User_Role.reporter),
  NewsController.deleteNews
);

export const newsRouter = router;
