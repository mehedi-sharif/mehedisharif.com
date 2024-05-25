import { MongoClient } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("Missing MongoDB URI");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  let globalWithMongo = global;

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("mehedisharif");
    const collection = db.collection("timeline");

    if (req.method === "GET") {
      const timelines = await collection.find({}).toArray();
      res.status(200).json(timelines);
    } else if (req.method === "POST") {
      const newEvent = req.body;
      await collection.insertOne(newEvent);
      const updatedTimelines = await collection.find({}).toArray();
      res.status(200).json(updatedTimelines);
    } else {
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to load data" });
  }
}
