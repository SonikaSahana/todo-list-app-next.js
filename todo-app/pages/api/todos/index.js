import clientPromise from '../../../lib/mongodb';

export default async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db();

  const newTodo = {
  title,
  status: 'incomplete', 
};

await db.collection('todos').insertOne(newTodo);


  if (req.method === 'GET') {
    const todos = await db.collection('todos').find().toArray();
    res.json(todos);
  }

  if (req.method === 'POST') {
    const { title } = req.body;
    const result = await db.collection('todos').insertOne({ title });
    res.json(result);
  }
}
