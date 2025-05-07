import path from 'path';
import { cityModel } from '../../../database/models/city.model.js';
import AppError from '../../utils/services/AppError.js';
import { removeImage } from '../../utils/services/removefile.js';
import { villageModel } from '../../../database/models/village.model.js';
import { deleteVillagesAndChaletsByCityId } from '../../utils/handlers/refactor.handerl.js';



export const getAllCities = async (req, res, next) => {
  const cities = await cityModel.find();
  res.status(200).json({ success: true, data: cities });
};

export const addCity = async (req, res, next) => {
  const { name, description } = req.body;
  if (!name || !req.file) {
    return next(new AppError('Name, description and image are required.', 400));
  }
  const imgName = req.file.filename;
  const city = await cityModel.create({ name, description, img: imgName });
  res.status(201).json({ success: true, data: city });
};

export const deleteCity = async (req, res, next) => {
  const { id } = req.params;
  const city = await cityModel.findById(id);
  if (!city) {
    return next(new AppError('City not found.', 404));
  }
  const filename = path.basename(city.img);
  await removeImage('city', filename);
  await deleteVillagesAndChaletsByCityId(id)
  await cityModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'City deleted.' });
};

export const updateCity = async (req, res, next) => {
  const { id } = req.params;
  const { name, description } = req.body;
  const existingCity = await cityModel.findById(id);
  if (!existingCity) {
    return next(new AppError('City not found.', 404));
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (req.file) {
    const oldFilename = path.basename(existingCity.img);
    await removeImage('city', oldFilename);
    updateData.img = req.file.filename;
  }

  const city = await cityModel.findByIdAndUpdate(id, updateData, { new: true });
  res.status(200).json({ success: true, data: city });
};
