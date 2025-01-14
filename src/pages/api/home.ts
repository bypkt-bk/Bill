import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;

export async function GET({}) {
  const client = new MongoClient(uri ?? '');
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db('admin').command({ ping: 1 });
    console.log('Pinged your deployment. You successfully connected to MongoDB!');
  } catch (error) {
    // Ensures that the client will close when you finish/error
    throw new Error('Connection failed');
  }
  return new Response(JSON.stringify({ message: 'Pond' }));
}
