import mongoose, { Types } from "mongoose";

const VillageFeatureSchema = new mongoose.Schema({
  feature: {
    type: Types.ObjectId,
    ref: "feature",
    required: true
  },
  price: { type: Number, default: 0 }
})

const VillageServiceSchema = new mongoose.Schema({
  feature: {
    type: Types.ObjectId,
    ref: "feature",
    required: true
  },
  price: { type: Number, default: 0 }
})

const villageSchema = mongoose.Schema({
  name: String,
  img: String,
  description: String,
  city: {
    type: Types.ObjectId,
    ref: "city",
    require: true
  },
  features: [VillageFeatureSchema],
  services: [VillageServiceSchema],
  imgs: []


}, { timestamps: true });


// features: [
//   {
//     name: { type: String, required: true },
//     description: { type: String }
//   }
// ]


villageSchema.post("init", (doc) => {
  doc.img = `${process.env.DOMAIN}/uploads/village/${doc.img}`
  if (doc.imgs) doc.imgs = doc.imgs.map(img => `${process.env.DOMAIN}/uploads/village/${img}`);

})




export const villageModel = mongoose.model('village', villageSchema);
