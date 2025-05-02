// src/validation/bookingRequest.validation.js
import Joi from 'joi';

// تعريف نمط ObjectId (24 خانة hex)
const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Schema لعملية إنشاء طلب حجز
export const createBookingRequestSchema = Joi.object({
  chaletId: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.base': 'Chalet ID must be a string.',
      'string.empty': 'Chalet ID is required.',
      'string.pattern.base': 'Chalet ID must be a valid ObjectId.',
      'any.required': 'Chalet ID is required.'
    }),

  checkIn: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'checkIn must be a valid date.',
      'date.format': 'checkIn must be in ISO format.',
      'any.required': 'checkIn date is required.'
    }),

  checkOut: Joi.date()
    .iso()
    .required()
    .messages({
      'date.base': 'checkOut must be a valid date.',
      'date.format': 'checkOut must be in ISO format.',
      'any.required': 'checkOut date is required.'
    }),

  guests: Joi.number()
    .integer()
    .min(1)
    .required()
    .messages({
      'number.base': 'Guests must be a number.',
      'number.min': 'At least one guest is required.',
      'any.required': 'Guests count is required.'
    }),

  couponCode: Joi.string()
    .trim()
    .optional()
    .messages({
      'string.base': 'Coupon code must be a string.'
    }),

  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
    .optional()
    .messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least {#limit} characters long.',
      'string.max': 'Name cannot be more than {#limit} characters long.',
      'string.pattern.base': 'Name can only contain letters and spaces.'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.'
    }),

  phone: Joi.string()
    .pattern(/^(010|011|012|015)[0-9]{8}$/)
    .optional()
    .messages({
      'string.base': 'Phone number must be a string.',
      'string.pattern.base': 'Phone number must be a valid Egyptian number.'
    })
});

// Schema لعملية جلب طلبات الحجز مع الفلترة والصفحة
export const getBookingRequestsSchema = Joi.object({
  page: Joi.number()
    .integer()
    .min(1)
    .default(1)
    .messages({
      'number.base': 'Page must be a number.',
      'number.min': 'Page must be at least {#limit}.'
    }),

  limit: Joi.number()
    .integer()
    .min(1)
    .default(20)
    .messages({
      'number.base': 'Limit must be a number.',
      'number.min': 'Limit must be at least {#limit}.'
    }),

  chaletCode: Joi.string()
    .optional()
    .messages({
      'string.base': 'Chalet code must be a string.'
    }),

  city: Joi.string()
    .pattern(objectIdPattern)
    .optional()
    .messages({
      'string.pattern.base': 'City must be a valid ObjectId.'
    }),

  village: Joi.string()
    .pattern(objectIdPattern)
    .optional()
    .messages({
      'string.pattern.base': 'Village must be a valid ObjectId.'
    }),

  daysMin: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'daysMin must be a number.',
      'number.min': 'daysMin cannot be negative.'
    }),

  daysMax: Joi.number()
    .integer()
    .min(0)
    .optional()
    .messages({
      'number.base': 'daysMax must be a number.',
      'number.min': 'daysMax cannot be negative.'
    }),

  priceMin: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'priceMin must be a number.',
      'number.min': 'priceMin cannot be negative.'
    }),

  priceMax: Joi.number()
    .min(0)
    .optional()
    .messages({
      'number.base': 'priceMax must be a number.',
      'number.min': 'priceMax cannot be negative.'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      'string.base': 'Email must be a string.',
      'string.email': 'Email must be a valid email address.'
    })
});
