// src/validation/admin.validation.js
import Joi from 'joi';

// Schema لعملية إضافة أدمن جديد
export const addAdminSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(/^[a-zA-Z\u0600-\u06FF\s]+$/)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least {#limit} characters long.',
      'string.max': 'Name cannot be more than {#limit} characters long.',
      'string.pattern.base': 'Name can only contain letters and spaces.'
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least {#limit} characters long.'
    })
});

// Schema لعملية تسجيل دخول الأدمن
export const loginAdminSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.base': 'Email must be a string.',
      'string.empty': 'Email is required.',
      'string.email': 'Email must be a valid email address.'
    }),

  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.base': 'Password must be a string.',
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least {#limit} characters long.'
    })
});

// Schema للتحقق من صلاحية الـ ObjectId في الـ params
export const idParamSchema = Joi.object({
  id: Joi.string()
    .length(24)
    .hex()
    .required()
    .messages({
      'string.base': 'ID must be a string.',
      'string.empty': 'ID parameter is required.',
      'string.length': 'ID must be {#limit} characters long.',
      'string.hex': 'ID must be a valid hex string.'
    })
});
