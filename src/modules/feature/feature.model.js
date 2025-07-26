import mongoose from "mongoose";

const featureSchema = mongoose.Schema({
    name: String,
    description: String
}, { timestamps: true });

export const featureModel = mongoose.model('feature', featureSchema);