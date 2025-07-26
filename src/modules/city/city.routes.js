// routes/city.routes.js
import express from 'express';
import { catchAsyncError } from '../../utils/middleware/catchAsyncError.js';
import { isAdmin } from '../../utils/middleware/auth.js';
import { UploadFile } from '../../utils/middleware/fileUpload.js';
import {
  getAllCities,
  getById,
  addCity,
  deleteCity,
  updateCity
} from './city.controller.js';
import { addCitySchema, idParamSchema, updateCitySchema } from './city.valdation.js';
import { valdation } from '../../utils/middleware/valdation.js';


const CityRouter = express.Router();

CityRouter
  .route("/")
  .get(
    catchAsyncError(getAllCities)
  )
  .post(
    isAdmin,
    UploadFile('city', 'img'),
    catchAsyncError(addCity)
  );


// حذف مدينة
CityRouter
  .route("/:id")
  .get(
    catchAsyncError(getById)
  )
  .delete(
    isAdmin,
    catchAsyncError(deleteCity)
  ).put(
    isAdmin,
    UploadFile('city', 'img'),
    catchAsyncError(updateCity)
  );

export default CityRouter;
