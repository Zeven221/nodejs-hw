import mongoose from "mongoose";
import 'dotenv/config';
export async function connectMongoDB() {
  const DB_URL = process.env.MONGO_URL;
  try{
    await mongoose.connect(DB_URL);
    console.log('✅ MongoDB connection established successfully.');
  }
  catch(error){
    console.log('❌ Failed to connect to MongoDB, error:', error);
    process.exit(1);
  }
}
