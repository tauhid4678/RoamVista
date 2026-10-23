import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB, { isConnected } from './config/db.js';
import errorHandler from './middleware/error.js';
import Tour from './models/Tour.js';
import { importData } from './utils/seeder.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import tourRoutes from './routes/tourRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security and utility middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors({
  origin: true,
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    service: 'RoamVista API',
    database: isConnected ? 'MongoDB (connected)' : 'In-Memory Operational Store (active)',
    timestamp: new Date().toISOString(),
    uptime: `${Math.floor(process.uptime())}s`,
  });
});

// Mount modular API routers
app.use('/api/auth', authRoutes);
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);

// Centralized error handling
app.use(errorHandler);

// Start server and connect DB
const startServer = async () => {
  try {
    await connectDB();

    if (isConnected) {
      const count = await Tour.countDocuments();
      if (count === 0) {
        console.log('[Server] MongoDB is empty. Populating initial seed data...');
        await importData();
      }
    }

    app.listen(PORT, () => {
      console.log(`[RoamVista API] Server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
      console.log(`[RoamVista API] Health endpoint active at: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error(`[Server Bootstrap Error] ${error.message}`);
  }
};

startServer();

export default app;
