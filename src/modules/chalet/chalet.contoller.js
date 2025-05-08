import path from 'path';
import { chaletModel } from '../../../database/models/chalet.model.js';
import { cityModel } from '../../../database/models/city.model.js';
import { villageModel } from '../../../database/models/village.model.js';
import AppError from '../../utils/services/AppError.js';
import { removeImage } from '../../utils/services/removefile.js';
import { bookingRequestModel } from '../../../database/models/bookingRequest.model.js';
import { reservationModel } from '../../../database/models/reservation.model.js';


export const getAllChalets = async (req, res, next) => {
  try {
    // 1) Destructure “admin” flag alongside existing filters and pagination
    const {
      page = 1,
      limit = 15,
      city,
      village,
      bedrooms,
      guests,
      priceMin,
      priceMax,
      admin
    } = req.query;

    // 2) Build filter object
    const filter = {};
    if (city)      filter.city     = city;
    if (village)   filter.village  = village;
    if (bedrooms)  filter.bedrooms = Number(bedrooms);
    if (guests)    filter.guests   = Number(guests);
    if (priceMin || priceMax) {
      filter.price = {};
      if (priceMin) filter.price.$gte = Number(priceMin);
      if (priceMax) filter.price.$lte = Number(priceMax);
    }

    // 3) If admin=true, return all matching chalets without pagination
    if (admin === 'true') {
      const allChalets = await chaletModel.find(filter)
        .populate('city')
        .populate('village');

      return res.status(200).json({
        success: true,
        total: allChalets.length,
        data: allChalets
      });
    }

    // 4) Otherwise, apply pagination
    const total      = await chaletModel.countDocuments(filter);
    const totalPages = Math.ceil(total / Number(limit));
    const skip       = (Number(page) - 1) * Number(limit);

    const chalets = await chaletModel.find(filter)
      .populate('city')
      .populate('village')
      .skip(skip)
      .limit(Number(limit));

    // 5) Send paginated response
    res.status(200).json({
      success: true,
      total,
      totalPages,
      page: Number(page),
      data: chalets
    });
  } catch (err) {
    next(err);
  }
};


// Get a single chalet by ID, including its reserved periods
export const getChaletById = async (req, res, next) => {
  const { id } = req.params;
  const chalet = await chaletModel.findById(id)
    .populate('city')
    .populate('village');
  if (!chalet) return next(new AppError('Chalet not found.', 404));

  // Fetch future reservations to identify reserved dates
  const today = new Date();
  const reservations = await reservationModel.find({
    chalet: chalet._id,
    checkOut: { $gte: today }
  }).select('checkIn checkOut -_id');

  const reservedPeriods = reservations.map(r => ({
    checkIn: r.checkIn,
    checkOut: r.checkOut
  }));

  // Return chalet data along with its reserved periods
  res.status(200).json({
    success: true,
    data: {
      ...chalet.toObject(),
      reservedPeriods
    }
  });
};

export const addChalet = async (req, res, next) => {
  const {
    name, city, village, location, bedrooms, bathrooms,
    type, guests, price, code, badroomsDetails,
    features, terms
  } = req.body;

  if (!name || !city || !village || !req.files?.mainImg || !req.files?.imgs) {
    return next(new AppError('Missing required fields.', 400));
  }

  if (!await cityModel.exists({ _id: city }))
    return next(new AppError('City not found.', 404));
  if (!await villageModel.exists({ _id: village }))
    return next(new AppError('Village not found.', 404));

  const mainImgName = req.files.mainImg[0].filename;
  const imgsNames = req.files.imgs.map(f => f.filename);
  const videoName    = req.files.video?.[0]?.filename||undefined;  // ← new
  const chalet = await chaletModel.create({
    name,
    city,
    village,
    mainImg: mainImgName,
    imgs: imgsNames,
    location,
    bedrooms: Number(bedrooms),
    bathrooms: Number(bathrooms),
    type,
    guests: Number(guests),
    price: Number(price),
    code,
    badroomsDetails: JSON.parse(badroomsDetails),
    features: JSON.parse(features),
    terms: JSON.parse(terms) ,
    admin:req.admin._id ,
    description:req.body.description ,
    video: videoName, 
  });

  res.status(201).json({ success: true, data: chalet });
};

export const deleteChalet = async (req, res, next) => {
  const { id } = req.params;
  const chalet = await chaletModel.findById(id);
  if (!chalet) {
    return next(new AppError('Chalet not found.', 404));
  }

  await removeImage('chalet', path.basename(chalet.mainImg));
  chalet.imgs.forEach(img => removeImage('chalet', path.basename(img)));
  await removeImage("chalet",path.basename(chalet.video))
  await chaletModel.findByIdAndDelete(id);
  res.status(200).json({ success: true, message: 'Chalet deleted.' });
};


export const updateChalet = async (req, res, next) => {
  try {
    const { id } = req.params;
    const existing = await chaletModel.findById(id);
    if (!existing) {
      return next(new AppError('Chalet not found.', 404));
    }

    // Collect scalar fields
    const updateData = {};
    [
      'name',
      'city',
      'village',
      'location',
      'bedrooms',
      'bathrooms',
      'type',
      'guests',
      'price',
      'code',
      'description'
    ].forEach(field => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // Parse JSON‐encoded arrays
    if (req.body.badroomsDetails) {
      updateData.badroomsDetails = JSON.parse(req.body.badroomsDetails);
    }
    if (req.body.features) {
      updateData.features = JSON.parse(req.body.features);
    }
    if (req.body.terms) {
      updateData.terms = JSON.parse(req.body.terms);
    }

    // Replace main image
    if (req.files?.mainImg) {
      // remove old main image file
      if (existing.mainImg) {
        await removeImage('chalet', path.basename(existing.mainImg));
      }
      updateData.mainImg = req.files.mainImg[0].filename;
    }

    // Replace gallery images
    if (req.files?.imgs) {
      // remove all old imgs
      existing.imgs.forEach(imgPath =>
        removeImage('chalet', path.basename(imgPath))
      );
      updateData.imgs = req.files.imgs.map(f => f.filename);
    }

    // Replace video
    if (req.files?.video) {
      // remove old video file if exists
      if (existing.video) {
        await removeImage('chalet', path.basename(existing.video));
      }
      updateData.video = req.files.video[0].filename;
    }

    // Perform update + populate refs
    const chalet = await chaletModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    })
    .populate('city')
    .populate('village');

    return res.status(200).json({
      success: true,
      data: chalet
    });
  } catch (err) {
    return next(err);
  }
};






export const getStats = async (req, res, next) => {
  try {
    const [chaletsCount, citiesCount, villagesCount] = await Promise.all([
      chaletModel.countDocuments(),
      cityModel.countDocuments(),
      villageModel.countDocuments()
    ]);
    return res.status(200).json({
      success: true,
      data: { chalets:chaletsCount, cities:citiesCount, villages:villagesCount }
    });
  } catch (err) {
    next(err);
  }
};
