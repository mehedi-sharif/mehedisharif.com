import { MongoClient, ObjectId } from 'mongodb';

const uri = "mongodb+srv://mehedisharif:pgRUzeqyyQ2WbcHy@cluster0.s4jpwgt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const options = {};
let client;
let clientPromise;
if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}
const database = "mehedisharif";
const collection = "timeline";
const GET = async () => {
  try {
    const client2 = await clientPromise;
    const db = client2.db(database);
    const events = await db.collection(collection).find({}).sort({ date: -1 }).toArray();
    return new Response(JSON.stringify(events), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("GET request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const POST = async ({ request }) => {
  try {
    const newEvent = await request.json();
    if (!newEvent) {
      throw new Error("Request body is empty");
    }
    const client2 = await clientPromise;
    const db = client2.db(database);
    const result = await db.collection(collection).insertOne(newEvent);
    return new Response(JSON.stringify(result.insertedId), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to add event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    const updatedEvent = await request.json();
    if (!updatedEvent || !updatedEvent.id) {
      throw new Error("Invalid request body");
    }
    const { id, _id, ...rest } = updatedEvent;
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }
    const client2 = await clientPromise;
    const db = client2.db(database);
    const result = await db.collection(collection).updateOne({ _id: new ObjectId(id) }, { $set: rest });
    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No document was updated" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    const updatedEvents = await db.collection(collection).find({}).toArray();
    return new Response(JSON.stringify(updatedEvents), {
      headers: {
        "Content-Type": "application/json"
      }
    });
  } catch (error) {
    console.error("PUT request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to update event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};
const DELETE = async ({ request }) => {
  try {
    const { id } = await request.json();
    if (!id || !ObjectId.isValid(id)) {
      throw new Error("Invalid or missing ObjectId");
    }
    const client2 = await clientPromise;
    const db = client2.db(database);
    const result = await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No document was deleted" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to delete event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }
};

export { DELETE, GET, POST, PUT };
