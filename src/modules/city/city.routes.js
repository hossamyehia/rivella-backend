// routes/city.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';
import { UploadFile } from '../../utils/middleware/fileUpload.js';
import {
  getAllCities,
  addCity,
  deleteCity,
  updateCity
} from './city.controller.js';
import { addCitySchema, idParamSchema, updateCitySchema } from './city.valdation.js';
import { valdation } from '../../utils/middleware/valdation.js';


const CityRouter = express.Router();

// جلب كل المدن
CityRouter.get(
  '/',
  catchAsyncError(getAllCities)
);

// إضافة مدينة جديدة
CityRouter.post(
  '/',
  isAdmin,
  UploadFile('city', 'img'),
  valdation(addCitySchema),
  catchAsyncError(addCity)
);

// حذف مدينة
CityRouter.delete(
  '/:id',
  isAdmin,
  valdation(idParamSchema),
  catchAsyncError(deleteCity)
);

// تحديث مدينة
CityRouter.put(
  '/:id',
  isAdmin,
  UploadFile('city', 'img'),
  valdation(idParamSchema),
  valdation(updateCitySchema),
  catchAsyncError(updateCity)
);

export default CityRouter;
