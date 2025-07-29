
import { serviceModel } from './service.model.js';


export const getAllServices = async (req, res, next) => {
  try {
    const services = await serviceModel.find();
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    next(err);
  }
}

export const getServiceById = async (req, res, next) => {
  try {
    const service = await serviceModel.findById(req.params.id);
    if (!service) return next(new AppError('لا يوجد ميزة', 404));
    res.status(200).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
};

export const createService = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return next(new AppError('الاسم مفقود', 400));
    if (!description) return next(new AppError('الوصف مفقود', 400));

    const service = await serviceModel.create({ name, description });
    res.status(201).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
}

export const updateService = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const service = await serviceModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!service) return next(new AppError('لا يوجد ميزه', 404));

    res.status(200).json({ success: true, data: service });
  } catch (err) {
    next(err);
  }
}

export const deleteService = async (req, res, next) => {
  try {
    const service = await serviceModel.findByIdAndDelete(req.params.id);
    if (!service) return next(new AppError('لا يوجد ميزه', 404));

    res.status(200).json({ success: true, message: 'Service deleted successfully' });
  } catch (err) {
    next(err);
  }
}