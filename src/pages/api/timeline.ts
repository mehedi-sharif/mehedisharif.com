import type { APIRoute } from "astro";
import { MongoClient, ObjectId } from "mongodb";

export const prerender = false;
import { secret } from "../../lib/server/runtime";
import { authorized, sameOrigin } from "../../lib/server/timeline-auth";
const database = "mehedisharif";
const collection = "timeline";

export const GET: APIRoute = async (context) => {
  const { request, locals } = context;
  if (request.method !== "GET" && !sameOrigin(context))
    return new Response(null, { status: 403 });
  if (!(await authorized(context)))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  let client: MongoClient | undefined;
  try {
    client = new MongoClient(secret(locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(database);
    const events = await db
      .collection(collection)
      .find({})
      .sort({ date: -1 })
      .toArray();

    return new Response(JSON.stringify(events), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("GET request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client?.close();
  }
};

export const POST: APIRoute = async (context) => {
  const { request, locals } = context;
  if (request.method !== "GET" && !sameOrigin(context))
    return new Response(null, { status: 403 });
  if (!(await authorized(context)))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  let client: MongoClient | undefined;
  try {
    const newEvent = await request.json();
    if (!newEvent) {
      throw new Error("Request body is empty");
    }

    client = new MongoClient(secret(locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(database);
    const result = await db.collection(collection).insertOne(newEvent);

    return new Response(JSON.stringify(result.insertedId), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("POST request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to add event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client?.close();
  }
};

export const PUT: APIRoute = async (context) => {
  const { request, locals } = context;
  if (request.method !== "GET" && !sameOrigin(context))
    return new Response(null, { status: 403 });
  if (!(await authorized(context)))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  let client: MongoClient | undefined;
  try {
    const updatedEvent = await request.json();
    if (!updatedEvent || !updatedEvent.id) {
      throw new Error("Invalid request body");
    }

    const { id, _id, ...rest } = updatedEvent;

    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid ObjectId");
    }

    client = new MongoClient(secret(locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(database);
    const result = await db
      .collection(collection)
      .updateOne({ _id: new ObjectId(id) }, { $set: rest });

    if (result.modifiedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No document was updated" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    const updatedEvents = await db.collection(collection).find({}).toArray();

    return new Response(JSON.stringify(updatedEvents), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("PUT request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to update event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client?.close();
  }
};

export const DELETE: APIRoute = async (context) => {
  const { request, locals } = context;
  if (request.method !== "GET" && !sameOrigin(context))
    return new Response(null, { status: 403 });
  if (!(await authorized(context)))
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  let client: MongoClient | undefined;
  try {
    const { id } = await request.json();
    if (!id || !ObjectId.isValid(id)) {
      throw new Error("Invalid or missing ObjectId");
    }

    client = new MongoClient(secret(locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const db = client.db(database);
    const result = await db
      .collection(collection)
      .deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(
        JSON.stringify({ error: "No document was deleted" }),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("DELETE request failed:", error);
    return new Response(JSON.stringify({ error: "Failed to delete event" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } finally {
    await client?.close();
  }
};
