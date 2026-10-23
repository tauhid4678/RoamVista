import Booking from '../models/Booking.js';
import Tour from '../models/Tour.js';
import { isConnected } from '../config/db.js';
import memoryStore from '../utils/memoryStore.js';

export const createBooking = async (req, res, next) => {
  try {
    const { tourId, departureDate, guests, contactName, contactEmail } = req.body;

    if (!tourId || !departureDate || !guests) {
      return res.status(400).json({
        success: false,
        message: 'Please provide tourId, departureDate, and guests count.',
      });
    }

    if (!isConnected) {
      const newBooking = memoryStore.createBooking({
        tourId,
        departureDate,
        guests,
        contactName: contactName || req.user.name,
        contactEmail: contactEmail || req.user.email,
        userId: req.user._id,
      });

      return res.status(201).json({
        success: true,
        data: newBooking,
      });
    }

    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'The requested expedition does not exist.',
      });
    }

    const totalPrice = tour.price * Number(guests);

    const booking = await Booking.create({
      user: req.user._id,
      tour: tour._id,
      departureDate,
      guests: Number(guests),
      totalPrice,
      contactName: contactName || req.user.name,
      contactEmail: contactEmail || req.user.email,
      status: 'Confirmed',
    });

    res.status(201).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const getMyBookings = async (req, res, next) => {
  try {
    if (!isConnected) {
      const bookings = memoryStore.findBookings(req.user._id);
      return res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings,
      });
    }

    const bookings = await Booking.find({ user: req.user._id })
      .populate('tour', 'title location image durationDays price category')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookings = async (req, res, next) => {
  try {
    if (!isConnected) {
      const bookings = memoryStore.bookings;
      return res.status(200).json({
        success: true,
        count: bookings.length,
        data: bookings,
      });
    }

    const bookings = await Booking.find()
      .populate('user', 'name email avatar')
      .populate('tour', 'title location price durationDays')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings,
    });
  } catch (error) {
    next(error);
  }
};

export const cancelBooking = async (req, res, next) => {
  try {
    if (!isConnected) {
      const cancelled = memoryStore.cancelBooking(req.params.id);
      if (!cancelled) {
        return res.status(404).json({ success: false, message: 'Booking not found.' });
      }
      return res.status(200).json({
        success: true,
        message: 'Reservation cancelled successfully.',
        data: cancelled,
      });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    if (booking.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to modify this reservation.',
      });
    }

    booking.status = 'Cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Reservation cancelled successfully.',
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

export const updateBookingStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    if (!isConnected) {
      const b = memoryStore.bookings.find((item) => item._id === req.params.id || item.id === req.params.id);
      if (!b) return res.status(404).json({ success: false, message: 'Booking not found.' });
      b.status = status;
      return res.status(200).json({ success: true, data: b });
    }

    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};
