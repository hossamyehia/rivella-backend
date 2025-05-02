// routes/chalet.routes.js
import express from 'express';
import {
  getAllChalets,
  getChaletById,
  addChalet,
  updateChalet,
  deleteChalet,
  getStats
} from './chalet.contoller.js';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { UploadFiles } from '../../utils/middleware/fileUpload.js';
import { isAdmin } from '../../utils/middleware/auth.js';
import { addChaletSchema, getAllChaletsSchema, idParamSchema, updateChaletSchema } from './chalet.valdation.js';
import { valdation } from '../../utils/middleware/valdation.js';

const ChaletRouter = express.Router();

// جلب كل الشاليهات مع فلترة / صفحة
ChaletRouter.get(
  '/',
  valdation(getAllChaletsSchema),
  catchAsyncError(getAllChalets)
);

// إحصائيات (بدون تحقق إضافي)
ChaletRouter.get(
  '/stats',
  catchAsyncError(getStats)
);

// جلب شاليه واحد بالـ ID
ChaletRouter.get(
  '/:id',
  valdation(idParamSchema),
  catchAsyncError(getChaletById)
);

// إضافة شاليه جديد
ChaletRouter.post(
  '/',
  isAdmin,
  UploadFiles('chalet', [
    { name: 'mainImg', maxCount: 1 },
    { name: 'imgs',    maxCount: 10 }
  ]),
  valdation(addChaletSchema),
  catchAsyncError(addChalet)
);

// تحديث شاليه موجود
ChaletRouter.put(
  '/:id',
  isAdmin,

  UploadFiles('chalet', [
    { name: 'mainImg', maxCount: 1 },
    { name: 'imgs',    maxCount: 10 }
  ]),
  valdation(idParamSchema),
  valdation(updateChaletSchema),
  catchAsyncError(updateChalet)
);

// حذف شاليه
ChaletRouter.delete(
  '/:id',
  isAdmin,
  valdation(idParamSchema),
  catchAsyncError(deleteChalet)
);

export default ChaletRouter;
