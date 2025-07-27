import Joi from 'joi';
import { BED_TYPES_AR } from '../../../database/BedTypes.data.js';

export const chaletCreateSchema = Joi.object({
  code: Joi.string().required(),
  name: Joi.string().required(),
  city: Joi.string().required(),
  village: Joi.string().optional().allow(null, ''),
  mainImg: Joi.string().optional(),
  imgs: Joi.array().items(Joi.string()),
  location: Joi.string().optional(),
  bedrooms: Joi.number().integer().required(),
  bathrooms: Joi.number().integer().required(),
  type: Joi.string().valid("فيلا", "شاليه").required(),
  guests: Joi.number().integer().required(),
  price: Joi.number().required(),
  rooms: Joi.array().items(Joi.object({
    beds: Joi.array().items(Joi.object({
      count: Joi.number().default(1),
      bedType: Joi.string().valid(...BED_TYPES_AR)
    })),
    moreDetails: Joi.string().allow("").optional()
  })),
  features: Joi.array().items(Joi.object({
    feature: Joi.string().required(),
    price: Joi.number().optional().default(0)
  })),
  services: Joi.array().items(Joi.object({
    service: Joi.string().required(),
    price: Joi.number().optional().default(0)
  })),
  terms: Joi.array().items(Joi.string()),
  admin: Joi.string().optional(),
  description: Joi.string().optional(),
  video: Joi.string().optional(),
  minNights: Joi.number().integer().default(1),
  isActive: Joi.bool().optional().default(true),
  isVisiable: Joi.bool().optional().default(true)
});

export const chaletUpdateSchema = Joi.object({
  code: Joi.string().optional(),
  name: Joi.string().optional(),
  city: Joi.string().optional(),
  village: Joi.string().optional().allow(null, ''),
  mainImg: Joi.string().optional(),
  imgs: Joi.array().items(Joi.string()).optional(),
  location: Joi.string().optional(),
  bedrooms: Joi.number().integer().optional(),
  bathrooms: Joi.number().integer().optional(),
  type: Joi.string().valid("فيلا", "شاليه").optional(),
  guests: Joi.number().integer().optional(),
  price: Joi.number().optional(),
  rooms: Joi.array().items(
    Joi.object({
      beds: Joi.array().items(
        Joi.object({
          count: Joi.number().default(1),
          bedType: Joi.string().valid(...BED_TYPES_AR)
        })
      ).optional(),
      moreDetails: Joi.string().allow("").optional()
    })
  ).optional(),
  features: Joi.array().items(
    Joi.object({
      feature: Joi.string().required(),
      price: Joi.number().optional().default(0)
    })
  ).optional(),
  services: Joi.array().items(
    Joi.object({
      service: Joi.string().required(),
      price: Joi.number().optional().default(0)
    })
  ).optional(),
  terms: Joi.array().items(Joi.string()).optional(),
  admin: Joi.string().optional(),
  description: Joi.string().optional(),
  video: Joi.string().optional(),
  minNights: Joi.number().integer().optional(),
  isActive: Joi.bool().optional(),
  isVisiable: Joi.bool().optional()
});