
import { bookingRequestModel } from "../../../database/models/bookingRequest.model.js";
import { chaletModel } from "../../../database/models/chalet.model.js";
import { couponModel } from "../../../database/models/coupon.js";
import { sendBookingConfirmationEmail } from "../../utils/Email/sendEmail.js";
import { sendBookingRequestEmail } from "../../utils/Email/sendResetEmail.js";
import mongoose from 'mongoose';
import AppError from "../../utils/services/AppError.js";
import { reservationModel } from "../../../database/models/reservation.model.js";


// Create a new booking request with availability and coupon handling
export const createBookingRequest = async (req, res, next) => {
  const { chaletId, checkIn, checkOut, name, email, phone, couponCode,guests } = req.body;
  const userId = req.user?._id;

  // 1) Basic validation
  if (!chaletId || !checkIn || !checkOut) {
    return next(new AppError('Chalet ID and dates are required.', 400));
  }
  if (!userId && (!name || !email || !phone)) {
    return next(new AppError('Guest contact info is required.', 400));
  }
  
  

  // 2) Date parsing and validation
  const inDate  = new Date(checkIn);
  const outDate = new Date(checkOut);
  if (isNaN(inDate) || isNaN(outDate)) {
    return next(new AppError('Invalid date format.', 400));
  }
  if (inDate >= outDate) {
    return next(new AppError('checkOut must be after checkIn.', 400));
  }

  // 3) Availability check against confirmed reservations
  const overlap = await reservationModel.findOne({
    chalet:   chaletId,
    checkIn:  { $lt: outDate },
    checkOut: { $gt: inDate }
  });
  if (overlap) {
    return next(new AppError('Chalet is already reserved for the selected dates.', 409));
  }

  // 4) Load chalet for pricing and templates
  const chalet = await chaletModel.findById(chaletId)
    .populate('city')
    .populate('village');
  if (!chalet) {
    return next(new AppError('Chalet not found.', 404));
  }
  if(chalet.guests<guests){
    return next(new AppError('Guests come is max value', 400));
  }

  // 5) Compute days & base price
  const msPerDay   = 1000 * 60 * 60 * 24;
  const days       = Math.ceil((outDate - inDate) / msPerDay);
  const totalPrice = days * chalet.price;

  // 6) Handle optional coupon
  let coupon = null, discountAmount = 0, priceAfterDiscount = totalPrice;
  if (couponCode) {
    coupon = await couponModel.findOne({ code: couponCode.toUpperCase().trim() });
    if (!coupon) return next(new AppError('Invalid coupon code.', 404));
    const now = new Date();
    if (coupon.expiresAt < now ) {
      return next(new AppError('Coupon has expired or is inactive.', 400));
    }
    if (coupon.usedCount >= coupon.usageLimit) {
      return next(new AppError('Coupon usage limit reached.', 400));
    }
    discountAmount = coupon.discountType === 'percentage'
      ? Math.floor((totalPrice * coupon.discountValue) / 100)
      : coupon.discountValue;
    if (discountAmount > totalPrice) discountAmount = totalPrice;
    priceAfterDiscount = totalPrice - discountAmount;
  }

  // 7) Generate unique 6-char request code
  const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let requestCode = '';
  for (let i = 0; i < 6; i++) {
    requestCode += ALPHA.charAt(Math.floor(Math.random() * ALPHA.length));
  }

  // 8) Build request data object
  const requestData = {
    chalet,
    checkIn:           inDate,
    checkOut:          outDate,
    days,
    totalPrice,
    guests,
    discountAmount,
    priceAfterDiscount,
    code:             requestCode,
    ...(coupon ? { coupon: coupon._id } : {}),
    ...(userId ? { user: userId } : {
      guestName:  name,
      guestEmail: email,
      guestPhone: phone
    })
  };

  // 9) Save booking request
  const rawRequest = await bookingRequestModel.create(requestData);

  // 10) Populate for response and email
  const populatedRequest = await bookingRequestModel.findById(rawRequest._id)
    .populate({ path: 'chalet', populate: ['city', 'village'] })
    .populate('user', 'name email phone')
    .populate('coupon', 'code discountType discountValue');

  // 11) Send emails
  await sendBookingRequestEmail(populatedRequest);
  await sendBookingConfirmationEmail(populatedRequest);

  // 12) Respond without consuming coupon usage (admin will approve)
  res.status(201).json({ success: true, data: populatedRequest });
};


export const getBookingRequests = async (req, res, next) => {
  try {
    const {
      page = 1,
      limit = 20,
      chaletCode,
      city,
      village,
      daysMin,
      daysMax,
      priceMin,
      priceMax,
      email
    } = req.query; 

    
    // 1) If filtering by chalet code/city/village, look up matching chalet IDs
    let chaletIds = [];
    if (chaletCode || city || village) {
      const chaletFilter = {};
      if (chaletCode) chaletFilter.code = chaletCode;
      if (city)       chaletFilter.city = mongoose.Types.ObjectId(city);
      if (village)    chaletFilter.village = mongoose.Types.ObjectId(village);

      const matchingChalets = await chaletModel.find(chaletFilter).select('_id');
      chaletIds = matchingChalets.map(c => c._id);
    }

    // 2) Build bookingRequest filter
    const filter = {};
    if (chaletIds.length) filter.chalet = { $in: chaletIds };
    if (daysMin || daysMax) {
      filter.days = {};
      if (daysMin) filter.days.$gte = Number(daysMin);
      if (daysMax) filter.days.$lte = Number(daysMax);
    }
    if (priceMin || priceMax) {
      filter.totalPrice = {};
      if (priceMin) filter.totalPrice.$gte = Number(priceMin);
      if (priceMax) filter.totalPrice.$lte = Number(priceMax);
    }
    if (email) {
      // assuming you still store guestEmail even for logged-in users?
      filter.guestEmail = email;
    }

    // 3) Pagination math
    const skip       = (Number(page) - 1) * Number(limit);
    const total      = await bookingRequestModel.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));

    // 4) Execute query with populate, sort & paginate
    const requests = await bookingRequestModel.find(filter)
      .populate({ path: 'chalet', populate: ['city', 'village'] })
      .populate('user',"name email phone ")
      .sort({ createdAt: -1 })  // newest check-ins first
      .skip(skip)
      .limit(Number(limit));

    // 5) Return paginated, filtered results
    res.status(200).json({
      success: true,
      total,
      totalPages,
      page: Number(page),
      data: requests
    });
  } catch (err) {
    next(err);
  }
};
