import mongoose from 'mongoose';
const connectDB = async () => {
    try {
      // using connect function to connect with database
      await mongoose.connect(process.env.MONGO_URI!, {});
      console.log('MongoDB connected');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Optional: Exit the process if DB connection fails
    }
  };

export default connectDB;