import mongoose, { Types } from "mongoose";

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
    enum: ["فله", "شاليه"],
    required: true
  },
  guests: Number,
  price: Number,
  code: String, 
  badroomsDetails: [
    {
      title: { type: String, required: true },
      text:  { type: String}
    }
  ],

  features: [
    {
      name:  { type: String, required: true },
      description: { type: String }
    }
  ],

  terms: [
    {
      term:    { type: String, required: true },
      allowed: { type: Boolean, default: false }
    }
  ] ,
  admin:{
    type:Types.ObjectId,
    ref:"admin"
  }

}, { timestamps: true });




chaletSchema.post('init', doc => {
  const base = `${process.env.DOMAIN}/chalet`;
  doc.mainImg = `${base}/${doc.mainImg}`;
  doc.imgs    = doc.imgs.map(img => `${base}/${img}`);
});





export const chaletModel = mongoose.model("chalet", chaletSchema);