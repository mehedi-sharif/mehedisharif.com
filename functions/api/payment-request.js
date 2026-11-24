import banks from "../../src/data/payment-banks.json" with { type: "json" };
import {
  bangladeshDistricts,
  dhakaCities,
  paymentMethodLabels,
  swiftCodePattern,
  walletAccountTypes,
  walletNumberPattern,
} from "../../src/data/payment-options.mjs";

const GHL = "https://services.leadconnectorhq.com";
const EMAIL_RE =
  /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)+$/i;
const CURRENCIES = ["USD", "BDT", "EUR", "GBP"];
const BANK_NAMES = new Map(banks.map(({ id, name }) => [id, name]));
const WALLET_NUMBER_RE = new RegExp(`^${walletNumberPattern}$`);
const SWIFT_CODE_RE = new RegExp(`^${swiftCodePattern}$`);

// Field name, email label, maximum length, required, and extra validation.
const REQUEST_FIELDS = [
  ["name", "Name", 200],
  ["email", "Email", 254],
  ["whatFor", "What the payment is for", 200],
  ["amount", "Amount", 40],
  ["currency", "Currency", 3],
];
const METHOD_FIELDS = {
  bank: [
    ["bankId", "Bank", 200, true, (id) => BANK_NAMES.has(id)],
    ["bankAccountName", "Account name", 200],
    ["bankAccountNumber", "Account number", 200],
    ["bankBranch", "Branch name", 200],
    [
      "bankDistrict",
      "District",
      200,
      true,
      (district) => bangladeshDistricts.includes(district),
    ],
  ],
  bkash: [
    [
      "bkashNumber",
      "bKash number",
      11,
      true,
      (number) => WALLET_NUMBER_RE.test(number),
    ],
    [
      "bkashAccountType",
      "bKash account type",
      200,
      true,
      (type) => walletAccountTypes.includes(type),
    ],
  ],
  nagad: [
    [
      "nagadNumber",
      "Nagad number",
      11,
      true,
      (number) => WALLET_NUMBER_RE.test(number),
    ],
    [
      "nagadAccountType",
      "Nagad account type",
      200,
      true,
      (type) => walletAccountTypes.includes(type),
    ],
  ],
  swift: [
    ["swiftBankName", "Bank name", 200],
    [
      "swiftCode",
      "SWIFT/BIC code",
      11,
      true,
      (code) => SWIFT_CODE_RE.test(code),
    ],
    ["swiftAccountName", "Account name", 200],
    ["swiftAccountNumber", "Account number or IBAN", 200],
    ["swiftBankCountry", "Bank country", 200],
    ["swiftBankAddress", "Bank address", 2000, false],
  ],
  other: [["paymentDetails", "Payment details", 2000]],
};
const DHAKA_CITY_FIELD = [
  "bankDhakaCity",
  "Dhaka North or Dhaka South",
  200,
  true,
  (city) => dhakaCities.includes(city),
];
const NOTES_FIELD = ["notes", "Notes", 2000, false];
const TIME_ZONE = "Asia/Dhaka";
const submittedDate = new Intl.DateTimeFormat("en-GB", {
  timeZone: TIME_ZONE,
  day: "numeric",
  month: "short",
  year: "numeric",
});
const submittedTime = new Intl.DateTimeFormat("en-US", {
  timeZone: TIME_ZONE,
  hour: "numeric",
  minute: "2-digit",
  hour12: true,
});

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

function emailHtml(fields, paymentMethod, methodFields, submittedAt) {
  const rows = [
    ...REQUEST_FIELDS.map(([key, label]) => [label, fields[key]]),
    ["Payment method", paymentMethodLabels[paymentMethod]],
    ...methodFields.map(([key, label]) => [
      label,
      key === "bankId" ? BANK_NAMES.get(fields[key]) : fields[key],
    ]),
    [NOTES_FIELD[1], fields.notes],
    [
      `Submitted time (${TIME_ZONE})`,
      `${submittedDate.format(submittedAt)}, ${submittedTime.format(submittedAt)}`,
    ],
  ]
    .map(([label, value]) => {
      const cell = escapeHtml(value).replace(/\r\n?|\n/g, "<br>") || "&mdash;";
      return `<tr><th scope="row" style="padding:8px;border:1px solid #ccc;text-align:left;vertical-align:top">${label}</th><td style="padding:8px;border:1px solid #ccc;overflow-wrap:anywhere">${cell}</td></tr>`;
    })
    .join("");

  return `<p>After you pay, reply all with the payment confirmation so Mehedi and the payee both get it.</p>
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

  const paymentMethod = trim(data.paymentMethod);
  if (!Object.hasOwn(METHOD_FIELDS, paymentMethod)) {
    return json({ ok: false, error: "Invalid request" }, 400);
  }
  const methodFields = [...METHOD_FIELDS[paymentMethod]];
  if (paymentMethod === "bank" && trim(data.bankDistrict) === "Dhaka") {
    methodFields.push(DHAKA_CITY_FIELD);
  }
  const expectedFields = [...REQUEST_FIELDS, ...methodFields, NOTES_FIELD];
  const fields = Object.fromEntries(
    expectedFields.map(([key]) => [key, trim(data[key])]),
  );
  const { name, email, whatFor, amount, currency } = fields;
  if (
    expectedFields.some(
      ([key, , max, required = true, validate]) =>
        (data[key] !== undefined && typeof data[key] !== "string") ||
        (required && !fields[key]) ||
        fields[key].length > max ||
        (validate && !validate(fields[key])),
    ) ||
    !EMAIL_RE.test(email) ||
    /^\.|\.\.|\.@/.test(email) ||
    /[\r\n\u2028\u2029]/.test(whatFor) ||
    !/^[0-9]*\.?[0-9]+$/.test(amount) ||
    !/[1-9]/.test(amount) ||
    !CURRENCIES.includes(currency)
  ) {
    return json({ ok: false, error: "Invalid request" }, 400);
  }

  const submittedAt = new Date();
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
      subject: `Payment request: ${name} - ${amount} ${currency}`.replace(
        /[\r\n\u2028\u2029]+/g,
        " ",
      ),
      html: emailHtml(fields, paymentMethod, methodFields, submittedAt),
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
