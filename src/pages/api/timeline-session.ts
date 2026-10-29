import type { APIRoute } from "astro";
import { authorized, sameOrigin, sign } from "../../lib/server/timeline-auth";
import { secret } from "../../lib/server/runtime";
export const prerender = false;
export const GET: APIRoute = async (context) =>
  Response.json(
    { authenticated: await authorized(context) },
    {
      status: (await authorized(context)) ? 200 : 401,
      headers: { "Cache-Control": "no-store" },
    },
  );
export const POST: APIRoute = async (context) => {
  if (!sameOrigin(context)) return new Response(null, { status: 403 });
  try {
    const { key } = await context.request.json();
    if (typeof key !== "string" || key.length > 1024)
      return new Response(null, { status: 400 });
    // Compare keyed hashes so comparison timing never reveals the original password.
    const expected = await sign(
      context.locals,
      secret(context.locals, "SECRET_KEY"),
    );
    const actual = await sign(context.locals, key);
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++)
      mismatch |= expected.charCodeAt(i) ^ actual.charCodeAt(i);
    if (mismatch)
      return Response.json({ error: "Incorrect key" }, { status: 401 });
    const expires = String(Date.now() + 8 * 60 * 60 * 1000);
    context.cookies.set(
      "timeline_session",
      `${expires}.${await sign(context.locals, `timeline:${expires}`)}`,
      {
        httpOnly: true,
        secure: context.url.protocol === "https:",
        sameSite: "strict",
        path: "/api",
        maxAge: 8 * 60 * 60,
      },
    );
    return Response.json(
      { authenticated: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Login service unavailable" },
      { status: 503 },
    );
  }
};
