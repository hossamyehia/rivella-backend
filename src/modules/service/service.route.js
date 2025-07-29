import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';

import {
    createService as createServiceController,
    getAllServices,
    getServiceById,
    updateService as updateServiceController,
    deleteService as deleteServiceController
} from './service.controllers.js';


import { serviceSchema, serviceIdSchema } from './service.validation.js';
import { valdation } from '../../utils/middleware/valdation.js';
const serviceRouter = express.Router();
// Get all services
serviceRouter.get(
    '/',
    catchAsyncError(getAllServices)
);

// Get service by ID
serviceRouter.get(
    '/:id',
    valdation(serviceIdSchema),
    catchAsyncError(getServiceById)
);
// Create a new service
serviceRouter.post(
    '/',
    isAdmin,
    valdation(serviceSchema),
    catchAsyncError(createServiceController)
);
// Update a service
serviceRouter.put(
    '/:id',
    isAdmin,
    // valdation(serviceIdSchema),
    // valdation(serviceSchema),
    catchAsyncError(updateServiceController)
);
// Delete a service
serviceRouter.delete(
    '/:id',
    isAdmin,
    valdation(serviceIdSchema),
    catchAsyncError(deleteServiceController)
);
export default serviceRouter;