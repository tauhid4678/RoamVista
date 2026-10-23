import Contact from '../models/Contact.js';
import { isConnected } from '../config/db.js';
import memoryStore from '../utils/memoryStore.js';

export const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, category, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please complete all required fields.',
      });
    }

    if (!isConnected) {
      const contact = memoryStore.createContact({ name, email, subject, category, message });
      return res.status(201).json({
        success: true,
        message: 'Inquiry received. An expedition advisor will respond shortly.',
        data: contact,
      });
    }

    const contact = await Contact.create({
      name,
      email,
      subject,
      category: category || 'General Inquiry',
      message,
    });

    res.status(201).json({
      success: true,
      message: 'Inquiry received. An expedition advisor will respond shortly.',
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    if (!isConnected) {
      return res.status(200).json({
        success: true,
        count: memoryStore.contacts.length,
        data: memoryStore.contacts,
      });
    }

    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
};

export const markContactRead = async (req, res, next) => {
  try {
    if (!isConnected) {
      const updated = memoryStore.toggleContactRead(req.params.id);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Inquiry not found.' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Inquiry not found.',
      });
    }

    contact.isRead = !contact.isRead;
    await contact.save();

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
};
