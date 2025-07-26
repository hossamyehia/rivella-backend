import express from 'express';
import {
  getAllVillages,
  addVillage,
  deleteVillage,
  updateVillage,
  getVillage
} from './village.controller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { UploadFile, UploadFiles } from '../../utils/middleware/fileUpload.js';
import { isAdmin } from '../../utils/middleware/auth.js';

const villageRouter = express.Router();

villageRouter.get(
  '/', 
  catchAsyncError(getAllVillages)
);

villageRouter.get(
  '/:id', 
  catchAsyncError(getVillage)
);

villageRouter.delete(
  '/:id', 
  isAdmin, 
  catchAsyncError(deleteVillage)
);

villageRouter.post(
  '/',
  isAdmin,
  UploadFiles('village', [{ name: "img", maxCount: 1 }, { name: 'imgs', maxCount: 20 }]),
  catchAsyncError(addVillage)
);

villageRouter.put(
  '/:id',
  isAdmin,
  UploadFiles('village', [{ name: "img", maxCount: 1 }, { name: 'imgs', maxCount: 20 }]),
  catchAsyncError(updateVillage)
);

export default villageRouter;
