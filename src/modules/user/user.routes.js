// routes/auth.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isLogin } from '../../utils/middleware/auth.js';


import {
  registerUser,
  verifyEmail,
  resendVerificationCode,
  loginUser,
  getUserProfile,
  updateUserProfile,
  forgetPassword,
  resetPassword,
  checkResetToken
} from './user.controller.js';

import {
  registerUserSchema,
  verifyEmailSchema,
  resendVerificationCodeSchema,
  loginUserSchema,
  updateUserProfileSchema
} from './user.valdation.js';
import { valdation } from '../../utils/middleware/valdation.js';

const UserRouter = express.Router();

// تسجيل مستخدم جديد
UserRouter.post(
  '/register',
  valdation(registerUserSchema),
  catchAsyncError(registerUser)
);

// التحقق من البريد الإلكتروني
UserRouter.post(
  '/verify-email',
  valdation(verifyEmailSchema),
  catchAsyncError(verifyEmail)
);

// إعادة إرسال كود التحقق
UserRouter.post(
  '/resend-verification-code',
  valdation(resendVerificationCodeSchema),
  catchAsyncError(resendVerificationCode)
);

// تسجيل دخول مستخدم
UserRouter.post(
  '/login',
  valdation(loginUserSchema),
  catchAsyncError(loginUser)
);

// جلب بروفايل المستخدم
UserRouter.get(
  '/profile',
  isLogin,
  catchAsyncError(getUserProfile)
);

// تحديث بروفايل المستخدم
UserRouter.put(
  '/profile',
  isLogin,
  valdation(updateUserProfileSchema),
  catchAsyncError(updateUserProfile)
);


UserRouter.post("/forgot-password",forgetPassword);
UserRouter.get("/check-reset-token",checkResetToken);
UserRouter.post("/reset-password",resetPassword);
export default UserRouter;
