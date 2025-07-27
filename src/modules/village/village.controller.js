// controllers/village.controller.js
import path from 'path';
import { villageModel } from './village.model.js';
import { cityModel } from '../city/city.model.js';
import AppError from '../../utils/services/AppError.js';
import { removeImage } from '../../utils/services/removefile.js';
import { deleteChaletsByVillageId } from '../../utils/handlers/refactor.handler.js';
import { normalizeFormData } from '../../utils/_helper/_helper.js';

export const getAllVillages = async (req, res, next) => {
  const villages = await villageModel.find().populate('city features.feature services.service');
  res.status(200).json({ success: true, data: villages });
};

export const getVillage = async (req, res, next) => {
  const data = await villageModel.findOne({ _id: req.params.id }).populate('city features.feature services.service');
  res.status(200).json({ success: true, data });
};


export const addVillage = async (req, res, next) => {
  const { name, city } = req.body;
  // console.log(req.body);
  const data = normalizeFormData(req.body, ["features", 'services'])

  if (!name || !city) {
    return next(new AppError('Name and city ID are required.', 400));
  }

  const cityExists = await cityModel.findById(city);
  if (!cityExists) {
    return next(new AppError('Specified city does not exist.', 404));
  }

  const imgName = req.files?.img?.[0]?.filename;
  if (!imgName) {
    return next(new AppError('Main image is required.', 400));
  }

  const gallery = req.files?.imgs ? req.files.imgs.map(f => f.filename) : [];

  const village = await villageModel.create({
    ...data,
    img: imgName,
    imgs: gallery,
  })

  res.status(201).json({ success: true, data: village });
};


export const deleteVillage = async (req, res, next) => {
  const { id } = req.params;
  const village = await villageModel.findById(id);
  if (!village) {
    return next(new AppError('Village not found.', 404));
  }
  // Remove all related chalets/images
  await deleteChaletsByVillageId(id);

  // Remove main image
  await removeImage('village', path.basename(village.img));
  // Remove gallery images
  for (const fn of village.imgs) {
    await removeImage('village', path.basename(fn));
  }

  await villageModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'Village and its chalets deleted.' });
};

export const updateVillage = async (req, res, next) => {
  const { id } = req.params;
  const { name, description, city, features, services } = req.body;
  const existing = await villageModel.findById(id);
  if (!existing) {
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

  if (features) {
    try {
      updateData.features = JSON.parse(features);
    } catch {
      return next(new AppError('Invalid features format. Expecting JSON array.', 400));
    }
  }

  if (services) {
    try {
      updateData.services = JSON.parse(services);
    } catch {
      return next(new AppError('Invalid features format. Expecting JSON array.', 400));
    }
  }

  // Handle new main image
  if (req.file) {
    await removeImage('village', path.basename(existing.img));
    updateData.img = req.file.filename;
  }
  // Handle new gallery images
  if (req.files?.imgs) {
    for (const fn of existing.imgs) {
      await removeImage('village', path.basename(fn));
    }
    updateData.imgs = req.files.imgs.map(f => f.filename);
  }

  const updated = await villageModel.findByIdAndUpdate(id, updateData, { new: true }).populate('city features.feature');
  res.status(200).json({ success: true, data: updated });
};
