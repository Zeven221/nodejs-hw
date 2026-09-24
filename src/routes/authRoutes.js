import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  loginUserSchema,
  registerUserSchema,
} from '../validations/authValidation.js';
import {
  registerUser,
  userLogin,
  logoutUser,
  refreshUserSession
} from '../controllers/authController.js';
const router = Router();
router.post('/auth/register', celebrate(registerUserSchema), registerUser);
router.post('/auth/login', celebrate(loginUserSchema), userLogin);
router.post('/auth/refresh', refreshUserSession);
router.post('/auth/logout', logoutUser);
export default router;
