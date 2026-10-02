import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
  resetEmailSchema,
  resetPasswordSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshUserSession,
  requestResetPassword,
  resetPassword
} from '../controllers/authController.js';
const router = Router();
router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), loginUser);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);
router.post('/auth/request-reset-email',celebrate(resetEmailSchema), requestResetPassword);
router.post('/auth/reset-password', celebrate(resetPasswordSchema), resetPassword);
export default router;
