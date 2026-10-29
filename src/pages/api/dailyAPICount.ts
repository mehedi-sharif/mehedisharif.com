import type { APIRoute } from "astro";
import { MongoClient } from "mongodb";
import { secret } from "../../lib/server/runtime";
import { counter } from "../../lib/server/verification-count";
export const prerender = false;
export const GET: APIRoute = async ({ locals }) => {
  let client: MongoClient | undefined;
  try {
    client = new MongoClient(secret(locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const { collection, id } = await counter(client.db("mehedisharif"));
    return Response.json((await collection.findOne({ _id: id }))?.count || 0, {
      headers: { "Cache-Control": "no-store" },
    });
  } catch {
    return Response.json(
      { error: "Verification service unavailable" },
      { status: 503 },
    );
  } finally {
    await client?.close();
  }
};
