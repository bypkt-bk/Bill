import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

let db;

export async function connectToDatabase() {
    try {
      await client.connect();
      db = client.db();
      console.log('✅ Connected to MongoDB Atlas');
    } catch (error) {
      console.error('❌ Error connecting to MongoDB:', error.message);
      throw error;
    }
  return db;
}
