
// controllers/contact.controller.js

import mongoose from 'mongoose';
import { contactModel } from './contact.model.js';
// Create a new contact message (usable by public)
export async function createContact(req, res) {
  try {
    const { name, email, phone, message } = req.body;
    const doc = new contactModel({ name, email, phone, message });
    await doc.save();
    return res.status(201).json({ success: true, data: doc });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Get all contact messages (admin only)
export async function getAllContacts(req, res) {
  try {
    const contacts = await contactModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, data: contacts });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}

// Delete one contact by ID (admin only)
export async function deleteContactById(req, res) {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ success: false, message: 'Invalid ID' });
    }
    const doc = await contactModel.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Message not found' });
    }
    return res.status(200).json({ success: true, message: 'Deleted successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
}
