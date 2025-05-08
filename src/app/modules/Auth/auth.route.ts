
import validationRequest from '../../middlewares/validateRequest';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
import express from 'express';
const router = express.Router();

router.post(
  '/login',
  validationRequest(AuthValidation.authValidationSchema),
  AuthController.userLogin,
);

router.post(
  '/refresh-token',
  validationRequest(AuthValidation.refreshTokenValidationSchema),
  AuthController.refreshToken,
);

router.post(
  '/forget-password',
  validationRequest(AuthValidation.forgetPasswordValidationSchema),
  AuthController.forgetPassword,
);

router.post(
  '/reset-password',
  validationRequest(AuthValidation.resetPasswordValidationSchema),
  AuthController.resetPassword,
);
export const authRouter = router;
