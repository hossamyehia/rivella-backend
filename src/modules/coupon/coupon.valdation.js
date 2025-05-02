
// src/validation/city.validation.js
import Joi from 'joi';

const objectIdPattern = /^[0-9a-fA-F]{24}$/;


export const createCouponSchema = Joi.object({ /* code, discountType, discountValue, expiresAt, usageLimit */ });
export const applyCouponSchema  = Joi.object({ code: Joi.string().required() });
export const updateCouponSchema = Joi.object({ code: Joi.string().optional(), discountType: Joi.string().optional(), discountValue: Joi.number().optional(), expiresAt: Joi.date().iso().optional(), usageLimit: Joi.number().integer().optional() });
export const idParamSchema = Joi.object({ id: Joi.string().length(24).hex().required() });
