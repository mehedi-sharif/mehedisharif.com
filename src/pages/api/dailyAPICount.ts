import type { APIRoute } from "astro";
import { MongoClient, type MongoClientOptions } from "mongodb";

const uri: string = import.meta.env.MONGODB_URI as string;
const options: MongoClientOptions = {};

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!import.meta.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env");
}

if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options);
    (global as any)._mongoClientPromise = client.connect();
  }
  clientPromise = (global as any)._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

const database = "mehedisharif";
const collection = "dailyAPICount";

const getDhakaDate = () => {
  return new Date()
    .toLocaleString("en-CA", {
      timeZone: "Asia/Dhaka",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split(",")[0]; // Format: YYYY-MM-DD
};

// Simulate a different date for testing
// Return the current date + 1 day
// const getDhakaDate = () => {
//   const simulatedDate = new Date();
//   simulatedDate.setDate(simulatedDate.getDate() + 1);
//   return simulatedDate
//     .toLocaleString("en-CA", {
//       timeZone: "Asia/Dhaka",
//       year: "numeric",
//       month: "2-digit",
//       day: "2-digit",
//     })
//     .split(",")[0]; // Format: YYYY-MM-DD
// };

export const GET: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(database);
    const dailyAPICountData = await db.collection(collection).findOne({});

    const todayDate = getDhakaDate();

    if (dailyAPICountData?.date !== todayDate) {
      // Reset count if the date in the database doesn't match the current date
      await db
        .collection(collection)
        .updateOne(
          { type: "verificationCount" },
          { $set: { count: 0, date: todayDate } },
          { upsert: true },
        );
      return new Response(JSON.stringify(0), {
        headers: {
          "Content-Type": "application/json",
        },
      });
    }

    return new Response(JSON.stringify(dailyAPICountData?.count || 0), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET request failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch verification count" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};

export const POST: APIRoute = async () => {
  try {
    const client = await clientPromise;
    const db = client.db(database);

    const todayDate = getDhakaDate();
    const existingDocument = await db
      .collection(collection)
      .findOne({ date: todayDate });

    if (existingDocument) {
      const result = await db
        .collection(collection)
        .updateOne({ date: todayDate }, { $inc: { count: 1 } });
      if (result.modifiedCount === 0) {
        throw new Error("Failed to update daily count");
      }
    } else {
      await db.collection(collection).insertOne({ date: todayDate, count: 1 });
    }

    return new Response(JSON.stringify({ message: "Daily count updated" }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update daily count" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
  }
};
