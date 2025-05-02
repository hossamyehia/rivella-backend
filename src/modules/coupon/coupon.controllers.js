import { couponModel } from '../../../database/models/coupon.js';
import AppError from '../../utils/services/AppError.js';
// Create a new coupon (Admin)
export const createCoupon = async (req, res, next) => {
  const { code, discountType, discountValue, expiresAt, usageLimit } = req.body;
  if (!code || !discountType || discountValue == null || !expiresAt) {
    return next(new AppError('Required fields: code, discountType, discountValue, expiresAt', 400));
  }
  const existing = await couponModel.findOne({ code: code.toUpperCase().trim() });
  if (existing) {
    return next(new AppError('Coupon code already exists', 409));
  }
  const coupon = await couponModel.create({
    code: code.toUpperCase().trim(),
    discountType,
    discountValue, 
    expiresAt,
    usageLimit
  });

  res.status(201).json({ success: true, data: coupon });
};

// Get all coupons (Admin)
export const getAllCoupons = async (req, res) => {
  const coupons = await couponModel.find();
  res.status(200).json({ success: true, data: coupons });
};

// Get single coupon by ID (Admin)
export const getCouponById = async (req, res, next) => {
  const coupon = await couponModel.findById(req.params.id);
  if (!coupon) return next(new AppError('Coupon not found', 404));
  res.status(200).json({ success: true, data: coupon });
};

// Update a coupon (Admin)
export const updateCoupon = async (req, res, next) => {
  const updates = (({ discountType, discountValue, expiresAt, usageLimit ,code}) =>
    ({ discountType, discountValue, expiresAt, usageLimit,code }))(req.body);
  const coupon = await couponModel.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true, runValidators: true }
  );
  if (!coupon) return next(new AppError('Coupon not found', 404));
  res.status(200).json({ success: true, data: coupon });
};

// Delete a coupon (Admin)
export const deleteCoupon = async (req, res, next) => {
  const coupon = await couponModel.findByIdAndDelete(req.params.id);
  if (!coupon) return next(new AppError('Coupon not found', 404));
  res.status(200).json({ success: true, message: 'Coupon deleted' });
};


export const applyCoupon = async (req, res, next) => {
  const { code } = req.body;
  if (!code) return next(new AppError('Coupon code is required', 400));

  const coupon = await couponModel.findOne({ code: code.toUpperCase().trim() }).select("-_id");
  if (!coupon) return next(new AppError('Invalid coupon code', 404));

  const now = new Date();
  if (coupon.expiresAt < now) {
    return next(new AppError('Coupon has expired', 400));
  }
  if (coupon.usedCount >= coupon.usageLimit) {
    return next(new AppError('Coupon usage limit reached', 400));
  }


  res.status(200).json({ success: true, data: coupon });
};
