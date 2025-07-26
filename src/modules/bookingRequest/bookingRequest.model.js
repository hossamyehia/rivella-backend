import mongoose, { Types } from 'mongoose';

const bookingRequestSchema = new mongoose.Schema({
  chalet:     { type: Types.ObjectId, ref: 'chalet',   required: true },
  user:       { type: Types.ObjectId, ref: 'user',      required: false },
  guestName:  { type: String,required: function() { return !this.user; } },
  guestEmail: { type: String,required: function() { return !this.user; } },
  guestPhone: { type: String,required: function() { return !this.user; } },
  checkIn:    { type: Date,  required: true },
  checkOut:   { type: Date,  required: true },
  days:       { type: Number,required: true },
  totalPrice: { type: Number,required: true } ,
  code:String ,
  discountAmount:Number,
  priceAfterDiscount:Number, 
  guests:Number,
  coupon:{ type: Types.ObjectId, ref: 'coupon', required: false }
}, { timestamps: true });

export const bookingRequestModel = mongoose.model('bookingRequest', bookingRequestSchema);