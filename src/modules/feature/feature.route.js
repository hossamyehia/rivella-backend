import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';

import {
    createFeature as createFeatureController,
    getAllFeatures,
    getFeatureById,
    updateFeature as updateFeatureController,
    deleteFeature as deleteFeatureController
} from './feature.controllers.js';


import { featureSchema, featureIdSchema } from './feature.validation.js';
import { valdation } from '../../utils/middleware/valdation.js';
const featureRouter = express.Router();
// Get all features
featureRouter.get(
    '/',
    catchAsyncError(getAllFeatures)
);

// Get feature by ID
featureRouter.get(
    '/:id',
    valdation(featureIdSchema),
    catchAsyncError(getFeatureById)
);
// Create a new feature
featureRouter.post(
    '/',
    isAdmin,
    valdation(featureSchema),
    catchAsyncError(createFeatureController)
);
// Update a feature
featureRouter.put(
    '/:id',
    isAdmin,
    // valdation(featureIdSchema),
    // valdation(featureSchema),
    catchAsyncError(updateFeatureController)
);
// Delete a feature
featureRouter.delete(
    '/:id',
    isAdmin,
    valdation(featureIdSchema),
    catchAsyncError(deleteFeatureController)
);
export default featureRouter;