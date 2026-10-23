import express from 'express';
import {
  getTours,
  getFeaturedTours,
  getPublicStats,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
} from '../controllers/tourController.js';
import { protect, restrictTo } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getTours);
router.get('/featured', getFeaturedTours);
router.get('/stats', getPublicStats);
router.get('/:id', getTourById);

// Admin protected endpoints
router.post('/', protect, restrictTo('admin'), createTour);
router.put('/:id', protect, restrictTo('admin'), updateTour);
router.delete('/:id', protect, restrictTo('admin'), deleteTour);

export default router;
