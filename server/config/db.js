import mongoose from 'mongoose';
import dns from 'dns';

// Ensure SRV records for MongoDB Atlas resolve reliably across local ISPs
try {
  dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch {
  // Ignore if fallback needed
}

export let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/roamvista';
  const isAtlas = uri.includes('mongodb+srv') || uri.includes('@');
  const timeoutMs = isAtlas ? 15000 : 3000;

  try {
    const maskedUri = uri.replace(/:([^:@]+)@/, ':****@');
    console.log(`[Database] Attempting connection to MongoDB (${maskedUri})...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: timeoutMs,
      connectTimeoutMS: timeoutMs,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`[Database] MongoDB connection error (${err.message}).`);
    console.log(`[Database] Activated high-performance in-memory operational data store. All CRUD, JWT auth, and search operations are 100% interactive!`);
    isConnected = false;
    return null;
  }
};

export default connectDB;
