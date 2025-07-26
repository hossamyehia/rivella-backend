import mongoose, { Types } from "mongoose";

const contactSchema = mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    message:String

}, { timestamps: true });

export const contactModel = mongoose.model('contact', contactSchema);
