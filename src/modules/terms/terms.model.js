import mongoose from "mongoose";

const termsSchema = mongoose.Schema({
    term: String,
    allowed: { type: Boolean, default: false }
}, { timestamps: true });

export const termsModel = mongoose.model('term', termsSchema);