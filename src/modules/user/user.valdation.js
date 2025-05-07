// src/validation/auth.validation.js
import Joi from 'joi';

const namePattern = /^[\u0600-\u06FFa-zA-Z\s]+$/;

export const registerUserSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .required()
    .messages({
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least {#limit} characters.',
      'string.max': 'Name cannot exceed {#limit} characters.',
      'string.pattern.base': 'Name can only contain letters and spaces.'
    }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.empty': 'Email is required.',
      'string.email': 'Email must be valid.'
    }),
  password: Joi.string()
    .min(6)
    .required()
    .messages({
      'string.empty': 'Password is required.',
      'string.min': 'Password must be at least {#limit} characters.'
    }),
  phone: Joi.string()
    .pattern(/^(010|011|012|015)[0-9]{8}$/)
    .required()
    .messages({
      'string.empty': 'Phone is required.',
      'string.pattern.base': 'Phone must be a valid Egyptian number.'
    })
});

export const verifyEmailSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be valid.'
  }),
  code: Joi.string().length(6).alphanum().required().messages({
    'string.empty': 'Verification code is required.',
    'string.length': 'Verification code must be {#limit} characters.',
    'string.alphanum': 'Verification code must be alphanumeric.'
  })
});

export const resendVerificationCodeSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be valid.'
  })
});

export const loginUserSchema = Joi.object({
  email: Joi.string().email({ tlds: { allow: false } }).required().messages({
    'string.empty': 'Email is required.',
    'string.email': 'Email must be valid.'
  }),
  password: Joi.string().min(6).required().messages({
    'string.empty': 'Password is required.',
    'string.min': 'Password must be at least {#limit} characters.'
  })
});

export const updateUserProfileSchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(50)
    .pattern(namePattern)
    .optional()
    .messages({
      'string.min': 'Name must be at least {#limit} characters.',
      'string.max': 'Name cannot exceed {#limit} characters.',
      'string.pattern.base': 'Name can only contain letters and spaces.'
    }),
  phone: Joi.string()
    .pattern(/^(010|011|012|015)[0-9]{8}$/)
    .optional()
    .messages({
      'string.pattern.base': 'Phone must be a valid Egyptian number.'
    })
});
