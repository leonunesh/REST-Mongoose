import mongoose from 'mongoose';

export async function createDbConnection(uri) {
  try {
    await mongoose.connect(uri, {
      dbName: 'library_db',
    });
    console.log('Connected to MongoDB Atlas with Mongoose.');
    return mongoose;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    throw error;
  }
}
