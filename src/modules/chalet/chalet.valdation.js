// src/validation/chalet.validation.js
import Joi from 'joi';

const objectId = /^[0-9a-fA-F]{24}$/;

export const getAllChaletsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).default(15),
  city: Joi.string().pattern(objectId).optional(),
  village: Joi.string().pattern(objectId).optional(),
  bedrooms: Joi.number().integer().min(0).optional(),
  guests: Joi.number().integer().min(1).optional(),
  priceMin: Joi.number().min(0).optional(),
  priceMax: Joi.number().min(0).optional(),
  admin: Joi.string().valid('true','false').optional()
});

export const idParamSchema = Joi.object({
  id: Joi.string().pattern(objectId).required()
});

export const addChaletSchema = Joi.object({
  name: Joi.string().min(2).max(100).required(),
  city: Joi.string().pattern(objectId).required(),
  village: Joi.string().pattern(objectId).required(),
  location: Joi.string().required(),
  bedrooms: Joi.number().integer().min(0).required(),
  bathrooms: Joi.number().integer().min(0).required(),
  type: Joi.string().required(),
  guests: Joi.number().integer().min(1).required(),
  price: Joi.number().min(0).required(),
  code: Joi.string().required(),
  badroomsDetails: Joi.string().required(),  // ستحلل JSON بعد التحقق
  features: Joi.string().required(),
  terms: Joi.string().required()
});

export const updateChaletSchema = Joi.object({
  name: Joi.string().min(2).max(100).optional(),
  city: Joi.string().pattern(objectId).optional(),
  village: Joi.string().pattern(objectId).optional(),
  location: Joi.string().optional(),
  bedrooms: Joi.number().integer().min(0).optional(),
  bathrooms: Joi.number().integer().min(0).optional(),
  type: Joi.string().optional(),
  guests: Joi.number().integer().min(1).optional(),
  price: Joi.number().min(0).optional(),
  code: Joi.string().optional(),
  badroomsDetails: Joi.string().optional(),
  features: Joi.string().optional(),
  terms: Joi.string().optional()
});
