
import { featureModel } from './feature.model.js';


export const getAllFeatures = async (req, res, next) => {
  try {
    const features = await featureModel.find();
    res.status(200).json({ success: true, data: features });
  } catch (err) {
    next(err);
  }
}

export const getFeatureById = async (req, res, next) => {
  try {
    const feature = await featureModel.findById(req.params.id);
    if (!feature) return next(new AppError('لا يوجد ميزة', 404));
    res.status(200).json({ success: true, data: feature });
  } catch (err) {
    next(err);
  }
};

export const createFeature = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return next(new AppError('الاسم مفقود', 400));
    if (!description) return next(new AppError('الوصف مفقود', 400));

    const feature = await featureModel.create({ name, description });
    res.status(201).json({ success: true, data: feature });
  } catch (err) {
    next(err);
  }
}

export const updateFeature = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    const feature = await featureModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!feature) return next(new AppError('لا يوجد ميزه', 404));

    res.status(200).json({ success: true, data: feature });
  } catch (err) {
    next(err);
  }
}

export const deleteFeature = async (req, res, next) => {
  try {
    const feature = await featureModel.findByIdAndDelete(req.params.id);
    if (!feature) return next(new AppError('لا يوجد ميزه', 404));

    res.status(200).json({ success: true, message: 'Feature deleted successfully' });
  } catch (err) {
    next(err);
  }
}