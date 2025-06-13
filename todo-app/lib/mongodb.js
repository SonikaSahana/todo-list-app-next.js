import { MongoClient } from 'mongodb';

const uri = 'your_mongodb_connection_string';
let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your Mongo URI to .env.local');
}

const options = {};

client = new MongoClient(process.env.MONGODB_URI, options);
clientPromise = client.connect();

export default clientPromise;
