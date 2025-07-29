import mongoose from "mongoose";
import { chaletModel } from "./chalet.model.js";
import { chaletCreateSchema, chaletUpdateSchema } from "./chalet.validator.js";
import { normalizeFormData } from "../../utils/_helper/_helper.js";
import { removeImage } from "../../utils/services/removefile.js";
import { reservationModel } from "../reservation/reservation.model.js";
import AppError from "../../utils/services/AppError.js";
import path from 'path';

export const createChalet = async (req, res, next) => {
    try {
        const fieldsToParseAsJSON = ['rooms', 'features', 'terms', 'services'];
        let data = normalizeFormData(req.body, fieldsToParseAsJSON, ['code']);
        const { error, value } = chaletCreateSchema.validate(data);
        if (error) return next(new AppError(`Missing required fields. ${error.details[0].message}`, 400));
        if (!req.files?.mainImg || !req.files?.imgs) next(new AppError("يجب إدراج صورة رئيسية وصور فرعية"))

        if (req.files?.mainImg) {
            data.mainImg = req.files.mainImg[0].filename;
        }

        // Replace gallery images
        if (req.files?.imgs) {
            data.imgs = req.files.imgs.map(f => f.filename);
        }

        // Replace video
        if (req.files?.video) {
            data.video = req.files.video[0].filename;
        }

        const chalet = await chaletModel.create(data)
        // .populate('city village features.feature terms');
        res.status(201).json({ success: true, data: chalet });
    } catch (err) {
        if (req.files?.mainImg) {
            removeImage('chalet', req.files?.mainImg[0].filename);
        }
        if (req.files?.imgs) {
            for (const imgPath of req.files?.imgs) {
                removeImage('chalet', imgPath.filename);
            }
        }
        if (req.files?.video) {
            removeImage('chalet', req.files?.video.filename);
        }
        next(err);
    }
};

export const updateChalet = async (req, res, next) => {
    // console.log(req.body)
    const fieldsToParseAsJSON = ['rooms', 'features', 'terms', 'services'];
    const data = normalizeFormData(req.body, fieldsToParseAsJSON, ['code']);
    const { error } = chaletUpdateSchema.validate(data);
    if (error) {
        return next(new AppError(`Missing required fields. ${error.details[0].message}`, 400));
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existing = await chaletModel.findById(req.params.id).session(session);
        if (!existing) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Chalet not found' });
        }

        if(req.files?.mainImg)
            data.mainImg = req.files?.mainImg?.[0]?.filename;
        
        if(req.files?.imgs)
            data.imgs = req.files?.imgs?.map(f => f.filename);

        if(req.files?.video)
            data.video = req.files?.video?.[0]?.filename;

        const updatedChalet = await chaletModel.findByIdAndUpdate(req.params.id, data, { new: true, session })
            .populate('city village features.feature services.service terms');

        await session.commitTransaction();
        session.endSession();


        // Now safely remove old files (AFTER DB is safe)
        if (req.files?.mainImg && existing.mainImg) {
            removeImage('chalet', path.basename(existing.mainImg));
        }
        if (req.files?.imgs && existing.imgs?.length) {
            for (const imgPath of existing.imgs) {
                removeImage('chalet', path.basename(imgPath));
            }
        }
        if (req.files?.video && existing.video) {
            removeImage('chalet', path.basename(existing.video));
        }

        res.json({ success: true, data: updatedChalet });

    } catch (err) {
        // console.log(err);
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
};

export const deleteChalet = async (req, res, next) => {
    try {
        const chalet = await chaletModel.findByIdAndDelete(req.params.id);;
        if (!chalet) {
            return next(new AppError('Chalet not found.', 404));
        }

        await removeImage('chalet', path.basename(chalet.mainImg));
        chalet.imgs.forEach(img => removeImage('chalet', path.basename(img)));
        if (chalet.video) await removeImage("chalet", path.basename(chalet.video))

        res.json({ success: true, message: 'Deleted successfully' });
    } catch (err) {
        next(err);
    }
};

export const getChaletById = async (req, res, next) => {
    try {
        const chalet = await chaletModel.findById(req.params.id)
            .populate('city village features.feature services.service terms');
        if (!chalet) return res.status(404).json({ error: 'Chalet not found' });

        const today = new Date();
        const reservations = await reservationModel.find({
            chalet: chalet._id,
            checkOut: { $gte: today }
        }).select('checkIn checkOut -_id');

        const reservedPeriods = reservations.map(r => ({
            checkIn: r.checkIn,
            checkOut: r.checkOut
        }));

        res.json({ success: true, data: { ...chalet.toObject(), reservedPeriods } });
    } catch (err) {
        next(err);
    }
};

export const getAllChalets = async (req, res, next) => {
    try {
        const {
            page = 1,
            limit = 15,
            city,
            village,
            bedrooms,
            guests,
            priceMin,
            priceMax,
            features,
            code,
            admin
        } = req.query;

        const filter = {};
        if (code) filter.code = code;
        if (features) filter["features.feature"] = { $all: features.split(',').map(id => new mongoose.Types.ObjectId(id)) };
        if (city) filter.city = new mongoose.Types.ObjectId(city);
        if (village) filter.village = new mongoose.Types.ObjectId(village);
        if (bedrooms) filter.bedrooms = Number(bedrooms);
        if (guests) filter.guests = Number(guests);
        if (priceMin || priceMax) {
            filter.price = {};
            if (priceMin) filter.price.$gte = Number(priceMin);
            if (priceMax) filter.price.$lte = Number(priceMax);
        }

        if (admin === 'true') {
            const chalets = await chaletModel.find(filter)
                .populate('city village features.feature services.service terms');
            return res.status(200).json({
                success: true,
                total: chalets.length,
                data: chalets
            });
        }

        filter.isActive = true;
        const domain = process.env.DOMAIN;
        const base = `${domain}/uploads/chalet/`;
        const pipeline = [
            { $match: filter },
            { $lookup: { from: "cities", localField: "city", foreignField: "_id", as: "city" } },
            { $unwind: { path: "$city", preserveNullAndEmptyArrays: true } },
            { $lookup: { from: "villages", localField: "village", foreignField: "_id", as: "village" } },
            { $unwind: { path: "$village", preserveNullAndEmptyArrays: true } },
            {
                $addFields: {
                    mainImg: { $concat: [base, "$mainImg"] },
                    video: {
                        $cond: [
                            { $ifNull: ["$video", false] },
                            { $concat: [base, "$video"] },
                            null
                        ]
                    },
                    imgs: {
                        $cond: [
                            { $isArray: "$imgs" },
                            {
                                $map: {
                                    input: "$imgs",
                                    as: "img",
                                    in: { $concat: [base, "$$img"] }
                                }
                            },
                            []
                        ]
                    }
                }
            },
            {
                $facet: {
                    meta: [{ $count: "total" }],
                    data: [
                        { $skip: (Number(page) - 1) * Number(limit) },
                        { $limit: Number(limit) }
                    ]
                }
            }
        ];

        const [result] = await chaletModel.aggregate(pipeline);
        const total = result.meta[0]?.total || 0;
        const totalPages = Math.ceil(total / limit);

        res.json({
            success: true,
            total,
            totalPages,
            page: Number(page),
            data: result.data
        });
    } catch (err) {
        next(err);
    }
};

export const getHomeChalets = async (req, res, next) => {
    try {
        const chalets = await chaletModel.find({ isVisiable: true, isActive: true })
            .populate('city village features.feature services.service terms');
        return res.status(200).json({
            success: true,
            data: chalets
        });
    } catch (err) {
        next(err);
    }
}