import express from 'express';
import {
  getAllVillages,
  addVillage,
  deleteVillage,
  updateVillage
} from './village.controller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { UploadFile } from '../../utils/middleware/fileUpload.js';
import { isAdmin } from '../../utils/middleware/auth.js';

const villageRouter = express.Router();

villageRouter.get('/', catchAsyncError(getAllVillages));
villageRouter.post('/',isAdmin, UploadFile('village', 'img'), catchAsyncError(addVillage));
villageRouter.delete('/:id', isAdmin,catchAsyncError(deleteVillage));
villageRouter.put('/:id',isAdmin, UploadFile('village', 'img'), catchAsyncError(updateVillage));

export { villageRouter };
