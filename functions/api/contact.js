const GHL = "https://services.leadconnectorhq.com";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

const ghl = (env, path, body) =>
  fetch(GHL + path, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.GHL_TOKEN}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(15000),
  });

// Parse JSON (fetch from the form script) or a native form post (no-JS fallback).
async function readBody(request) {
  const type = request.headers.get("Content-Type") || "";
  if (type.includes("application/json")) return request.json();
  const form = Object.fromEntries(await request.formData());
  return { ...form, name: form.name ?? form.full_name };
}

async function handlePost({ request, env }) {
  if (!env.GHL_TOKEN || !env.GHL_LOCATION_ID)
    return json({ ok: false, error: "Server not configured" }, 500);

  let data;
  try {
    data = await readBody(request);
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  if (!data || typeof data !== "object")
    return json({ ok: false, error: "Invalid request" }, 400);

  const str = (v, max) => (typeof v === "string" ? v.trim().slice(0, max) : "");

  // Honeypot: pretend success so bots learn nothing.
  if (str(data.website, 200)) return json({ ok: true });

  const name = str(data.name, 200);
  const email = str(data.email, 254);
  const phone = str(data.phone, 40);
  const message = str(data.message, 5000);

  if (!name) return json({ ok: false, error: "Name is required" }, 400);
  if (!email || !EMAIL_RE.test(email))
    return json({ ok: false, error: "A valid email is required" }, 400);

  const [firstName, ...rest] = name.split(/\s+/);
  const lastName = rest.join(" ");

  try {
    const payload = {
      locationId: env.GHL_LOCATION_ID,
      firstName,
      email,
      source: "mehedisharif.com contact form",
      tags: ["website-contact"],
    };
    if (lastName) payload.lastName = lastName;
    if (phone) payload.phone = phone;

    const res = await ghl(env, "/contacts/upsert", payload);
    if (!res.ok) return json({ ok: false, error: "Could not submit" }, 502);
    const result = await res.json();
    const contactId = result?.contact?.id;

    if (message && contactId) {
      const note = await ghl(env, `/contacts/${encodeURIComponent(contactId)}/notes`, {
        body: message,
      });
      if (!note.ok) return json({ ok: false, error: "Could not submit" }, 502);
    }
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "Could not submit" }, 502);
  }
}

// One handler for every method so non-POST requests get an explicit 405
export async function onRequest(context) {
  if (context.request.method !== "POST")
    return json({ ok: false, error: "Method not allowed" }, 405);
  const response = await handlePost(context);
  const isJson = (context.request.headers.get("Content-Type") || "").includes("application/json");
  if (isJson) return response;
  // Native form post: send the visitor back to the contact page.
  const ok = response.ok && (await response.clone().json()).ok === true;
  return Response.redirect(new URL(ok ? "/contact/?sent=1" : "/contact/?error=1", context.request.url), 303);
}
