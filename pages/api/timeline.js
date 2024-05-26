import { MongoClient, ObjectId } from "mongodb";

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

if (!uri) {
  throw new Error("Missing MongoDB URI");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
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
      const timelines = await collection.find({}).sort({ date: -1 }).toArray();
      res.status(200).json(timelines);
    } else if (req.method === "POST") {
      const newEvent = req.body;
      await collection.insertOne(newEvent);
      const updatedTimelines = await collection.find({}).toArray();
      res.status(200).json(updatedTimelines);
    } else if (req.method === "PUT") {
      const { id, ...updatedEvent } = req.body;
      try {
        const objectId = new ObjectId(id);
        delete updatedEvent._id;

        await collection.updateOne({ _id: objectId }, { $set: updatedEvent });
        const updatedTimelines = await collection.find({}).toArray();
        res.status(200).json(updatedTimelines);
      } catch (error) {
        console.error("Failed to update event", error);
        res.status(500).json({ error: "Failed to update event" });
      }
    } else if (req.method === "DELETE") {
      const { id } = req.body;
      await collection.deleteOne({ _id: new ObjectId(id) });
      const updatedTimelines = await collection.find({}).toArray();
      res.status(200).json(updatedTimelines);
    } else {
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to load data" });
  }
}
