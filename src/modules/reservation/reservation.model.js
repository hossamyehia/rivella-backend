import mongoose, { Types } from 'mongoose';

const reservationSchema = new mongoose.Schema({
  chalet:     { type: Types.ObjectId, ref: 'chalet', required: true },
  user:       { type: Types.ObjectId, ref: 'user',    required: false },
  guestName:  { type: String },
  guestEmail: { type: String },
  guestPhone: { type: String },
  checkIn:    { type: Date,   required: true },
  checkOut:   { type: Date,   required: true },
  days:       { type: Number, required: true },
  totalPrice: { type: Number, required: true },
  // coupon details:
  coupon:         { type: Types.ObjectId, ref: 'coupon', required: false },
  couponCode:     { type: String, required: function() { return !!this.coupon; } },
  discountType:   { type: String, required: function() { return !!this.coupon; } },
  discountValue:  { type: Number, required: function() { return !!this.coupon; } },
  discountAmount: { type: Number, required: function() { return !!this.coupon; } },
  priceBeforeDiscount: { type: Number, required: function() { return !!this.coupon; } }
  // TODO Created AT
}, { timestamps: true });

export const reservationModel = mongoose.model('reservation', reservationSchema);