
// routes/reservation.routes.js
import express from 'express';
import { approveRequest, deleteReservation, getReservations, rejectRequest } from './reservation.controller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';



const reservationRouter = express.Router();


reservationRouter.get('/', catchAsyncError(getReservations));
reservationRouter.post('/approve/:requestId', catchAsyncError(approveRequest));
reservationRouter.post('/reject/:requestId', catchAsyncError(rejectRequest));
reservationRouter.delete('/:id', catchAsyncError(deleteReservation));
export default reservationRouter;

