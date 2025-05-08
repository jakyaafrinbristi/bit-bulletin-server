import { Router } from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { userRouter } from '../modules/user/user.route';

const router = Router();
const modulesRoute = [
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/auth',
    route: authRouter,
  },
 
];

modulesRoute.forEach((route) => router.use(route.path, route.route));

export default router;
