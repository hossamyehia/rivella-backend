import express from 'express';
import { getWishlist, addToWishlist, removeFromWishlist, clearWishlist } from'./wishlist.controller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isLogin } from '../../utils/middleware/auth.js';

const WishlistRouter = express.Router();

// Protect all wishlist routes
WishlistRouter.use(isLogin);

// Retrieve wishlist (GET /wishlist)
WishlistRouter.get('/', catchAsyncError(getWishlist));

// Add chalet to wishlist (POST /wishlist/:chaletId)
WishlistRouter.post('/:chaletId', catchAsyncError(addToWishlist));

// Remove chalet from wishlist (DELETE /wishlist/:chaletId)
WishlistRouter.delete('/:chaletId', catchAsyncError(removeFromWishlist));

// Clear entire wishlist (DELETE /wishlist)
WishlistRouter.delete('/', catchAsyncError(clearWishlist));

export default WishlistRouter;
