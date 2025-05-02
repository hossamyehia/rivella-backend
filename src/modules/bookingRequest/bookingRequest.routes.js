// routes/bookingRequest.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { createBookingRequest, getBookingRequests } from './bookingRequest.controller.js';
import { isAdmin, isLoginOptional } from '../../utils/middleware/auth.js';
import { valdation } from '../../utils/middleware/valdation.js';
import { createBookingRequestSchema, getBookingRequestsSchema } from './bookingRequest.valdation.js';

const bookingRequestRouter = express.Router();

bookingRequestRouter.post(
    '/',isLoginOptional,
    catchAsyncError(createBookingRequest)
  );
bookingRequestRouter.get('/', isAdmin,catchAsyncError(getBookingRequests));



export default bookingRequestRouter;