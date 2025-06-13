import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const client = await clientPromise();
  const db = client.db();
  const { id } = req.query;

  if (req.method === 'PATCH') {
    const { title, status } = req.body;
    await db.collection('todos').updateOne(
      { _id: new ObjectId(id) },
      { $set: { ...(title && { title }), ...(status && { status }) } }
    );
    res.status(200).json({ message: 'Updated' });
  } else {
    res.status(405).end();
  }
}