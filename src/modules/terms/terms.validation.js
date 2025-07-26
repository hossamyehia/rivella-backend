import Joi from "joi";

export const termsIdSchema = Joi.object({
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

export const termsSchema = Joi.object({
    term: Joi.string()
        .min(1)
        .max(100)
        .required()
        .messages({
            'string.base': 'Term must be a string.',
            'string.empty': 'Term is required.',
            'string.min': 'Term must be at least 1 character long.',
            'string.max': 'Term must not exceed 100 characters.',
            'any.required': 'Term is required.'
        }),
    allowed: Joi.boolean()
        .required()
        .messages({
            'boolean.base': 'Allowed must be a boolean.',
            'any.required': 'Allowed is required.'
        })
}).messages({
    'object.base': 'Terms data must be an object.',
    'object.unknown': 'Terms data contains unknown keys.'
});