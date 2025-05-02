import mongoose, { Types } from "mongoose";

const adminSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String

}, { timestamps: true });

export const adminModel = mongoose.model('admin', adminSchema);
