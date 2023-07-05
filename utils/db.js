import mongoose from 'mongoose';

// const dbName = 'give-hope'

const connectDB = async () => {
  try {
    const URI = process.env.MONGO_URL;
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB succesfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

export default connectDB;
