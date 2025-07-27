import mongoose from "mongoose";

const serviceSchema = mongoose.Schema({
    name: String,
    description: String
}, { timestamps: true });

export const serviceModel = mongoose.model('service', serviceSchema);