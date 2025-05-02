// database/models/coupon.model.js
import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed'],
    required: true
  },
  discountValue: {
    type: Number,
    required: true,
    min: [0, 'Discount must be positive']
  },
  expiresAt: {
    type: Date,
    required: true
  },
  usageLimit: {
    type: Number,
    default: 1,      
    min: [1, 'Must allow at least one use']
  },
  usedCount: {
    type: Number,
    default: 0
  }
}, { timestamps: true });

export const couponModel = mongoose.model('coupon', couponSchema);
