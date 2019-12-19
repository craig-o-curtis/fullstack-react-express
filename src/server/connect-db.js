import { MongoClient } from 'mongodb';
// local url
const url = process.env.MONGODB_URI || `mongodb://localhost:27017/myorganizer`;

// var for db connection
let db = null;

// function to connect to db
export async function connectDB() {
  // allow caching of db
  if (db) return db;

  // the connection
  // arg1 = url
  // arg2 = options
  let client = await MongoClient.connect(url, { useNewUrlParser: true });
  db = client.db();
  console.info("Got DB, ", db);
  return db;
}

// connectDB();