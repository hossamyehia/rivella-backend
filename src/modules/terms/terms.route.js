import express from "express";
import {
    createTerm as createTerms,
    getAllTerms as getTerms,
    getTermsById,
    updateTerm as updateTerms,
    deleteTerm as deleteTerms
} from "./terms.controller.js";
import { termsSchema, termsIdSchema } from "./terms.validation.js";
import { valdation } from "../../utils/middleware/valdation.js";
import { catchAsyncError } from "../../utils/middleware/catchAsyncError.js";
import { isAdmin } from "../../utils/middleware/auth.js";

const termsRouter = express.Router();

// Get all terms
termsRouter.get(
    '/',
    catchAsyncError(getTerms)
);

// Get term by ID
termsRouter.get(
    '/:id',
    valdation(termsIdSchema),
    catchAsyncError(getTermsById)
);

// Create a new term
termsRouter.post(
    '/',
    isAdmin,
    valdation(termsSchema),
    catchAsyncError(createTerms)
);

// Update a term
termsRouter.put(
    '/:id',
    isAdmin,
    // valdation(termsIdSchema),
    // valdation(termsSchema),
    catchAsyncError(updateTerms)
);

// Delete a term
termsRouter.delete(
    '/:id',
    isAdmin,
    valdation(termsIdSchema),
    catchAsyncError(deleteTerms)
);

export default termsRouter;
