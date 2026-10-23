import express from 'express';
import {
  createBooking,
  getMyBookings,
  getAllBookings,
  cancelBooking,
  updateBookingStatus,
} from '../controllers/bookingController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // All booking routes require authentication

router.post('/', createBooking);
router.get('/my-bookings', getMyBookings);
router.put('/:id/cancel', cancelBooking);

// Admin routes
router.get('/', restrictTo('admin'), getAllBookings);
router.put('/:id/status', restrictTo('admin'), updateBookingStatus);

export default router;
