const GHL = "https://services.leadconnectorhq.com";
const EMAIL_RE =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const CURRENCIES = ["USD", "BDT", "EUR", "GBP", "other"];
const METHODS = [
  "Bank transfer",
  "Wise",
  "Payoneer",
  "PayPal",
  "bKash",
  "Other",
];

// Field name, email label, maximum length, and whether the value is required.
const FIELDS = [
  ["name", "Full name", 200, true],
  ["email", "Email", 254, true],
  ["phone", "Phone", 40],
  ["project", "Project name", 200, true],
  ["description", "Short description of work done", 2000],
  ["invoice", "Invoice/reference number", 120],
  ["amount", "Amount", 40, true],
  ["currency", "Currency", 5, true],
  ["dueDate", "Due date", 10],
  ["paymentMethod", "Payment method", 20, true],
  ["accountHolder", "Account holder name", 200, true],
  ["bankName", "Bank name", 200],
  ["accountNumber", "Account number or IBAN", 120, true],
  ["swift", "SWIFT/BIC", 32],
  ["routing", "Routing/branch", 80],
  ["bankCountry", "Bank country", 120, true],
  ["bankAddress", "Bank address", 1000],
  ["notes", "Notes", 2000],
  ["confirm", "I confirm these details are correct.", 3, true],
];

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
    },
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

const trim = (value) => (typeof value === "string" ? value.trim() : "");
const HTML_ENTITIES = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => HTML_ENTITIES[char]);

function emailHtml(fields) {
  const rows = FIELDS.map(([key, label]) => {
    const value = key === "confirm" ? "Yes" : fields[key];
    const cell = escapeHtml(value).replace(/\r\n?|\n/g, "<br>") || "&mdash;";
    return `<tr><th scope="row" style="padding:8px;border:1px solid #ccc;text-align:left;vertical-align:top">${label}</th><td style="padding:8px;border:1px solid #ccc;overflow-wrap:anywhere">${cell}</td></tr>`;
  }).join("");

  return `<p>Accountant: after paying, reply all with the payment confirmation so Mehedi and ${escapeHtml(fields.name)} both get it.</p>
<table style="border-collapse:collapse"><tbody>${rows}</tbody></table>`;
}

async function upsertTaggedContact(env, contact, tag) {
  const res = await ghl(env, "/contacts/upsert", {
    locationId: env.GHL_LOCATION_ID,
    ...contact,
  });
  if (!res.ok) throw new Error("Contact upsert failed");
  const result = await res.json();
  const id = result?.contact?.id;
  if (!id) throw new Error("Contact ID missing");

  // The upsert endpoint replaces existing tags when tags are passed to it.
  const tagged = await ghl(env, `/contacts/${encodeURIComponent(id)}/tags`, {
    tags: [tag],
  });
  if (!tagged.ok) throw new Error("Could not add contact tag");
  return id;
}

async function handlePost({ request, env }, isJson) {
  const accountantEmail = trim(env.ACCOUNTANT_EMAIL);
  const ownerEmail = trim(env.OWNER_EMAIL);
  if (!env.GHL_TOKEN || !env.GHL_LOCATION_ID || !accountantEmail || !ownerEmail)
    return json({ ok: false, error: "Server not configured" }, 500);

  let data;
  try {
    data = isJson
      ? await request.json()
      : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  if (!data || typeof data !== "object" || Array.isArray(data))
    return json({ ok: false, error: "Invalid request" }, 400);

  // Honeypot: pretend success without sending anything.
  if (trim(data.website)) return json({ ok: true });

  const fields = Object.fromEntries(
    FIELDS.map(([key]) => [key, trim(data[key])]),
  );
  const { name, email, project, amount, currency, paymentMethod, confirm } =
    fields;
  if (
    FIELDS.some(
      ([key, , max, required]) =>
        (required && !fields[key]) || fields[key].length > max,
    ) ||
    !EMAIL_RE.test(email) ||
    /^\.|\.\.|\.@/.test(email) ||
    !/^[0-9]*\.?[0-9]+$/.test(amount) ||
    !/[1-9]/.test(amount) ||
    !CURRENCIES.includes(currency) ||
    !METHODS.includes(paymentMethod) ||
    confirm !== "yes"
  ) {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  try {
    const [firstName, ...rest] = name.split(/\s+/);
    const contact = { firstName, email };
    if (rest.length) contact.lastName = rest.join(" ");
    await upsertTaggedContact(env, contact, "payment-request");
    const contactId = await upsertTaggedContact(
      env,
      { email: accountantEmail },
      "accountant",
    );

    const emailFrom = trim(env.EMAIL_FROM);
    const message = {
      type: "Email",
      status: "pending",
      contactId,
      emailTo: accountantEmail,
      emailCc: [ownerEmail, email],
      emailReplyMode: "reply_all",
      subject:
        `Payment request: ${name} · ${amount} ${currency} · ${project}`.replace(
          /[\r\n]+/g,
          " ",
        ),
      html: emailHtml(fields),
    };
    if (emailFrom) message.emailFrom = emailFrom;

    const result = await ghl(env, "/conversations/messages", message);
    if (!result.ok) throw new Error("Could not send email");
    return json({ ok: true });
  } catch {
    return json({ ok: false, error: "Could not submit" }, 502);
  }
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== "POST") {
    const response = json({ ok: false, error: "Method not allowed" }, 405);
    response.headers.set("Allow", "POST");
    return response;
  }

  const isJson = (request.headers.get("Content-Type") || "").includes(
    "application/json",
  );
  const response = await handlePost(context, isJson);
  if (isJson) return response;

  // A fragment lets the static page show the result even without JavaScript.
  const next = response.ok ? "?sent=1#payment-sent" : "?error=1#payment-error";
  return Response.redirect(
    new URL(`/payment-request/${next}`, request.url),
    303,
  );
}
