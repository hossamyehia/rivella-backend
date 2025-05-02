import { bookingRequestModel } from "../../../database/models/bookingRequest.model.js";
import { chaletModel } from "../../../database/models/chalet.model.js";
import { couponModel } from "../../../database/models/coupon.js";
import { reservationModel } from "../../../database/models/reservation.model.js";
import { sendApprovalEmail } from "../../utils/Email/sendApprovalEmail.js";
import { sendRejectionEmail } from "../../utils/Email/sendRejectionEmail.js";
import AppError from "../../utils/services/AppError.js";




// Approve a booking request, handling coupon validation and reservation creation


// Approve a booking request, ensuring availability and handling coupon usage
export const approveRequest = async (req, res, next) => {
  const { requestId } = req.params;

  // 1) Load the pending request with all related data
  const request = await bookingRequestModel
    .findById(requestId)
    .populate({ path: 'chalet', populate: ['city', 'village'] })
    .populate('user', 'name email phone')
    .populate('coupon');
  if (!request) {
    return next(new AppError('Request not found', 404));
  }

  // 2) Validate coupon (expiry, active, usage) but do not consume yet
  if (request.coupon) {
    const now = new Date();
    if ( request.coupon.expiresAt < now) {
      return next(new AppError('Coupon has expired ', 400));
    }
    if (request.coupon.usedCount >= request.coupon.usageLimit) {
      return next(new AppError('Coupon usage limit reached', 400));
    }
  }

  // 3) Check for overlapping confirmed reservations
  const overlap = await reservationModel.findOne({
    chalet:   request.chalet._id,
    checkIn:  { $lte: request.checkOut },
    checkOut: { $gte: request.checkIn }
  });
  if (overlap) {
    return next(new AppError('Chalet is already reserved for these dates', 409));
  }

  // 4) Recalculate discount and final price
  const priceBefore = request.totalPrice;
  let discountAmount = 0;
  let priceAfter = priceBefore;
  if (request.coupon) {
    if (request.coupon.discountType === 'percentage') {
      discountAmount = Math.floor((priceBefore * request.coupon.discountValue) / 100);
    } else {
      discountAmount = request.coupon.discountValue;
    }
    if (discountAmount > priceBefore) discountAmount = priceBefore;
    priceAfter = priceBefore - discountAmount;
  }

  // 5) Build the reservation data
  const reservationData = {
    chalet:              request.chalet._id,
    user:                request.user?._id,
    guestName:           request.guestName,
    guestEmail:          request.guestEmail,
    guestPhone:          request.guestPhone,
    checkIn:             request.checkIn,
    checkOut:            request.checkOut,
    days:                request.days,
    priceBeforeDiscount: priceBefore,
    discountAmount,
    totalPrice:          priceAfter,
    ...(request.coupon && {
      coupon:        request.coupon._id,
      couponCode:    request.coupon.code,
      discountType:  request.coupon.discountType,
      discountValue: request.coupon.discountValue
    })
  };

  // 6) Create the reservation
  const reservation = await reservationModel.create(reservationData);

  // 7) Consume one usage of the coupon
  if (request.coupon) {
    request.coupon.usedCount++;
    await couponModel.findByIdAndUpdate(request.coupon._id, { usedCount: request.coupon.usedCount });
  }

  // 8) Send confirmation email (includes coupon details if any)
  await sendApprovalEmail(request);

  // 9) Remove the booking request
  await bookingRequestModel.findByIdAndDelete(requestId);

  // 10) Return the created reservation
  res.status(201).json({ success: true, data: reservation });
};

// Reject a booking request
export const rejectRequest = async (req, res, next) => {
  const { requestId } = req.params;
  const request = await bookingRequestModel
    .findById(requestId)
    .populate('chalet')
    .populate('user');
  if (!request) {
    return next(new AppError('Request not found', 404));
  }

  await sendRejectionEmail(request);
  await bookingRequestModel.findByIdAndDelete(requestId);

  res.status(200).json({ success: true, message: 'Request rejected' });
};

// Get all confirmed reservations
export const getReservations = async (req, res) => {
  const reservations = await reservationModel
    .find()
    .populate({ path: 'chalet', populate: ['city', 'village'] })
    .populate('user', 'name email phone');
  res.status(200).json({ success: true, data: reservations });
};


export const deleteReservation=async(req,res,next)=>{
  let reservation=await reservationModel.findOne({_id:req.params.id});
  if(!reservation) return next(new AppError("not found",404))
  await reservation.deleteOne();
  res.json({success:true});
}