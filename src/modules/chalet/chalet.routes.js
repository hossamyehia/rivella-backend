import express from 'express';
import * as chaletController from './chalet.controller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';
import { UploadFiles } from '../../utils/middleware/fileUpload.js';

const router = express.Router();

router
    .route('/')
    .get(catchAsyncError(chaletController.getAllChalets))
    .post(
        isAdmin,
        UploadFiles('chalet', [
            { name: 'mainImg', maxCount: 1 },
            { name: 'imgs', maxCount: 25 },
            { name: 'video', maxCount: 5 }
        ]), catchAsyncError(chaletController.createChalet));
        
router
    .route("/home")
    .get(catchAsyncError(chaletController.getHomeChalets))
    
router
    .route('/:id')
    .get(catchAsyncError(chaletController.getChaletById))
    .put(isAdmin, UploadFiles('chalet', [
        { name: 'mainImg', maxCount: 1 },
        { name: 'imgs', maxCount: 25 },
        { name: 'video', maxCount: 5 }
    ]), catchAsyncError(chaletController.updateChalet))
    .delete(isAdmin, catchAsyncError(chaletController.deleteChalet));


export default router;