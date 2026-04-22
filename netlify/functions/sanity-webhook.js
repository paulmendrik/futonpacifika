import { purgeCache } from "@netlify/functions";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";

export default async (req) => {
  const secret = process.env.SANITY_WEBHOOK_SECRET;

  // Read raw body as text — must be done before any parsing
  const rawBody = await req.text();
  const signature = req.headers.get(SIGNATURE_HEADER_NAME);

  console.log("Secret loaded:", !!secret, "length:", secret?.length);
  console.log("Signature received:", !!signature);

  // Reject requests with no signature
  if (!signature) {
    return new Response("Unauthorized", { status: 401 });
  }

  // Verify the request is genuinely from Sanity
  const isValid = await isValidSignature(rawBody, signature, secret);
  console.log("Signature valid:", isValid);

  if (!isValid) {
    return new Response("Invalid signature", { status: 401 });
  }

  const payload = JSON.parse(rawBody);
  const { _type, slug } = payload;

const tagsToPurge = [];

if (_type === "mattress") {
if (slug?.current) {
tagsToPurge.push(`home-${slug.current}`);
}
tagsToPurge.push("home-list", "paintings-pagination");

} else if (_type === "bags") {
if (slug?.current) {
tagsToPurge.push(`bags-${slug.current}`);
}
tagsToPurge.push("bags-list");

} else if (_type === "covers") {
if (slug?.current) {
tagsToPurge.push(`covers-${slug.current}`);
}
tagsToPurge.push("covers-list");

} else if (_type === "cushions") {
if (slug?.current) {
tagsToPurge.push(`cushions-${slug.current}`);
}
tagsToPurge.push("cushions-list");
  
} else if (_type === "doubles") {
if (slug?.current) {
tagsToPurge.push(`doubles-${slug.current}`);
}
tagsToPurge.push("doubles-list");
  
} else if (_type === "dribble") {
if (slug?.current) {
tagsToPurge.push(`dribble-${slug.current}`);
}
tagsToPurge.push("dribble-list");

} else if (_type === "extensions") {
if (slug?.current) {
tagsToPurge.push(`extensions-${slug.current}`);
}
tagsToPurge.push("extensions-list");

} else if (_type === "queens") {
if (slug?.current) {
tagsToPurge.push(`queens-${slug.current}`);
}
tagsToPurge.push("queens-list");

} else if (_type === "rolls") {
if (slug?.current) {
tagsToPurge.push(`rolls-${slug.current}`);
}
tagsToPurge.push("rolls-list");
  
} else if (_type === "singles") {
if (slug?.current) {
tagsToPurge.push(`singles-${slug.current}`);
}
tagsToPurge.push("singles-list");
  
} else if (_type === "yoga") {
if (slug?.current) {
tagsToPurge.push(`yoga-${slug.current}`);
}
tagsToPurge.push("yoga-list");

} else if (_type === "massage") {
tagsToPurge.push("page-massage");
  
} else if (_type === "home") {
tagsToPurge.push("page-index");

} else if (_type === "about") {
tagsToPurge.push("page-index");

} else if (_type === "terms") {
tagsToPurge.push("page-terms");

} else if (_type === "payment") {
tagsToPurge.push("page-payment");

} else if (_type === "contact") {
tagsToPurge.push("page-contact");

} else if (_type === "privacy") {
tagsToPurge.push("page-privacy"); 
}

if (!tagsToPurge.length) {
console.log(`Unmatched _type: "${_type}" — nothing purged`);
return new Response(
JSON.stringify({ message: "No matching type, nothing purged" }),
{ status: 200 }
);
}

await purgeCache({ tags: tagsToPurge });

console.log(`Purged cache tags: ${tagsToPurge.join(", ")}`);

return new Response(
JSON.stringify({ purged: tagsToPurge }),
{ status: 200, headers: { "Content-Type": "application/json" } }
);
};

export const config = { path: "/api/sanity-webhook" };