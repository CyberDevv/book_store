import mongoose from 'mongoose';

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('MongoDB Connection Succeeded.');
   } catch (err) {
      console.log('Error in DB connection: ' + err.message);
      process.exit(1);
   }
};

export default connectDB;
