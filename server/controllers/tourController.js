import Tour from '../models/Tour.js';
import { isConnected } from '../config/db.js';
import memoryStore from '../utils/memoryStore.js';

export const getTours = async (req, res, next) => {
  try {
    const { search, category, maxPrice, minRating, duration, sort, page = 1, limit = 8 } = req.query;

    if (!isConnected) {
      const results = memoryStore.findTours({ search, category, maxPrice, minRating, duration, sort, page, limit });
      return res.status(200).json({
        success: true,
        ...results,
      });
    }

    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { location: { $regex: search, $options: 'i' } },
        { summary: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'All') {
      query.category = category;
    }

    if (maxPrice) {
      query.price = { $lte: Number(maxPrice) };
    }

    if (minRating && minRating !== 'All') {
      query.rating = { $gte: Number(minRating) };
    }

    if (duration === 'short') {
      query.durationDays = { $lte: 7 };
    } else if (duration === 'medium') {
      query.durationDays = { $gte: 8, $lte: 10 };
    } else if (duration === 'long') {
      query.durationDays = { $gte: 11 };
    }

    let sortQuery = { isFeatured: -1, createdAt: -1 };
    if (sort === 'price-low') {
      sortQuery = { price: 1 };
    } else if (sort === 'price-high') {
      sortQuery = { price: -1 };
    } else if (sort === 'rating') {
      sortQuery = { rating: -1 };
    } else if (sort === 'duration') {
      sortQuery = { durationDays: 1 };
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const skip = (pageNum - 1) * limitNum;

    const total = await Tour.countDocuments(query);
    const tours = await Tour.find(query).sort(sortQuery).skip(skip).limit(limitNum);

    res.status(200).json({
      success: true,
      count: tours.length,
      total,
      totalPages: Math.ceil(total / limitNum) || 1,
      currentPage: pageNum,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedTours = async (req, res, next) => {
  try {
    if (!isConnected) {
      const featured = memoryStore.tours.filter((t) => t.isFeatured).slice(0, 4);
      return res.status(200).json({
        success: true,
        count: featured.length,
        data: featured,
      });
    }

    const tours = await Tour.find({ isFeatured: true }).limit(4);
    res.status(200).json({
      success: true,
      count: tours.length,
      data: tours,
    });
  } catch (error) {
    next(error);
  }
};

export const getTourById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!isConnected) {
      const tour = memoryStore.findTourById(id);
      if (!tour) {
        return res.status(404).json({
          success: false,
          message: 'Expedition not found with requested identifier.',
        });
      }
      return res.status(200).json({
        success: true,
        data: tour,
      });
    }

    let tour;
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      tour = await Tour.findById(id);
    } else {
      tour = await Tour.findOne({ $or: [{ slug: id }, { id: id }] });
    }

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Expedition not found with the requested identifier.',
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

export const createTour = async (req, res, next) => {
  try {
    if (!isConnected) {
      const newTour = memoryStore.createTour(req.body);
      return res.status(201).json({
        success: true,
        data: newTour,
      });
    }

    const tour = await Tour.create(req.body);
    res.status(201).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTour = async (req, res, next) => {
  try {
    if (!isConnected) {
      const updated = memoryStore.updateTour(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Tour not found.' });
      }
      return res.status(200).json({ success: true, data: updated });
    }

    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTour = async (req, res, next) => {
  try {
    if (!isConnected) {
      const removed = memoryStore.deleteTour(req.params.id);
      if (!removed) {
        return res.status(404).json({ success: false, message: 'Tour not found.' });
      }
      return res.status(200).json({
        success: true,
        message: 'Expedition deleted successfully.',
      });
    }

    const tour = await Tour.findByIdAndDelete(req.params.id);

    if (!tour) {
      return res.status(404).json({
        success: false,
        message: 'Tour not found.',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Expedition deleted successfully.',
    });
  } catch (error) {
    next(error);
  }
};
