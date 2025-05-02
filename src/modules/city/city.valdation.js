// src/validation/city.validation.js
import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;

// Schema لجلب كل المدن (لا حاجة لحقول)
export const getAllCitiesSchema = Joi.object({});

// Schema لإضافة مدينة جديدة
export const addCitySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .required()
    .messages({
      'string.base': 'Name must be a string.',
      'string.empty': 'Name is required.',
      'string.min': 'Name must be at least {#limit} characters long.',
      'string.max': 'Name cannot be more than {#limit} characters long.',
      'any.required': 'Name is required.'
    }),
  description: Joi.string()
    .min(5)
    .max(500)
    .required()
    .messages({
      'string.base': 'Description must be a string.',
      'string.empty': 'Description is required.',
      'string.min': 'Description must be at least {#limit} characters long.',
      'string.max': 'Description cannot be more than {#limit} characters long.',
      'any.required': 'Description is required.'
    })
});

// Schema للـ params بالـ ID
export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(objectIdPattern)
    .required()
    .messages({
      'string.base': 'ID must be a string.',
      'string.empty': 'ID is required.',
      'string.pattern.base': 'ID must be a valid ObjectId.',
      'any.required': 'ID is required.'
    })
});

// Schema لتحديث مدينة
export const updateCitySchema = Joi.object({
  name: Joi.string()
    .min(2)
    .max(100)
    .optional()
    .messages({
      'string.base': 'Name must be a string.',
      'string.min': 'Name must be at least {#limit} characters long.',
      'string.max': 'Name cannot be more than {#limit} characters long.'
    }),
  description: Joi.string()
    .min(5)
    .max(500)
    .optional()
    .messages({
      'string.base': 'Description must be a string.',
      'string.min': 'Description must be at least {#limit} characters long.',
      'string.max': 'Description cannot be more than {#limit} characters long.'
    })
});
