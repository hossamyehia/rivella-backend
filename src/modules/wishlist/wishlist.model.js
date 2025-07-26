// database/models/wishlist.model.js
import mongoose, { Types } from 'mongoose';

const wishlistSchema = new mongoose.Schema({
  user: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
    unique: true       
  },
  chalets: [
    {
      type: Types.ObjectId,
      ref: 'chalet',
      required: true
    }
  ]
}, {
  timestamps: true      
});

export const wishlistModel = mongoose.model('wishlist', wishlistSchema);
