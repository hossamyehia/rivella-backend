import { termsModel } from './terms.model.js';

export const getAllTerms = async (req, res) => {
  try {
    const terms = await termsModel.find();
    res.status(200).json({ success: true, data: terms });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getTermsById = async (req, res) => {
  try {
    const term = await termsModel.findById(req.params.id);
    if (!term) {
      return res.status(404).json({ success: false, message: 'Term not found' });
    }
    res.status(200).json({ success: true, data: term });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const createTerm = async (req, res) => {
  try {
    const newTerm = new termsModel(req.body);
    const savedTerm = await newTerm.save();
    res.status(201).json({ success: true, data: savedTerm });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateTerm = async (req, res) => {
  try {
    const updatedTerm = await termsModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTerm) {
      return res.status(404).json({ success: false, message: 'Term not found' });
    }  
    res.status(200).json({ success: true, data: updatedTerm });
    } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}

export const deleteTerm = async (req, res) => {
  try {
    const deletedTerm = await termsModel.findByIdAndDelete(req.params.id);
    if (!deletedTerm) {
      return res.status(404).json({ success: false, message: 'Term not found' });
    }
    res.status(200).json({ success: true, message: 'Term deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
}
