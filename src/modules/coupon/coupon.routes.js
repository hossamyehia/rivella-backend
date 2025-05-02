// routes/coupon.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';
import {
  createCoupon,
  getAllCoupons,
  getCouponById,
  updateCoupon,
  deleteCoupon,
  applyCoupon
} from './coupon.controllers.js';
import { applyCouponSchema, createCouponSchema, idParamSchema, updateCouponSchema } from './coupon.valdation.js';
import { valdation } from '../../utils/middleware/valdation.js';


const couponRouter = express.Router();

// تطبيق كوبون (خلال حجز)
couponRouter.post(
  '/apply',
  valdation(applyCouponSchema),
  catchAsyncError(applyCoupon)
);

// إنشاء كوبون جديد
couponRouter.post(
  '/create',
  isAdmin,
  valdation(createCouponSchema),
  catchAsyncError(createCoupon)
);

// جلب كل الكوبونات
couponRouter.get(
  '/',
  isAdmin,
  catchAsyncError(getAllCoupons)
);

// جلب كوبون واحد بالـ ID
couponRouter.get(
  '/:id',
  isAdmin,
  valdation(idParamSchema),
  catchAsyncError(getCouponById)
);

// تحديث كوبون
couponRouter.put(
  '/:id',
  isAdmin,
  valdation(idParamSchema),
  valdation(updateCouponSchema),
  catchAsyncError(updateCoupon)
);

// حذف كوبون
couponRouter.delete(
  '/:id',
  isAdmin,
  valdation(idParamSchema),
  catchAsyncError(deleteCoupon)
);

export default couponRouter;
