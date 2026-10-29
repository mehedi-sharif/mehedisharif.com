import type { APIRoute } from "astro";
import { MongoClient } from "mongodb";
import { secret } from "../../lib/server/runtime";
import { sameOrigin } from "../../lib/server/timeline-auth";
import { counter } from "../../lib/server/verification-count";
export const prerender = false;
export const POST: APIRoute = async (context) => {
  if (!sameOrigin(context)) return new Response(null, { status: 403 });
  let client: MongoClient | undefined;
  try {
    const { email } = await context.request.json();
    if (
      typeof email !== "string" ||
      email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    )
      return Response.json(
        { error: "Enter a valid email address" },
        { status: 400 },
      );
    const apiKey = secret(context.locals, "REOON_EMAIL_API_KEY");
    client = new MongoClient(secret(context.locals, "MONGODB_URI"), {
      maxPoolSize: 1,
      serverSelectionTimeoutMS: 5000,
    });
    await client.connect();
    const { collection, id } = await counter(client.db("mehedisharif"));
    const reserved = await collection.findOneAndUpdate(
      { _id: id, count: { $lt: 20 } },
      { $inc: { count: 1 } },
      { returnDocument: "after" },
    );
    if (!reserved)
      return Response.json(
        { error: "Daily verification limit reached" },
        { status: 429 },
      );
    const url = new URL("https://emailverifier.reoon.com/api/v1/verify");
    url.search = new URLSearchParams({
      email,
      key: apiKey,
      mode: "quick",
    }).toString();
    const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!response.ok)
      return Response.json(
        { error: "Email verification provider unavailable" },
        { status: 502 },
      );
    const result = await response.json();
    return Response.json(
      { result, count: reserved.count },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Verification service unavailable" },
      { status: 503 },
    );
  } finally {
    await client?.close();
  }
};
