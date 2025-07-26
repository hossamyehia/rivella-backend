import mongoose, { Types } from "mongoose";
import { BED_TYPES_AR } from "../../../database/BedTypes.data.js";

const ChaletFeatureSchema = new mongoose.Schema({
  feature: {
    type: Types.ObjectId,
    ref: "feature",
    required: true
  },
  price: { type: Number, default: 0 }
})

const chaletSchema = mongoose.Schema({
  name: String,
  city: {
    type: Types.ObjectId,
    ref: "city"
  },
  village: {
    type: Types.ObjectId,
    ref: "village"
  },
  mainImg: String,
  imgs: [String],
  location: String,
  bedrooms: Number,
  bathrooms: Number,
  type: {
    type: String,
    enum: ["فيلا", "شاليه"],
    required: true
  },
  guests: Number,
  price: Number,
  code: {
    type: String,
    require: true,
    unique: true,
  },
  rooms: [
    {
      beds: [
        {
          count: {
            type: Number,
            default: 1
          },
          bedType: {
            type: String,
            enum: BED_TYPES_AR
          }
        }
      ],
      moreDetails: String
    }
  ],
  features: [
    ChaletFeatureSchema
  ],
  terms: [
    {
      type: Types.ObjectId,
      ref: "term"
    }
  ],
  admin: {
    type: Types.ObjectId,
    ref: "admin"
  },
  description: String,
  video: String,
  minNights: {
    type: Number,
    default: 1
  },
  isVisiable: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

chaletSchema.post('init', doc => {
  const base = `${process.env.DOMAIN}/uploads/chalet`;
  doc.mainImg = `${base}/${doc.mainImg}`;
  if (doc.video) doc.video = `${base}/${doc.video}`;
  doc.imgs = doc.imgs.map(img => `${base}/${img}`);
});


export const chaletModel = mongoose.model("chalet", chaletSchema);
