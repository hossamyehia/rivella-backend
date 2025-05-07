// import AppError from '../services/AppError.js';
import { wishlistModel } from '../../../database/models/wishlist.model.js';
import { chaletModel } from '../../../database/models/chalet.model.js';
import AppError from '../../utils/services/AppError.js';

// GET /wishlist
// Fetch the authenticated user’s wishlist
export const getWishlist = async (req, res, next) => {
  const userId = req.user._id;

  let wishlist = await wishlistModel.findOne({ user: userId })
    .populate({ path: 'chalets', populate: ['city', 'village'] });

  // If no wishlist exists yet, return empty array
  if (!wishlist) {
    return res.status(200).json({ success: true, data: [] });
  }

  res.status(200).json({ success: true, data: wishlist.chalets });
};

// POST /wishlist/:chaletId
// Add a chalet to the authenticated user’s wishlist
export const addToWishlist = async (req, res, next) => {
  const userId = req.user._id;
  const { chaletId } = req.params;

  // Ensure chalet exists
  const chalet = await chaletModel.findById(chaletId);
  if (!chalet) {
    return next(new AppError('Chalet not found.', 404));
  }

  // Find or create wishlist
  let wishlist = await wishlistModel.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await wishlistModel.create({ user: userId, chalets: [] });
  }

  // Prevent duplicates
  if (wishlist.chalets.includes(chaletId)) {
    return res.status(409).json({ success: false, message: 'Already in wishlist.' });
  }

  wishlist.chalets.push(chaletId);
  await wishlist.save();

  res.status(201).json({ success: true });
};



export const removeFromWishlist = async (req, res, next) => {
  const userId = req.user._id;
  const { chaletId } = req.params;

  const wishlist = await wishlistModel.findOne({ user: userId });
  if (!wishlist) {
    return next(new AppError('Wishlist not found.', 404));
  }

  wishlist.chalets = wishlist.chalets.filter(id => id.toString() !== chaletId);
  await wishlist.save();

  res.status(200).json({ success: true, data: wishlist.chalets });
};



export const clearWishlist = async (req, res, next) => {
  const userId = req.user._id;
  const wishlist = await wishlistModel.findOne({ user: userId });
  if (wishlist) {
    wishlist.chalets = [];
    await wishlist.save();
  }
  res.status(200).json({ success: true, data: [] });
};
 
