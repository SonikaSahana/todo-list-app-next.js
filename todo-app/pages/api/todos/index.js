import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise();
  const db = client.db();

  if (req.method === 'GET') {
    const todos = await db.collection('todos').find({}).toArray();
    res.status(200).json(todos);
  } else if (req.method === 'POST') {
    const { title } = req.body;
    const newTodo = { title, status: 'incomplete' };
    const result = await db.collection('todos').insertOne(newTodo);
    res.status(201).json(result);
  } else {
    res.status(405).end();
  }
}
