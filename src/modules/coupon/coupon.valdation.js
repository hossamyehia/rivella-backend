// src/validation/coupon.validation.js
import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Schema لإنشاء كوبون جديد
export const createCouponSchema = Joi.object({
  code: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required()
    .messages({
      'string.base': 'Code must be a string.',
      'string.empty': 'Code is required.',
      'string.alphanum': 'Code must be alphanumeric.',
      'string.min': 'Code must be at least {#limit} characters.',
      'string.max': 'Code cannot exceed {#limit} characters.'
    }),
  discountType: Joi.string()
    .valid('percentage', 'fixed')
    .required()
    .messages({
      'any.only': 'discountType must be either percentage or fixed.',
      'any.required': 'discountType is required.'
    }),
  discountValue: Joi.number()
    .min(0)
    .required()
    .messages({
      'number.base': 'discountValue must be a number.',
      'number.min': 'discountValue cannot be negative.',
      'any.required': 'discountValue is required.'
    }),
  expiresAt: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'expiresAt must be a valid date.',
      'date.format': 'expiresAt must be in ISO format.',
      'any.required': 'expiresAt is required.'
    }),
  usageLimit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({
      'number.base': 'usageLimit must be a number.',
      'number.integer': 'usageLimit must be an integer.',
      'number.min': 'usageLimit must be at least {#limit}.'
    })
});

// Schema لتطبيق الكوبون
export const applyCouponSchema = Joi.object({
  code: Joi.string()
    .alphanum()
    .required()
    .messages({
      'string.empty': 'Code is required.',
      'string.alphanum': 'Code must be alphanumeric.'
    })
});

// Schema لباراميتر الـ ID
export const couponIdSchema = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.empty': 'Coupon ID is required.',
      'string.pattern.base': 'Coupon ID must be a valid ObjectId.'
    })
});

// Schema لتحديث الكوبون
export const updateCouponSchema = Joi.object({
  code: Joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .optional()
    .messages({
      'string.alphanum': 'Code must be alphanumeric.',
      'string.min': 'Code must be at least {#limit} characters.',
      'string.max': 'Code cannot exceed {#limit} characters.'
    }),
  discountType: Joi.string()
    .valid('percentage', 'fixed')
    .optional()
    .messages({ 'any.only': 'discountType must be either percentage or fixed.' }),
  discountValue: Joi.number()
    .min(0)
    .optional()
    .messages({ 'number.min': 'discountValue cannot be negative.' }),
  expiresAt: Joi.date()
    .iso()
    .optional()
    .messages({ 'date.format': 'expiresAt must be in ISO format.' }),
  usageLimit: Joi.number()
    .integer()
    .min(1)
    .optional()
    .messages({ 'number.min': 'usageLimit must be at least {#limit}.' })
});
