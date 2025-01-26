import { MongoClient } from 'mongodb';

const uri = import.meta.env.MONGODB_URI;

export async function POST(Astro: { request: { json: () => any } }) {
  const client = new MongoClient(uri ?? '');
  try {
    const body = await Astro.request.json();

    const { customer_name, address, date, items } = body;
    if (!customer_name || !address || !date || !Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'Invalid data provided' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    await client.connect();
    console.info('MongoDB client connected');

    const db = client.db('Bill_data');
    const collection = db.collection('bills');
    const result = await collection.insertOne({
      customer_name,
      address,
      date: new Date(date),
      items,
    });

    return new Response(
      JSON.stringify({ message: 'Bill saved successfully', id: result.insertedId }),
      { status: 200, headers: { 'Content-Type': 'application/json' } },
    );
  } catch (error) {
    console.error('❌ Error saving bill:', error);
    return new Response(JSON.stringify({ error: 'Failed to save bill' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
    console.info('MongoDB client connection closed');
  }
}

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
