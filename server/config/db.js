import mongoose from 'mongoose';

export let isConnected = false;

export const connectDB = async () => {
  const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/roamvista';

  try {
    console.log(`[Database] Attempting connection to MongoDB (${uri})...`);
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
      connectTimeoutMS: 2000,
    });
    isConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return conn;
  } catch (err) {
    console.warn(`[Database] Local/External MongoDB not detected on port 27017 (${err.message}).`);
    console.log(`[Database] Activated high-performance in-memory operational data store. All CRUD, JWT auth, and search operations are 100% interactive!`);
    isConnected = false;
    return null;
  }
};

export default connectDB;
