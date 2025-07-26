import mongoose, { Types } from "mongoose";

const citySchema = mongoose.Schema({
  name: String,
  img: String,
  description: String


}, { timestamps: true });

citySchema.post("init", (doc) => {
  doc.img = `${process.env.DOMAIN}/uploads/city/${doc.img}`
})


export const cityModel = mongoose.model('city', citySchema);
