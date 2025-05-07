// controllers/village.controller.js
import path from 'path';
import { villageModel } from '../../../database/models/village.model.js';
import { cityModel } from '../../../database/models/city.model.js';
import AppError from '../../utils/services/AppError.js';
import { removeImage } from '../../utils/services/removefile.js';
import { deleteChaletsByVillageId } from '../../utils/handlers/refactor.handerl.js';

export const getAllVillages = async (req, res, next) => {
  const villages = await villageModel.find().populate('city');
  res.status(200).json({ success: true, data: villages });
};

export const addVillage = async (req, res, next) => {
  const { name, description, city } = req.body;
  if (!name  || !city || !req.file) {
    return next(new AppError('Name, city ID and image are required.', 400));
  }
  const cityExists = await cityModel.findById(city);
  if (!cityExists) {
    return next(new AppError('Specified city does not exist.', 404));
  }
  const imgName = req.file.filename;
  const village = await villageModel.create({ name, description, city, img: imgName });
  res.status(201).json({ success: true, data: village });
};

export const deleteVillage = async (req, res, next) => {
  const { id } = req.params;
  const village = await villageModel.findById(id);
  if (!village) {
    return next(new AppError('Village not found.', 404));
  }
  const filename = path.basename(village.img);
  deleteChaletsByVillageId(id)
  await removeImage('village', filename);
  await villageModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'Village deleted.' });
};

export const updateVillage = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, city } = req.body;
  const existingVillage = await villageModel.findById(id);
  if (!existingVillage) {
    return next(new AppError('Village not found.', 404));
  }

  const updateData = {};
  if (name) updateData.name = name;
  if (description) updateData.description = description;
  if (city) {
    const cityExists = await cityModel.findById(city);
    if (!cityExists) {
      return next(new AppError('Specified city does not exist.', 404));
    }
    updateData.city = city;
  }
  if (req.file) {
    const oldFilename = path.basename(existingVillage.img);
    await removeImage('village', oldFilename);
    updateData.img = req.file.filename;
  }

  const village = await villageModel.findByIdAndUpdate(id, updateData, { new: true }).populate('city');
  res.status(200).json({ success: true, data: village });
};
