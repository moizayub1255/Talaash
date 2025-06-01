// convex/clerk_webhook.js
import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";

const http = httpRouter();

http.route({
  path: "/clerk_webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    console.log("📦 Clerk Webhook Received:", body);
    return new Response("Webhook received", { status: 200 });
  }),
});

export default http;