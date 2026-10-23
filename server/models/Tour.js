import mongoose from 'mongoose';

const itineraryItemSchema = new mongoose.Schema(
  {
    day: { type: Number, required: true },
    title: { type: String, required: true },
    details: { type: String, required: true },
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Tour title is required'],
      trim: true,
      maxlength: [100, 'Tour title cannot exceed 100 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Alpine Trekking', 'Wildlife Safari', 'Cultural Heritage', 'Coastal Sailing', 'Arctic Expedition'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    durationDays: {
      type: Number,
      required: [true, 'Duration in days is required'],
      min: [1, 'Duration must be at least 1 day'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Max group size is required'],
      default: 10,
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Challenging', 'Strenuous'],
      default: 'Moderate',
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    rating: {
      type: Number,
      default: 4.9,
      min: [1, 'Rating must be at least 1.0'],
      max: [5, 'Rating cannot exceed 5.0'],
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      required: [true, 'Primary image URL is required'],
    },
    gallery: {
      type: [String],
      default: [],
    },
    summary: {
      type: String,
      required: [true, 'Short summary is required'],
      maxlength: [300, 'Summary cannot exceed 300 characters'],
    },
    description: {
      type: String,
      required: [true, 'Detailed description is required'],
    },
    highlights: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    itinerary: {
      type: [itineraryItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

// Slug auto-generation
tourSchema.pre('save', function (next) {
  if (this.isModified('title') && !this.slug) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  next();
});

tourSchema.index({ category: 1, price: 1, rating: -1 });

export const Tour = mongoose.model('Tour', tourSchema);
export default Tour;
