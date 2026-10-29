import type { APIContext } from "astro";
import { secret } from "./runtime";
const encoder = new TextEncoder();
async function key(locals: APIContext["locals"]) {
  return crypto.subtle.importKey(
    "raw",
    encoder.encode(secret(locals, "SECRET_KEY")),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"],
  );
}
export async function sign(locals: APIContext["locals"], payload: string) {
  const bytes = new Uint8Array(
    await crypto.subtle.sign(
      "HMAC",
      await key(locals),
      encoder.encode(payload),
    ),
  );
  return Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("");
}
export async function authorized(context: APIContext) {
  try {
    const token = context.cookies.get("timeline_session")?.value || "";
    const [expires, signature] = token.split(".");
    if (
      !/^\d+$/.test(expires) ||
      !/^[a-f0-9]{64}$/.test(signature) ||
      Number(expires) < Date.now()
    )
      return false;
    const bytes = Uint8Array.from(signature.match(/../g)!, (x) =>
      parseInt(x, 16),
    );
    return await crypto.subtle.verify(
      "HMAC",
      await key(context.locals),
      bytes,
      encoder.encode(`timeline:${expires}`),
    );
  } catch {
    return false;
  }
}
export function sameOrigin(context: APIContext) {
  return context.request.headers.get("Origin") === context.url.origin;
}
