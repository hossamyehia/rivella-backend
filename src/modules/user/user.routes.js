// routes/auth.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';

import {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  getUserProfile,
  updateUserProfile
} from './user.controller.js';
import { isLogin } from '../../utils/middleware/auth.js';


const UserRouter = express.Router();

UserRouter.post(
  '/register',
  catchAsyncError(registerUser)
);

UserRouter.post(
  '/verify-email',
  catchAsyncError(verifyEmail)
);

UserRouter.post(
  '/resend-verification-code',
  catchAsyncError(resendVerificationCode)
);

UserRouter.post(
  '/login',
  catchAsyncError(loginUser)
);

UserRouter.get(
  '/profile',
  isLogin,         
  catchAsyncError(getUserProfile)
);

UserRouter.put(
  '/profile',
  isLogin,         
  catchAsyncError(updateUserProfile)
);

export default UserRouter;
