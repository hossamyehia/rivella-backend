import Joi from "joi";

export const featureIdSchema = Joi.object({
    id: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required()
        .messages({
            'string.base': 'ID must be a string.',
            'string.empty': 'ID is required.',
            'string.pattern.base': 'ID must be a valid ObjectId.',
            'any.required': 'ID is required.'
        })
});

export const featureSchema = Joi.object({
    name: Joi.string()
        .min(1)
        .max(50)
        .required()
        .messages({
            'string.base': 'name must be a string.',
            'string.empty': 'name is required.',
            'string.min': 'name must be at least 1 character long.',
            'string.max': 'name must not exceed 50 characters.',
            'any.required': 'name is required.'
        }),
    description: Joi.string()
        .min(1)
        .max(500)
        .required()
        .messages({
            'string.base': 'Description must be a string.',
            'string.empty': 'Description is required.',
            'string.min': 'Description must be at least 1 character long.',
            'string.max': 'Description must not exceed 500 characters.',
            'any.required': 'Description is required.'
        })
}).messages({
    'object.base': 'Feature data must be an object.',
    'object.unknown': 'Feature data contains unknown keys.'
});