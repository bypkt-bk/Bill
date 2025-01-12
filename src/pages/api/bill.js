import { connectToDatabase } from '../../lib/mongodb';

export async function get() {
  try {
    const db = await connectToDatabase();
    const bills = await db.collection('bills').find({}).toArray();
    return new Response(JSON.stringify(bills), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('❌ Error fetching bills:', error.message);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function post({ request }) {
    try {
      const db = await connectToDatabase();
      const bill = await request.json();
      const result = await db.collection('bills').insertOne(bill);
  
      return new Response(JSON.stringify({ insertedId: result.insertedId }), {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      console.error('❌ Error creating bill:', error.message);
      return new Response('Internal Server Error', { status: 500 });
    }
  }
  
