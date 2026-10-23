import express from 'express';
import {
  createContact,
  getAllContacts,
  markContactRead,
} from '../controllers/contactController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.post('/', createContact);

// Admin routes
router.get('/', protect, restrictTo('admin'), getAllContacts);
router.put('/:id/read', protect, restrictTo('admin'), markContactRead);

export default router;
